import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const { register, isLoading, error, clearError } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    bio: '',
    phone: '',
    interests: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.otp.trim()) {
      newErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
      // In a real app, we would send an OTP to the user's phone or email here
    }
  };

  const handleSubmit = () => {
    if (validateStep3()) {
      // For demo purposes, we'll consider the OTP as valid if it's "123456"
      if (formData.otp === '123456') {
        register(
          {
            name: formData.name,
            email: formData.email,
            bio: formData.bio,
            interests: formData.interests.split(',').map(i => i.trim()),
          },
          formData.password
        );
      } else {
        setErrors({ otp: 'Invalid OTP' });
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => {
              if (step === 1) {
                router.back();
              } else {
                setStep(step - 1);
              }
            }}
          >
            <ArrowLeft color={Colors.text.primary} size={24} />
          </TouchableOpacity>
          
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Create Account</Text>
            <Text style={styles.subheader}>{`Step ${step} of 3`}</Text>
          </View>
          
          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            
            {step === 1 && (
              <>
                <CustomInput
                  label="Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChangeText={(text) => updateFormData('name', text)}
                  error={errors.name}
                />
                
                <CustomInput
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => updateFormData('email', text)}
                  error={errors.email}
                />
                
                <CustomInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) => updateFormData('phone', text)}
                  error={errors.phone}
                />
                
                <CustomInput
                  label="Bio (optional)"
                  placeholder="Tell us about yourself"
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                  value={formData.bio}
                  onChangeText={(text) => updateFormData('bio', text)}
                />
                
                <CustomInput
                  label="Interests (optional)"
                  placeholder="E.g. Hiking, Reading, Travel (comma separated)"
                  value={formData.interests}
                  onChangeText={(text) => updateFormData('interests', text)}
                />
              </>
            )}
            
            {step === 2 && (
              <>
                <CustomInput
                  label="Password"
                  placeholder="Create a password"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => updateFormData('password', text)}
                  error={errors.password}
                />
                
                <CustomInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  secureTextEntry
                  value={formData.confirmPassword}
                  onChangeText={(text) => updateFormData('confirmPassword', text)}
                  error={errors.confirmPassword}
                />
              </>
            )}
            
            {step === 3 && (
              <>
                <Text style={styles.otpText}>
                  We've sent a verification code to your email and phone number. Please enter the 6-digit code to verify your account.
                </Text>
                
                <CustomInput
                  label="Verification Code (OTP)"
                  placeholder="Enter 6-digit code"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={formData.otp}
                  onChangeText={(text) => updateFormData('otp', text)}
                  error={errors.otp}
                />
                
                <Text style={styles.otpHint}>
                  For demo purposes, use "123456" as the verification code.
                </Text>
              </>
            )}
            
            {step < 3 ? (
              <CustomButton
                title="Next"
                onPress={handleNextStep}
              />
            ) : (
              <CustomButton
                title="Create Account"
                onPress={handleSubmit}
                isLoading={isLoading}
              />
            )}
            
            {step === 1 && (
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  headerContainer: {
    marginBottom: 24,
  },
  header: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  subheader: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
  },
  formContainer: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: Colors.error.light,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.error.dark,
  },
  otpText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  otpHint: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontStyle: 'italic',
    color: Colors.primary.main,
    marginTop: 8,
    marginBottom: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text.secondary,
  },
  loginLink: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary.main,
  },
});