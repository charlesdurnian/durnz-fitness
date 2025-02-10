-- backend/db/init.sql

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Profiles Table (User Details)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  external_profile_id UUID NULL,
  username TEXT,  
  bio TEXT,
  avatar_url TEXT DEFAULT 'default-avatar.png',
  privacy TEXT CHECK (privacy IN ('public', 'private', 'friends-only')) DEFAULT 'public',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT
);

-- Workouts Table
CREATE TABLE IF NOT EXISTS workouts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  exercises JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comments Table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  workout_id INT REFERENCES workouts(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
