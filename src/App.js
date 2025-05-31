import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { authService } from './services/authService';

// Onboarding Screens
import WelcomeScreen from './screens/onboarding/WelcomeScreen';
import PersonalInfoScreen from './screens/onboarding/PersonalInfoScreen';
import FitnessLevelScreen from './screens/onboarding/FitnessLevelScreen';
import GoalsScreen from './screens/onboarding/GoalsScreen';
import GymTypeScreen from './screens/onboarding/GymTypeScreen';
import OnboardingCompleteScreen from './screens/onboarding/OnboardingCompleteScreen';

// Auth Screens
import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';

// Main App Screens (placeholder for now)
import MainAppScreen from './screens/MainAppScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const theme = useTheme();
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const user = await authService.getCurrentUser();
      
      if (user) {
        const { data: profile } = await authService.getUserProfile();
        
        if (profile?.onboarding_completed) {
          setInitialRoute('MainApp');
        } else {
          // User is authenticated but hasn't completed onboarding
          setInitialRoute('PersonalInfo');
        }
      } else {
        setInitialRoute('Welcome');
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      setInitialRoute('Welcome');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !initialRoute) {
    return null; // You can add a splash screen here
  }

  return (
    <>
      <StatusBar
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background.primary}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: {
              backgroundColor: theme.colors.background.primary,
            },
          }}
        >
          {/* Onboarding Flow */}
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen name="FitnessLevel" component={FitnessLevelScreen} />
          <Stack.Screen name="Goals" component={GoalsScreen} />
          <Stack.Screen name="GymType" component={GymTypeScreen} />
          <Stack.Screen name="OnboardingComplete" component={OnboardingCompleteScreen} />
          
          {/* Auth Screens */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          
          {/* Main App */}
          <Stack.Screen 
            name="MainApp" 
            component={MainAppScreen} 
            options={{
              animation: 'fade',
            }}
          />
          
          {/* Add more onboarding screens here as you create them */}
          {/* <Stack.Screen name="DateOfBirth" component={DateOfBirthScreen} />
          <Stack.Screen name="Gender" component={GenderScreen} />
          <Stack.Screen name="Height" component={HeightScreen} />
          <Stack.Screen name="Weight" component={WeightScreen} />
          <Stack.Screen name="TrainingHistory" component={TrainingHistoryScreen} />
          <Stack.Screen name="TrainingFrequency" component={TrainingFrequencyScreen} />
          <Stack.Screen name="TimeAvailability" component={TimeAvailabilityScreen} />
          <Stack.Screen name="PrimaryGoal" component={PrimaryGoalScreen} />
          <Stack.Screen name="SpecificGoal" component={SpecificGoalScreen} />
          <Stack.Screen name="TrainingStyle" component={TrainingStyleScreen} />
          <Stack.Screen name="ExercisePreferences" component={ExercisePreferencesScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="PhotoUpload" component={PhotoUploadScreen} />
          <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
          <Stack.Screen name="AICoachPreference" component={AICoachPreferenceScreen} />
          <Stack.Screen name="NotificationSetup" component={NotificationSetupScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App; 