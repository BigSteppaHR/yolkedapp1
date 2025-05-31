import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const ProgressIndicator = ({ currentStep, totalSteps, showText = true }) => {
  const theme = useTheme();
  const progress = (currentStep / totalSteps) * 100;

  const containerStyle = {
    marginBottom: theme.spacing.lg,
  };

  const progressBarContainerStyle = {
    height: 4,
    backgroundColor: theme.colors.border.primary,
    borderRadius: theme.borderRadius.full,
    overflow: 'hidden',
  };

  const progressBarStyle = {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.full,
    width: `${progress}%`,
  };

  const textStyle = {
    ...theme.typography.caption,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  };

  return (
    <View style={containerStyle}>
      <View style={progressBarContainerStyle}>
        <View style={progressBarStyle} />
      </View>
      {showText && (
        <Text style={textStyle}>
          {currentStep} / {totalSteps}
        </Text>
      )}
    </View>
  );
};

export default ProgressIndicator; 