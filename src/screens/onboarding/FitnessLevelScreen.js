import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import Button from '../../components/common/Button';
import { Feather } from '@expo/vector-icons';

const FitnessLevelScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [selectedLevel, setSelectedLevel] = useState('');

  const fitnessLevels = [
    {
      id: 'beginner',
      title: 'Beginner',
      description: 'New or returning to fitness',
      icon: <Feather name="star" size={24} color={theme.colors.primary} />,
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      description: '6 months to 2 years experience',
      icon: <Feather name="trending-up" size={24} color={theme.colors.primary} />,
    },
    {
      id: 'advanced',
      title: 'Advanced',
      description: '2+ years consistent training',
      icon: <Feather name="award" size={24} color={theme.colors.primary} />,
    },
  ];

  const handleContinue = () => {
    const onboardingData = route.params?.onboardingData || {};
    navigation.navigate('Goals', {
      onboardingData: {
        ...onboardingData,
        fitnessLevel: selectedLevel,
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
    marginBottom: theme.spacing.xxl,
  };

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={7}
      onBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>What's your experience level?</Text>
        <Text style={subtitleStyle}>
          This helps us tailor your workouts
        </Text>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          {fitnessLevels.map((level) => (
            <SelectionCard
              key={level.id}
              title={level.title}
              description={level.description}
              icon={level.icon}
              selected={selectedLevel === level.id}
              onPress={() => setSelectedLevel(level.id)}
            />
          ))}
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedLevel}
        />
      </View>
    </OnboardingLayout>
  );
};

export default FitnessLevelScreen; 