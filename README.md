# ProjEdu Backend

A Node.js/Express backend for the ProjEdu educational platform with Supabase authentication.

## 🚀 Features

- **User Authentication**: Sign up, sign in, sign out with email/password
- **JWT Token Management**: Secure token-based authentication
- **Role-based Access Control**: Student (default), Teacher, Admin roles
- **Profile Management**: Update user profiles with personal information
- **Security**: Rate limiting, CORS, Helmet security headers
- **Error Handling**: Comprehensive error handling and logging

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account and project

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your Supabase credentials:

```bash
cp env.example .env
```

Update `.env` with your Supabase project details:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=3001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### 3. Supabase Database Setup

Create the following table in your Supabase database:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  profile JSONB DEFAULT '{}'::jsonb
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'student');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 4. Run the Application

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/signup`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "student",
    "profile": {
      "first_name": "John",
      "last_name": "Doe"
    }
  },
  "token": "jwt_token"
}
```

#### POST `/api/auth/signin`
Sign in with existing credentials.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Sign in successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "student"
  },
  "token": "jwt_token"
}
```

#### POST `/api/auth/signout`
Sign out the current user.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "message": "Sign out successful"
}
```

#### GET `/api/auth/profile`
Get current user's profile.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "student",
    "profile": {
      "first_name": "John",
      "last_name": "Doe"
    }
  }
}
```

#### PUT `/api/auth/profile`
Update current user's profile.

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "avatarUrl": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "student",
    "profile": {
      "first_name": "Jane",
      "last_name": "Smith",
      "avatar_url": "https://example.com/avatar.jpg"
    }
  }
}
```

#### POST `/api/auth/refresh`
Refresh the JWT token.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "token": "new_jwt_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "role": "student"
  }
}
```

### Health Check

#### GET `/health`
Check server status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Prevents abuse with request rate limiting
- **CORS Protection**: Configurable cross-origin resource sharing
- **Helmet Security**: HTTP security headers
- **Input Validation**: Request body validation
- **Error Handling**: Comprehensive error handling without exposing sensitive information

# Project Structure (Updated)

```
/eduflow-backend
│
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # App entrypoint
│   ├── routes/               # All route definitions
│   ├── controllers/          # Route handler logic
│   ├── services/             # Business logic + AI
│   ├── middlewares/          # Auth check, error handling
│   ├── supabase/             # Supabase client config
│   ├── types/                # Type definitions
│   └── utils/                # Helpers (e.g., date utils, AI prompts)
│
├── .env
├── tsconfig.json
└── package.json
```

## 🧪 Testing

To run tests (when implemented):
```bash
npm test
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SUPABASE_URL` | Your Supabase project URL | Yes |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `PORT` | Server port (default: 3001) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `CORS_ORIGIN` | Allowed CORS origin | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 