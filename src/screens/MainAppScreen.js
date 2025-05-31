import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { authService } from '../services/authService';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MainAppScreen = ({ navigation }) => {
  const theme = useTheme();

  const handleLogout = async () => {
    await authService.logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background.primary,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.spacing.xl,
    }}>
      <MaterialCommunityIcons
        name="dumbbell"
        size={80}
        color={theme.colors.primary}
        style={{ marginBottom: theme.spacing.xl }}
      />
      
      <Text style={{
        ...theme.typography.h1,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
      }}>
        Welcome to Yolked!
      </Text>
      
      <Text style={{
        ...theme.typography.body1,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xxl,
      }}>
        This is where your main app will be. The workout tracker, AI coach, and all other features will be implemented here.
      </Text>

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          padding: theme.spacing.md,
          backgroundColor: theme.colors.background.secondary,
          borderRadius: theme.borderRadius.lg,
        }}
      >
        <Text style={{
          ...theme.typography.button,
          color: theme.colors.text.primary,
        }}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainAppScreen; 