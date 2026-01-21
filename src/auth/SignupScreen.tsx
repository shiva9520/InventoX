import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { createUser } from '../services/firebase';

type SignupNavProp = NativeStackNavigationProp<AuthStackParamList, 'signup'>;

const SignupScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [secure, setSecure] = useState(true);

  const navigation = useNavigation<SignupNavProp>();

  const handleSignup = async () => {
    try {
      await createUser(email, password, userName);
      Snackbar.show({
        text: 'Account created successfully 🎉',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#4CAF50',
        textColor: '#fff',
      });
      setEmail('');
      setPassword('');
      setUserName('');
      navigation.navigate('login');
    } catch (error: any) {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FF5252',
        textColor: '#fff',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign up to your</Text>
            <Text style={styles.title}>Account</Text>
            <Text style={styles.subtitle}>
              Enter your email and password to register
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Create Account</Text>

            <View style={styles.inputContainer}>
              <TextInput
                placeholder="User Name" 
                placeholderTextColor="#999"
                style={styles.input}
                value={userName}
                onChangeText={setUserName}
              />
              <Feather name="user" size={22} color="#999" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <Feather name="mail" size={22} color="#999" />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secure}
              />
              <TouchableOpacity onPress={() => setSecure(!secure)}>
                <Feather
                  name={secure ? 'eye' : 'eye-off'}
                  size={22}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                onPress={() => navigation.navigate('login')}
                style={styles.link}
              >
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#375DFB',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 10,
    color: '#E0E7FF',
    fontSize: 14,
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    elevation: 5,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingVertical:40
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color:'#000'
  },

  button: {
    backgroundColor: '#375DFB',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#444',
  },
  link: {
    color: '#375DFB',
    fontWeight: 'bold',
  },
});
