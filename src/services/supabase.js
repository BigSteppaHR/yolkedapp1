import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Supabase configuration
const SUPABASE_URL = 'https://hsjytempdcumrbudjqsd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhzanl0ZW1wZGN1bXJidWRqcXNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2Mjg2MzksImV4cCI6MjA2NDIwNDYzOX0.bfzZZHZkrM4vrCRtbPeyiMeQDnid3hShRv5j1IlXoW8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}); 