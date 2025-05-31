import React, { useRef, useEffect } from 'react';
import { TouchableOpacity, Text, View, Animated } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { Feather } from '@expo/vector-icons';

const SelectionCard = ({
  title,
  description,
  selected,
  onPress,
  icon,
  disabled = false,
  style,
}) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const borderAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: selected ? 1 : 0,
      duration: theme.animation.fast,
      useNativeDriver: false,
    }).start();
  }, [selected]);

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

  const cardStyle = [
    {
      backgroundColor: theme.colors.background.card,
      borderRadius: theme.borderRadius.xl,
      padding: theme.spacing.lg,
      marginBottom: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      opacity: disabled ? 0.5 : 1,
      ...theme.shadows.small,
    },
    style,
  ];

  const animatedBorderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.border.primary, theme.colors.primary],
  });

  const contentContainerStyle = {
    flex: 1,
    marginRight: theme.spacing.md,
  };

  const titleStyle = {
    ...theme.typography.h5,
    color: theme.colors.text.primary,
    marginBottom: description ? theme.spacing.xs : 0,
    fontWeight: '600',
  };

  const descriptionStyle = {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  };

  const iconContainerStyle = {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: selected
      ? theme.colors.primary + '15'
      : theme.colors.background.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.md,
  };

  const checkIconContainerStyle = {
    width: 24,
    height: 24,
    borderRadius: theme.borderRadius.full,
    backgroundColor: selected
      ? theme.colors.primary
      : theme.colors.background.secondary,
    borderWidth: selected ? 0 : 2,
    borderColor: theme.colors.border.primary,
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Animated.View
        style={[
          cardStyle[0],
          {
            borderWidth: 2,
            borderColor: animatedBorderColor,
          },
          style,
        ]}
      >
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          activeOpacity={0.8}
        >
          {icon && (
            <View style={iconContainerStyle}>
              {icon}
            </View>
          )}
          
          <View style={contentContainerStyle}>
            <Text style={titleStyle}>{title}</Text>
            {description && (
              <Text style={descriptionStyle}>{description}</Text>
            )}
          </View>
          
          <View style={checkIconContainerStyle}>
            {selected && (
              <Feather
                name="check"
                size={16}
                color={theme.colors.text.inverse}
              />
            )}
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default SelectionCard; 