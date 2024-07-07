import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import * as bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '../utils/jwtConfig';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      emails: any;
      userId: string;
    };
  }
}

// Registration controller
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate access and refresh tokens
    const accessToken = generateToken(user._id.toString(), '7s');
    const refreshToken = generateToken(user._id.toString(), '1d');

    // Set HTTP-Only cookie for refresh token
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
    });
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout controller
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie('refreshToken');
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Authentication Middleware
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).send('Access Denied. No token provided.');
  }
  try {
    const decoded = verifyToken(refreshToken);
    req.user = decoded.userId;
    next();
  } catch (error) {
    // Handle invalid access token error
    if (refreshToken) {
      try {
        const decoded = verifyToken(refreshToken);
        const newAccessToken = generateToken(decoded.userId, '7s');

        res
          .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
          .cookie('accessToken', newAccessToken, { httpOnly: true })
          .send(decoded.user);
      } catch (error) {
        return res.status(400).send('Invalid Token.');
      }
    }
  }
};

// Refresh Token Endpoint
export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized: Refresh token missing' });
  }
  try {
    const decoded = verifyToken(refreshToken);
    const newAccessToken = generateToken(decoded.userId, '7s');

    res.cookie('accessToken', newAccessToken).send(decoded.user);
    res.json({ message: 'Access token refreshed' });
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized: Refresh token expired' });
  }
};
