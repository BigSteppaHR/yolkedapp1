import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import Button from '../../components/common/Button';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Initial logo animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 15,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Start subtle pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.02,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, []);

  const containerStyle = {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  };

  const logoContainerStyle = {
    marginBottom: theme.spacing.xxl,
    alignItems: 'center',
  };

  const titleStyle = {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: theme.spacing.lg,
  };

  const taglineStyle = {
    ...theme.typography.h4,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
    fontWeight: '400',
  };

  const descriptionStyle = {
    ...theme.typography.body1,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    marginBottom: theme.spacing.xxl,
    lineHeight: 24,
    paddingHorizontal: theme.spacing.md,
  };

  const linkStyle = {
    ...theme.typography.body1,
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: theme.spacing.lg,
    fontWeight: '500',
  };

  return (
    <OnboardingLayout
      showProgress={false}
      showBackButton={false}
      scrollEnabled={false}
    >
      <View style={containerStyle}>
        <Animated.View
          style={[
            logoContainerStyle,
            {
              opacity: fadeAnim,
              transform: [
                { scale: Animated.multiply(scaleAnim, pulseAnim) },
              ],
            },
          ]}
        >
          {/* Elegant Yolked Logo */}
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={[theme.colors.primary, theme.colors.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoGradient}
            >
              <View style={styles.logoInner}>
                <Text style={[styles.logoText, { color: theme.colors.text.inverse }]}>Y</Text>
              </View>
            </LinearGradient>
          </View>
          
          <Animated.Text
            style={[
              titleStyle,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            YOLKED
          </Animated.Text>
        </Animated.View>

        <Animated.Text
          style={[
            taglineStyle,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Elegance in Motion
        </Animated.Text>

        <Animated.Text
          style={[
            descriptionStyle,
            {
              opacity: fadeAnim,
              transform: [
                {
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, 0],
                  }),
                },
              ],
            },
          ]}
        >
          Transform your fitness journey with AI-powered workouts, gamified progress tracking, and elite athlete inspiration.
        </Animated.Text>

        <Animated.View
          style={{
            width: '100%',
            opacity: fadeAnim,
          }}
        >
          <Button
            title="Get Started"
            onPress={() => navigation.navigate('Register')}
            size="large"
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.xxl,
              paddingVertical: theme.spacing.md + 4,
            }}
          />
          
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{ marginTop: theme.spacing.lg }}
          >
            <Text style={linkStyle}>
              Already have an account? Log In
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGradient: {
    width: 100,
    height: 100,
    borderRadius: 25,
    padding: 3,
  },
  logoInner: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
  },
});

export default WelcomeScreen; 