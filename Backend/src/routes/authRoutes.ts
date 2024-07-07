import { IncomingHttpHeaders } from 'http';
import passport from 'passport';
import {
  registerUser,
  loginUser,
  logoutUser,
  auth,
  refreshToken,
} from '../controllers/authController';
import { googleCallback } from '../controllers/googleAuthController';

// Define the Request interface
interface Request {
  body: { email: string; password: string };
  headers: IncomingHttpHeaders; // Update headers type
  user?: { userId: string };
}

const authRoutes = (app: any) => {
  app.post('/register', registerUser);
  app.post('/login', loginUser);
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    googleCallback
  );
  app.post('/logout', auth, logoutUser);
  app.get('/refresh', auth, refreshToken);
  app.get('/protected', auth, (req: Request, res: any) => {
    res.json({ message: 'Protected route accessed' });
  });
};

export default authRoutes;
