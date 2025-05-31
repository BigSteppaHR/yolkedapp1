import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="value-proposition" />
      <Stack.Screen name="welcome-back" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="location" />
      <Stack.Screen name="experience" />
      <Stack.Screen name="training-history" />
      <Stack.Screen name="training-frequency" />
      <Stack.Screen name="equipment" />
      <Stack.Screen name="body-metrics" />
      <Stack.Screen name="primary-goal" />
      <Stack.Screen name="goal-visualization" />
      <Stack.Screen name="training-split" />
      <Stack.Screen name="exercise-preferences" />
      <Stack.Screen name="ai-coaching" />
      <Stack.Screen name="premium-features" />
      <Stack.Screen name="trial-offer" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="success" />
      <Stack.Screen name="quick-tour" />
    </Stack>
  );
}