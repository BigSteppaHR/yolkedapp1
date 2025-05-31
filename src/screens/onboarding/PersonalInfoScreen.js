import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { Feather } from '@expo/vector-icons';

const PersonalInfoScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validate()) {
      const onboardingData = route.params?.onboardingData || {};
      navigation.navigate('FitnessLevel', {
        onboardingData: {
          ...onboardingData,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        },
      });
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

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={7}
      onBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>What's your name?</Text>
        <Text style={subtitleStyle}>
          Let's personalize your experience
        </Text>

        <Input
          label="First Name"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            if (errors.firstName) {
              setErrors({ ...errors, firstName: null });
            }
          }}
          placeholder="Enter your first name"
          error={errors.firstName}
          autoCapitalize="words"
          icon={<Feather name="user" size={20} color={theme.colors.text.tertiary} />}
        />

        <Input
          label="Last Name"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            if (errors.lastName) {
              setErrors({ ...errors, lastName: null });
            }
          }}
          placeholder="Enter your last name"
          error={errors.lastName}
          autoCapitalize="words"
          icon={<Feather name="user" size={20} color={theme.colors.text.tertiary} />}
        />

        <View style={{ flex: 1 }} />

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!firstName || !lastName}
        />
      </View>
    </OnboardingLayout>
  );
};

export default PersonalInfoScreen; 