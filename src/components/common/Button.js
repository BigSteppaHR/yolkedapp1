import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  View,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

const Button = ({
  title,
  onPress,
  variant = 'primary', // primary, secondary, text, outline
  size = 'large', // small, medium, large
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  textStyle,
  icon,
  ...props
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 0,
    }).start();
  };

  const getButtonStyle = () => {
    const baseStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.xxl,
      overflow: 'hidden',
    };

    const sizeStyles = {
      small: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 36,
      },
      medium: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 44,
      },
      large: {
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.md + 2,
        minHeight: 52,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled
          ? theme.colors.border.primary
          : theme.colors.primary,
        ...theme.shadows.medium,
      },
      secondary: {
        backgroundColor: theme.colors.background.secondary,
        borderWidth: 1,
        borderColor: theme.colors.border.primary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: disabled
          ? theme.colors.border.primary
          : theme.colors.primary,
      },
      text: {
        backgroundColor: 'transparent',
        paddingHorizontal: theme.spacing.sm,
      },
    };

    return [
      baseStyle,
      sizeStyles[size],
      variantStyles[variant],
      fullWidth && { width: '100%' },
      style,
    ];
  };

  const getTextStyle = () => {
    const baseStyle = {
      ...theme.typography.button,
      textAlign: 'center',
    };

    const sizeStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    const variantStyles = {
      primary: {
        color: theme.colors.text.inverse,
      },
      secondary: {
        color: theme.colors.text.primary,
      },
      outline: {
        color: disabled ? theme.colors.text.tertiary : theme.colors.primary,
      },
      text: {
        color: disabled ? theme.colors.text.tertiary : theme.colors.primary,
      },
    };

    return [
      baseStyle,
      sizeStyles[size],
      variantStyles[variant],
      textStyle,
    ];
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={getButtonStyle()}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.8}
        {...props}
      >
        {loading ? (
          <ActivityIndicator
            size="small"
            color={
              variant === 'primary'
                ? theme.colors.text.inverse
                : theme.colors.primary
            }
          />
        ) : (
          <>
            {icon && <View style={{ marginRight: theme.spacing.sm }}>{icon}</View>}
            <Text style={getTextStyle()}>{title}</Text>
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button; 