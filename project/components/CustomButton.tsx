import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps } from 'react-native';
import Colors from '@/constants/Colors';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'danger';
  isLoading?: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  style,
  ...props
}) => {
  const getButtonStyles = () => {
    switch (variant) {
      case 'primary':
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledPrimaryButton,
        ];
      case 'secondary':
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledSecondaryButton,
        ];
      case 'outline':
        return [
          styles.button,
          styles.outlineButton,
          disabled && styles.disabledOutlineButton,
        ];
      case 'text':
        return [styles.textButton, disabled && styles.disabledTextButton];
      case 'danger':
        return [
          styles.button,
          styles.dangerButton,
          disabled && styles.disabledDangerButton,
        ];
      default:
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledPrimaryButton,
        ];
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'primary':
        return [styles.buttonText, styles.primaryButtonText];
      case 'secondary':
        return [styles.buttonText, styles.secondaryButtonText];
      case 'outline':
        return [styles.buttonText, styles.outlineButtonText];
      case 'text':
        return [styles.buttonText, styles.textButtonText];
      case 'danger':
        return [styles.buttonText, styles.dangerButtonText];
      default:
        return [styles.buttonText, styles.primaryButtonText];
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'text' ? Colors.primary.main : Colors.text.white}
        />
      ) : (
        <Text style={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: Colors.primary.main,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary.main,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary.main,
  },
  textButton: {
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  dangerButton: {
    backgroundColor: Colors.error.main,
  },
  disabledPrimaryButton: {
    backgroundColor: Colors.grey[400],
  },
  disabledSecondaryButton: {
    backgroundColor: Colors.grey[300],
  },
  disabledOutlineButton: {
    borderColor: Colors.grey[400],
  },
  disabledTextButton: {
    opacity: 0.5,
  },
  disabledDangerButton: {
    backgroundColor: Colors.grey[400],
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    textAlign: 'center',
  },
  primaryButtonText: {
    color: Colors.text.white,
  },
  secondaryButtonText: {
    color: Colors.text.primary,
  },
  outlineButtonText: {
    color: Colors.primary.main,
  },
  textButtonText: {
    color: Colors.primary.main,
  },
  dangerButtonText: {
    color: Colors.text.white,
  },
});

export default CustomButton;