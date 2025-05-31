import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  icon,
  rightIcon,
  onRightIconPress,
  style,
  containerStyle,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputContainerStyle = [
    {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.borderRadius.lg,
      borderWidth: 1,
      borderColor: error
        ? theme.colors.status.error
        : isFocused
        ? theme.colors.primary
        : theme.colors.border.primary,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
    },
    containerStyle,
  ];

  const inputStyle = [
    {
      flex: 1,
      ...theme.typography.body1,
      color: theme.colors.text.primary,
      paddingVertical: 0,
    },
    multiline && {
      minHeight: numberOfLines * 24,
      textAlignVertical: 'top',
    },
    style,
  ];

  const labelStyle = {
    ...theme.typography.body2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  };

  const errorStyle = {
    ...theme.typography.caption,
    color: theme.colors.status.error,
    marginTop: theme.spacing.xs,
  };

  const iconStyle = {
    marginRight: theme.spacing.sm,
    color: theme.colors.text.tertiary,
  };

  const rightIconStyle = {
    marginLeft: theme.spacing.sm,
    color: theme.colors.text.tertiary,
  };

  return (
    <View style={{ marginBottom: theme.spacing.md }}>
      {label && <Text style={labelStyle}>{label}</Text>}
      
      <View style={inputContainerStyle}>
        {icon && (
          <View style={iconStyle}>
            {icon}
          </View>
        )}
        
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.tertiary}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={inputStyle}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={rightIconStyle}
          >
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={theme.colors.text.tertiary}
            />
          </TouchableOpacity>
        )}
        
        {!secureTextEntry && rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            style={rightIconStyle}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={errorStyle}>{error}</Text>}
    </View>
  );
};

export default Input; 