import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import CustomButton from '@/components/CustomButton';

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/7214783/pexels-photo-7214783.jpeg' }} 
          style={styles.logo} 
        />
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Meet + Connect</Text>
        <Text style={styles.tagline}>Meet by chance, Connect by choice.</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <CustomButton 
          title="Login" 
          variant="primary" 
          onPress={() => router.push('/(auth)/login')} 
        />
        <CustomButton 
          title="Create Account" 
          variant="secondary" 
          onPress={() => router.push('/(auth)/register')} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: Colors.primary.light,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: Colors.primary.main,
    marginBottom: 8,
  },
  tagline: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 32,
  },
});