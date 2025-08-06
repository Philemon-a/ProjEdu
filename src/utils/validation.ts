import { Request, Response, NextFunction } from 'express';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ 
      error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' 
    });
  }

  if (firstName && typeof firstName !== 'string') {
    return res.status(400).json({ error: 'First name must be a string' });
  }

  if (lastName && typeof lastName !== 'string') {
    return res.status(400).json({ error: 'Last name must be a string' });
  }

  next();
};

export const validateSignIn = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  next();
};

export const validateProfileUpdate = (req: Request, res: Response, next: NextFunction) => {
  const { firstName, lastName, avatarUrl } = req.body;

  if (firstName !== undefined && typeof firstName !== 'string') {
    return res.status(400).json({ error: 'First name must be a string' });
  }

  if (lastName !== undefined && typeof lastName !== 'string') {
    return res.status(400).json({ error: 'Last name must be a string' });
  }

  if (avatarUrl !== undefined && typeof avatarUrl !== 'string') {
    return res.status(400).json({ error: 'Avatar URL must be a string' });
  }

  if (avatarUrl && !avatarUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Avatar URL must be a valid URL' });
  }

  next();
}; 