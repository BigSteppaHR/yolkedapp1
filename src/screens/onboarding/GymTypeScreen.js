import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import Button from '../../components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const GymTypeScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [selectedGymType, setSelectedGymType] = useState('');

  const gymTypes = [
    {
      id: 'commercial',
      title: 'Commercial Gym',
      description: 'Full gym with machines and free weights',
      icon: <MaterialCommunityIcons name="dumbbell" size={24} color={theme.colors.primary} />,
    },
    {
      id: 'home',
      title: 'Home/Garage',
      description: 'Limited equipment at home',
      icon: <MaterialCommunityIcons name="home" size={24} color={theme.colors.primary} />,
    },
    {
      id: 'none',
      title: 'No Equipment',
      description: 'Bodyweight training only',
      icon: <MaterialCommunityIcons name="human-handsup" size={24} color={theme.colors.primary} />,
    },
  ];

  const handleContinue = () => {
    const onboardingData = route.params?.onboardingData || {};
    navigation.navigate('OnboardingComplete', {
      onboardingData: {
        ...onboardingData,
        gymType: selectedGymType,
      },
    });
  };

  const titleStyle = {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  };

  const subtitleStyle = {
    ...theme.typography.body1,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xl,
  };

  return (
    <OnboardingLayout
      currentStep={6}
      totalSteps={7}
      onBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>Where do you train?</Text>
        <Text style={subtitleStyle}>
          We'll recommend workouts based on your access
        </Text>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          {gymTypes.map((gym) => (
            <SelectionCard
              key={gym.id}
              title={gym.title}
              description={gym.description}
              icon={gym.icon}
              selected={selectedGymType === gym.id}
              onPress={() => setSelectedGymType(gym.id)}
            />
          ))}
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedGymType}
        />
      </View>
    </OnboardingLayout>
  );
};

export default GymTypeScreen; 