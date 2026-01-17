import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import Auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../auth/types';

type SplashNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'splashscreen'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashNavigationProp>();

  useEffect(() => {
    const unsubscribe = Auth().onAuthStateChanged(user => {
      setTimeout(() => {
        navigation.dispatch(
          StackActions.replace(user ? 'home' : 'login')
        );
      }, 2000);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#375DFB" barStyle="light-content" />

      <Text style={styles.logo}>InventoX</Text>

      <Text style={styles.tagline}>Manage your daily stocks smarter</Text>

      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#375DFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 2,
  },
  tagline: {
    marginTop: 10,
    fontSize: 14,
    color: '#E0E7FF',
  },
  loader: {
    marginTop: 40,
  },
});
