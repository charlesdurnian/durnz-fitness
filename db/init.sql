-- backend/db/init.sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table (Fix: Use UUID)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- ✅ Changed from SERIAL to UUID
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
  avatar_url TEXT DEFAULT 'default-avatar.png',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW() 
);

-- Workouts Table
CREATE TABLE IF NOT EXISTS workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- ✅ Changed to UUID
  name TEXT NOT NULL, -- ✅ Workout name
  type TEXT NOT NULL DEFAULT 'daily', -- ✅ Type: daily, team, dumbbell, bodyweight
  video_url TEXT, -- ✅ Video explaining the workout
  details TEXT, -- ✅ Full workout details
  warm_ups TEXT, -- ✅ Warm-ups for this workout
  scaling JSONB, -- ✅ Scaling options (JSONB for structured data)
  standards JSONB, -- ✅ Movement standards (JSONB for structured data)
  movement_standards TEXT, -- ✅ Text version of standards
  stimulus_strategy TEXT, -- ✅ Strategy for this workout
  author_id UUID REFERENCES users(id) ON DELETE SET NULL, -- ✅ Matches users.id
  created_at TIMESTAMP DEFAULT NOW()
);


-- Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(), -- ✅ Changed to UUID
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL, -- ✅ Matches users.id
  created_at TIMESTAMP DEFAULT NOW()
);

-- Comments Table
CREATE TABLE IF NOT EXISTS comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_id UUID REFERENCES workouts(id) ON DELETE CASCADE, 
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
