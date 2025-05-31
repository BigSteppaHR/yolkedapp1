import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Feather } from '@expo/vector-icons';
import { authService } from '../../services/authService';

const RegisterScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const onboardingData = route.params?.onboardingData || {};
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Confirm password validation
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignup = async () => {
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await authService.registerWithEmail(
        email.trim(),
        password,
        {
          firstName: '',
          lastName: '',
        }
      );
      
      if (error) {
        Alert.alert('Registration Error', error);
      } else {
        // Continue with onboarding
        navigation.navigate('PersonalInfo', {
          onboardingData: {
            ...onboardingData,
            email: email.trim(),
          },
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await authService.loginWithGoogle();
      
      if (error) {
        Alert.alert('Google Sign Up Error', error);
      } else {
        // Google signup successful, continue with onboarding
        navigation.navigate('PersonalInfo', {
          onboardingData: {
            ...onboardingData,
            authMethod: 'google',
          },
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const titleStyle = {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  };

  const subtitleStyle = {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xxl,
  };

  const dividerContainerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  };

  const dividerLineStyle = {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border.primary,
  };

  const dividerTextStyle = {
    ...theme.typography.body2,
    color: theme.colors.text.tertiary,
    marginHorizontal: theme.spacing.md,
  };

  const googleButtonStyle = {
    backgroundColor: theme.isDark ? '#4285F4' : '#FFFFFF',
    borderWidth: theme.isDark ? 0 : 1,
    borderColor: theme.colors.border.primary,
  };

  const googleTextStyle = {
    color: theme.isDark ? '#FFFFFF' : '#000000',
  };

  const linkContainerStyle = {
    marginTop: theme.spacing.lg,
    alignItems: 'center',
  };

  const linkTextStyle = {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
  };

  const linkStyle = {
    ...theme.typography.body2,
    color: theme.colors.primary,
  };

  return (
    <OnboardingLayout
      currentStep={2}
      totalSteps={7}
      onBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>Create Your Account</Text>
        <Text style={subtitleStyle}>
          Let's get you set up to start your fitness journey
        </Text>

        <Button
          title="Continue with Google"
          onPress={handleGoogleSignup}
          variant="secondary"
          style={googleButtonStyle}
          textStyle={googleTextStyle}
          loading={loading}
          icon={
            <Feather 
              name="chrome" 
              size={20} 
              color={theme.isDark ? '#FFFFFF' : '#000000'} 
              style={{ marginRight: 8 }}
            />
          }
        />

        <View style={dividerContainerStyle}>
          <View style={dividerLineStyle} />
          <Text style={dividerTextStyle}>OR</Text>
          <View style={dividerLineStyle} />
        </View>

        <Input
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) {
              setErrors({ ...errors, email: null });
            }
          }}
          placeholder="Enter your email"
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          icon={<Feather name="mail" size={20} color={theme.colors.text.tertiary} />}
        />

        <Input
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) {
              setErrors({ ...errors, password: null });
            }
          }}
          placeholder="Create a password"
          error={errors.password}
          secureTextEntry
          icon={<Feather name="lock" size={20} color={theme.colors.text.tertiary} />}
        />

        <Input
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            if (errors.confirmPassword) {
              setErrors({ ...errors, confirmPassword: null });
            }
          }}
          placeholder="Confirm your password"
          error={errors.confirmPassword}
          secureTextEntry
          icon={<Feather name="lock" size={20} color={theme.colors.text.tertiary} />}
        />

        <View style={{ flex: 1 }} />

        <Button
          title="Create Account"
          onPress={handleEmailSignup}
          loading={loading}
          disabled={!email || !password || !confirmPassword}
        />

        <View style={linkContainerStyle}>
          <Text style={linkTextStyle}>
            By creating an account, you agree to our{' '}
            <Text style={linkStyle} onPress={() => {}}>
              Terms of Service
            </Text>
            {' '}and{' '}
            <Text style={linkStyle} onPress={() => {}}>
              Privacy Policy
            </Text>
          </Text>
        </View>
      </View>
    </OnboardingLayout>
  );
};

export default RegisterScreen; 