import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from '../auth/SignupScreen';
import LoginScreen from '../auth/LoginScreen';
import Home from '../screens/home/Home';
import SplashScreen from '../screens/SplashScreen';
const stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="splashscreen" component={SplashScreen} />
      <stack.Screen name="login" component={LoginScreen} />
      <stack.Screen name="signup" component={SignupScreen} />
      <stack.Screen name="home" component={Home} />
    </stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
