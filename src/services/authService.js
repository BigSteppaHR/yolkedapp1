import { supabase } from './supabase';

export const authService = {
  // Register new user with email
  async registerWithEmail(email, password, { firstName, lastName }) {
    try {
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (authError) throw authError;
      
      return { data: authData, error: null };
    } catch (error) {
      console.error('Registration error:', error);
      return { data: null, error: error.message };
    }
  },

  // Login with email
  async loginWithEmail(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { data: null, error: error.message };
    }
  },

  // Login with Google
  async loginWithGoogle() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'com.yolked.app://auth-callback', // Your app's deep link
        },
      });

      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Google login error:', error);
      return { data: null, error: error.message };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  // Get user profile
  async getUserProfile() {
    try {
      const user = await this.getCurrentUser();
      if (!user) return { data: null, error: 'No user logged in' };

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      return { data, error: null };
    } catch (error) {
      console.error('Get profile error:', error);
      return { data: null, error: error.message };
    }
  },

  // Update user profile with onboarding data
  async updateUserProfile(onboardingData) {
    try {
      const user = await this.getCurrentUser();
      if (!user) return { data: null, error: 'No user logged in' };

      // Update profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: onboardingData.firstName,
          last_name: onboardingData.lastName,
          fitness_level: onboardingData.fitnessLevel,
          primary_goal: onboardingData.primaryGoal,
          gym_type: onboardingData.gymType,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (profileError) throw profileError;

      return { 
        data: { profile: profileData }, 
        error: null 
      };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error: error.message };
    }
  },

  // Check if user has completed onboarding
  async hasCompletedOnboarding() {
    try {
      const { data: profile, error } = await this.getUserProfile();
      if (error || !profile) return false;
      
      return profile.onboarding_completed === true;
    } catch (error) {
      console.error('Check onboarding error:', error);
      return false;
    }
  },

  // Logout
  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      return { error: null };
    } catch (error) {
      console.error('Logout error:', error);
      return { error: error.message };
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  },
}; 