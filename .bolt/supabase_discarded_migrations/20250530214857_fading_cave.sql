-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE fitness_level AS ENUM ('beginner', 'novice', 'intermediate', 'advanced', 'pro');
CREATE TYPE gender_type AS ENUM ('male', 'female', 'other', 'prefer_not_to_say');

-- Users table (extends Supabase auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User profiles
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES users(id),
  user_id UUID REFERENCES users(id),
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  gender gender_type,
  height DECIMAL,
  weight DECIMAL,
  fitness_level fitness_level,
  goals TEXT[],
  preferred_training_style TEXT,
  training_frequency INTEGER,
  subscription_tier TEXT,
  onboarding_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User preferences
CREATE TABLE user_preferences (
  id UUID PRIMARY KEY REFERENCES users(id),
  theme TEXT DEFAULT 'system',
  weight_unit TEXT DEFAULT 'kg',
  distance_unit TEXT DEFAULT 'km',
  rest_timer_duration INTEGER DEFAULT 90,
  rest_timer_sound BOOLEAN DEFAULT TRUE,
  rest_timer_vibration BOOLEAN DEFAULT TRUE,
  notifications_enabled BOOLEAN DEFAULT TRUE,
  ai_coach_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Exercises
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  muscle_groups TEXT[] NOT NULL,
  equipment TEXT,
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workout templates
CREATE TABLE workout_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Template exercises
CREATE TABLE workout_template_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID NOT NULL REFERENCES workout_templates(id),
  exercise_id UUID NOT NULL REFERENCES exercises(id),
  order_index INTEGER NOT NULL,
  sets INTEGER,
  reps_min INTEGER,
  reps_max INTEGER,
  rest_seconds INTEGER,
  notes TEXT
);

-- Workouts
CREATE TABLE workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  workout_type TEXT,
  duration_minutes INTEGER,
  difficulty_level TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workout exercises
CREATE TABLE workout_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_id UUID REFERENCES workouts(id),
  exercise_id UUID REFERENCES exercises(id),
  exercise_order INTEGER NOT NULL,
  sets INTEGER,
  reps TEXT,
  rest_seconds INTEGER,
  tempo TEXT,
  notes TEXT
);

-- Workout sessions
CREATE TABLE workout_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  template_id UUID REFERENCES workout_templates(id),
  name TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  total_volume DECIMAL
);

-- Exercise sets
CREATE TABLE exercise_sets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES workout_sessions(id),
  exercise_id UUID REFERENCES exercises(id),
  set_number INTEGER NOT NULL,
  weight DECIMAL,
  reps INTEGER,
  rpe INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Personal records
CREATE TABLE personal_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  exercise_id UUID REFERENCES exercises(id),
  weight DECIMAL NOT NULL,
  reps INTEGER NOT NULL,
  achieved_at TIMESTAMP WITH TIME ZONE,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Body measurements
CREATE TABLE body_measurements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id),
  date DATE NOT NULL,
  weight DECIMAL,
  body_fat DECIMAL,
  chest DECIMAL,
  waist DECIMAL,
  hips DECIMAL,
  biceps DECIMAL,
  thighs DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Progress photos
CREATE TABLE progress_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  photo_url TEXT NOT NULL,
  category TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Streaks
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_workout_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- AI generated workouts
CREATE TABLE ai_generated_workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  workout_name TEXT,
  workout_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Athletes
CREATE TABLE athlete_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  achievements TEXT[],
  profile_picture_url TEXT,
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Athlete workouts
CREATE TABLE athlete_workouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_id UUID REFERENCES athlete_profiles(id),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  difficulty TEXT,
  exercises JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create function to update user streak
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
BEGIN
  -- Only process completed workouts
  IF NEW.completed_at IS NOT NULL THEN
    -- Get or create streak record
    INSERT INTO streaks (user_id)
    VALUES (NEW.user_id)
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Update streak
    WITH streak_data AS (
      SELECT
        CASE
          WHEN last_workout_date = CURRENT_DATE - 1 THEN current_streak + 1
          WHEN last_workout_date = CURRENT_DATE THEN current_streak
          ELSE 1
        END as new_streak
      FROM streaks
      WHERE user_id = NEW.user_id
    )
    UPDATE streaks
    SET
      current_streak = streak_data.new_streak,
      longest_streak = GREATEST(longest_streak, streak_data.new_streak),
      last_workout_date = CURRENT_DATE,
      updated_at = CURRENT_TIMESTAMP
    FROM streak_data
    WHERE user_id = NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for streak updates
CREATE TRIGGER workout_completed_trigger
  AFTER UPDATE OF completed_at ON workout_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_streak();

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE personal_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_measurements ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generated_workouts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = id);

-- Add sample exercises
INSERT INTO exercises (name, category, muscle_groups, equipment, instructions) VALUES
('Bench Press', 'strength', ARRAY['chest', 'shoulders', 'triceps'], 'barbell', 'Lie on bench, grip bar slightly wider than shoulders, lower to chest, press up.'),
('Squat', 'strength', ARRAY['legs', 'glutes', 'core'], 'barbell', 'Bar on upper back, feet shoulder width, squat down keeping chest up, drive through heels.'),
('Deadlift', 'strength', ARRAY['back', 'legs', 'core'], 'barbell', 'Stand with feet hip width, grip bar outside legs, keep back straight, lift by driving hips forward.');