import { Request, Response } from 'express';
import passport from 'passport';
import User from '../models/userModel'; // Assuming User model
import { generateToken } from '../utils/jwtConfig';
// import GoogleStrategy from 'passport-google-oauth20';

// Define GoogleStrategy (assuming you have it configured elsewhere)
declare global {
  namespace Express {
    interface User {
      userId: string;
    }
  }
}

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:5173/auth/google/callback',
    },
    function (accessToken: string, refreshToken: string, profile: any, done: any) {
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //     return cb(err, user);
      //   });
      done(null, profile);
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    const existingUser = await User.findOne({ email: user.emails[0].value });
    if (existingUser) {
      // User exists, generate tokens
      const accessToken = generateToken(existingUser._id.toString(), '7s');
      const refreshToken = generateToken(existingUser._id.toString(), '1d');

      // Set HTTP-Only cookies for tokens
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });
      res.redirect('http://localhost:5173/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
