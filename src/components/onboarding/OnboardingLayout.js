import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import ProgressIndicator from '../common/ProgressIndicator';

const OnboardingLayout = ({
  children,
  currentStep,
  totalSteps = 7,
  onBack,
  showProgress = true,
  showBackButton = true,
  scrollEnabled = true,
  keyboardAvoidingViewEnabled = true,
}) => {
  const theme = useTheme();

  const containerStyle = {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  };

  const headerStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
  };

  const backButtonStyle = {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.small,
  };

  const contentContainerStyle = {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  };

  const scrollContentStyle = {
    flexGrow: 1,
    paddingBottom: theme.spacing.xxl,
  };

  const renderContent = () => {
    const content = (
      <View style={contentContainerStyle}>
        {showProgress && currentStep && (
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        )}
        {children}
      </View>
    );

    if (scrollEnabled) {
      return (
        <ScrollView
          contentContainerStyle={scrollContentStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      );
    }

    return content;
  };

  const mainContent = (
    <SafeAreaView style={containerStyle}>
      <View style={headerStyle}>
        {showBackButton && onBack ? (
          <TouchableOpacity
            style={backButtonStyle}
            onPress={onBack}
            activeOpacity={0.7}
          >
            <Feather
              name="arrow-left"
              size={20}
              color={theme.colors.text.primary}
            />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>
      {renderContent()}
    </SafeAreaView>
  );

  if (keyboardAvoidingViewEnabled) {
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {mainContent}
      </KeyboardAvoidingView>
    );
  }

  return mainContent;
};

export default OnboardingLayout; 