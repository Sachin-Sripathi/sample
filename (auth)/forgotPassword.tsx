import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';
import Colors from '@/constants/Colors';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmitEmail = () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1500);
  };
  
  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setError('Please enter the verification code');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call - in a real app, we would verify the OTP with the server
    setTimeout(() => {
      setIsLoading(false);
      if (otp === '123456') { // Demo code
        setStep(3);
      } else {
        setError('Invalid verification code');
      }
    }, 1500);
  };
  
  const handleResetPassword = () => {
    if (!password.trim()) {
      setError('Please enter a new password');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.replace('/(auth)/login');
    }, 1500);
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
            <Text style={styles.header}>Reset Password</Text>
            <Text style={styles.subheader}>
              {step === 1 && "Enter your email to receive a reset link"}
              {step === 2 && "Enter the verification code sent to your email"}
              {step === 3 && "Create a new password"}
            </Text>
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
                  label="Email Address"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError(null);
                  }}
                />
                
                <CustomButton
                  title="Send Reset Link"
                  onPress={handleSubmitEmail}
                  isLoading={isLoading}
                />
              </>
            )}
            
            {step === 2 && (
              <>
                <Text style={styles.instructionText}>
                  We've sent a verification code to your email. Please enter the 6-digit code below.
                </Text>
                
                <CustomInput
                  label="Verification Code"
                  placeholder="Enter 6-digit code"
                  keyboardType="number-pad"
                  maxLength={6}
                  value={otp}
                  onChangeText={(text) => {
                    setOtp(text);
                    setError(null);
                  }}
                />
                
                <Text style={styles.otpHint}>
                  For demo purposes, use "123456" as the verification code.
                </Text>
                
                <CustomButton
                  title="Verify Code"
                  onPress={handleVerifyOtp}
                  isLoading={isLoading}
                />
                
                <TouchableOpacity 
                  style={styles.resendContainer}
                  onPress={() => {
                    // In a real app, we would resend the OTP
                    setError(null);
                  }}
                >
                  <Text style={styles.resendText}>Didn't receive a code? Resend</Text>
                </TouchableOpacity>
              </>
            )}
            
            {step === 3 && (
              <>
                <CustomInput
                  label="New Password"
                  placeholder="Enter new password"
                  secureTextEntry
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError(null);
                  }}
                />
                
                <CustomInput
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setError(null);
                  }}
                />
                
                <CustomButton
                  title="Reset Password"
                  onPress={handleResetPassword}
                  isLoading={isLoading}
                />
              </>
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
    marginBottom: 32,
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
  instructionText: {
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
  resendContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.primary.main,
  },
});