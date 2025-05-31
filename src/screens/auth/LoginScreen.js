import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Feather } from '@expo/vector-icons';
import { authService } from '../../services/authService';

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async () => {
    if (!validate()) return;
    
    setLoading(true);
    
    try {
      const { data, error } = await authService.loginWithEmail(
        email.trim(),
        password
      );
      
      if (error) {
        Alert.alert('Login Error', error);
      } else {
        // Check if user has completed onboarding
        const { data: profile } = await authService.getUserProfile();
        
        if (profile?.onboarding_completed) {
          // Navigate to main app
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
          });
        } else {
          // Continue with onboarding
          navigation.reset({
            index: 0,
            routes: [{ name: 'PersonalInfo' }],
          });
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await authService.loginWithGoogle();
      
      if (error) {
        Alert.alert('Google Login Error', error);
      } else {
        // Check if user has completed onboarding
        const { data: profile } = await authService.getUserProfile();
        
        if (profile?.onboarding_completed) {
          // Navigate to main app
          navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
          });
        } else {
          // Continue with onboarding
          navigation.reset({
            index: 0,
            routes: [{ name: 'PersonalInfo' }],
          });
        }
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

  const forgotPasswordStyle = {
    ...theme.typography.body2,
    color: theme.colors.primary,
    textAlign: 'right',
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  };

  return (
    <OnboardingLayout
      showProgress={false}
      showBackButton={true}
      onBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>Welcome Back</Text>
        <Text style={subtitleStyle}>
          Log in to continue your fitness journey
        </Text>

        <Button
          title="Continue with Google"
          onPress={handleGoogleLogin}
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
          placeholder="Enter your password"
          error={errors.password}
          secureTextEntry
          icon={<Feather name="lock" size={20} color={theme.colors.text.tertiary} />}
        />

        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={forgotPasswordStyle}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <Button
          title="Log In"
          onPress={handleEmailLogin}
          loading={loading}
          disabled={!email || !password}
        />

        <View style={linkContainerStyle}>
          <Text style={linkTextStyle}>
            Don't have an account?{' '}
            <Text 
              style={linkStyle} 
              onPress={() => navigation.navigate('PersonalInfo')}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </OnboardingLayout>
  );
};

export default LoginScreen; 