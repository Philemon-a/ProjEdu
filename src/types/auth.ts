export interface User {
  id: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  created_at: string;
  updated_at: string;
  profile?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

export interface AuthResponse {
  user: User | null;
  session: any | null;
  error?: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}

export interface AuthMiddlewareRequest extends Request {
  user?: User;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
} 