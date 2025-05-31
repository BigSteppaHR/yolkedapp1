import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import Button from '../../components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { authService } from '../../services/authService';
import LottieView from 'lottie-react-native';

const OnboardingCompleteScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const onboardingData = route.params?.onboardingData || {};
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const checkmarkScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    saveOnboardingData();
  }, []);

  const saveOnboardingData = async () => {
    try {
      // Save the onboarding data to the database
      const { data, error } = await authService.updateUserProfile(onboardingData);
      
      if (error) {
        setError(error);
        setLoading(false);
        return;
      }

      // Animate success state
      setLoading(false);
      
      Animated.sequence([
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            tension: 10,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(checkmarkScale, {
          toValue: 1,
          friction: 4,
          tension: 10,
          useNativeDriver: true,
        }),
      ]).start();
    } catch (err) {
      console.error('Error saving onboarding data:', err);
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    saveOnboardingData();
  };

  const containerStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  };

  const iconContainerStyle = {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.xl,
  };

  const titleStyle = {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  };

  const subtitleStyle = {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    lineHeight: 24,
  };

  const errorStyle = {
    ...theme.typography.body2,
    color: theme.colors.status.error,
    textAlign: 'center',
    marginBottom: theme.spacing.lg,
  };

  const featureContainerStyle = {
    width: '100%',
    marginBottom: theme.spacing.xxl,
  };

  const featureItemStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  };

  const featureIconStyle = {
    marginRight: theme.spacing.md,
  };

  const featureTextStyle = {
    ...theme.typography.body2,
    color: theme.colors.text.primary,
    flex: 1,
  };

  if (loading) {
    return (
      <OnboardingLayout
        showProgress={false}
        showBackButton={false}
        scrollEnabled={false}
      >
        <View style={containerStyle}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[titleStyle, { marginTop: theme.spacing.lg }]}>
            Setting up your profile...
          </Text>
          <Text style={subtitleStyle}>
            This will only take a moment
          </Text>
        </View>
      </OnboardingLayout>
    );
  }

  if (error) {
    return (
      <OnboardingLayout
        showProgress={false}
        showBackButton={false}
        scrollEnabled={false}
      >
        <View style={containerStyle}>
          <View style={iconContainerStyle}>
            <MaterialCommunityIcons
              name="alert-circle"
              size={60}
              color={theme.colors.status.error}
            />
          </View>
          <Text style={titleStyle}>Oops! Something went wrong</Text>
          <Text style={errorStyle}>{error}</Text>
          <Button
            title="Try Again"
            onPress={handleRetry}
            variant="primary"
          />
        </View>
      </OnboardingLayout>
    );
  }

  return (
    <OnboardingLayout
      showProgress={false}
      showBackButton={false}
      scrollEnabled={false}
    >
      <Animated.View
        style={[
          containerStyle,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={iconContainerStyle}>
          <Animated.View
            style={{
              transform: [{ scale: checkmarkScale }],
            }}
          >
            <MaterialCommunityIcons
              name="check-circle"
              size={80}
              color={theme.colors.primary}
            />
          </Animated.View>
        </View>

        <Text style={titleStyle}>You're All Set!</Text>
        <Text style={subtitleStyle}>
          Your personalized fitness journey begins now. Here's what you can expect:
        </Text>

        <View style={featureContainerStyle}>
          <View style={featureItemStyle}>
            <MaterialCommunityIcons
              name="robot"
              size={24}
              color={theme.colors.primary}
              style={featureIconStyle}
            />
            <Text style={featureTextStyle}>
              AI-powered workout recommendations tailored to your goals
            </Text>
          </View>

          <View style={featureItemStyle}>
            <MaterialCommunityIcons
              name="chart-line"
              size={24}
              color={theme.colors.primary}
              style={featureIconStyle}
            />
            <Text style={featureTextStyle}>
              Track your progress and see your improvements over time
            </Text>
          </View>

          <View style={featureItemStyle}>
            <MaterialCommunityIcons
              name="trophy"
              size={24}
              color={theme.colors.primary}
              style={featureIconStyle}
            />
            <Text style={featureTextStyle}>
              Get inspired by professional athlete training programs
            </Text>
          </View>

          <View style={featureItemStyle}>
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={theme.colors.primary}
              style={featureIconStyle}
            />
            <Text style={featureTextStyle}>
              Join a community of fitness enthusiasts like you
            </Text>
          </View>
        </View>

        <Button
          title="Start Training"
          onPress={handleGetStarted}
          size="large"
        />
      </Animated.View>
    </OnboardingLayout>
  );
};

export default OnboardingCompleteScreen; 