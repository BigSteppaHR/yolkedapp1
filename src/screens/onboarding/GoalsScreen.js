import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import SelectionCard from '../../components/common/SelectionCard';
import Button from '../../components/common/Button';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const GoalsScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const [selectedGoal, setSelectedGoal] = useState('');

  const goals = [
    {
      id: 'strength',
      title: 'Get Stronger',
      description: 'Focus on lifting heavier weights',
      icon: <MaterialCommunityIcons name="weight-lifter" size={24} color={theme.colors.primary} />,
    },
    {
      id: 'muscle',
      title: 'Build Muscle',
      description: 'Increase size and definition',
      icon: <MaterialCommunityIcons name="arm-flex" size={24} color={theme.colors.primary} />,
    },
    {
      id: 'lose_weight',
      title: 'Lose Weight',
      description: 'Burn fat and get leaner',
      icon: <MaterialCommunityIcons name="scale-bathroom" size={24} color={theme.colors.primary} />,
    },
    {
      id: 'general',
      title: 'General Fitness',
      description: 'Overall health and wellness',
      icon: <Feather name="heart" size={24} color={theme.colors.primary} />,
    },
  ];

  const handleContinue = () => {
    const onboardingData = route.params?.onboardingData || {};
    navigation.navigate('GymType', {
      onboardingData: {
        ...onboardingData,
        primaryGoal: selectedGoal,
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
      currentStep={5}
      totalSteps={7}
      onBack={() => navigation.goBack()}
    >
      <View style={{ flex: 1 }}>
        <Text style={titleStyle}>What's your main goal?</Text>
        <Text style={subtitleStyle}>
          We'll create a plan to help you achieve it
        </Text>

        <View style={{ flex: 1, justifyContent: 'center' }}>
          {goals.map((goal) => (
            <SelectionCard
              key={goal.id}
              title={goal.title}
              description={goal.description}
              icon={goal.icon}
              selected={selectedGoal === goal.id}
              onPress={() => setSelectedGoal(goal.id)}
            />
          ))}
        </View>

        <Button
          title="Continue"
          onPress={handleContinue}
          disabled={!selectedGoal}
        />
      </View>
    </OnboardingLayout>
  );
};

export default GoalsScreen; 