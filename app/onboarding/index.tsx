import { useEffect } from 'react';
import { router } from 'expo-router';

export default function OnboardingIndex() {
  useEffect(() => {
    // Redirect to the first onboarding screen
    router.replace('/onboarding/value-proposition');
  }, []);

  return null;
}