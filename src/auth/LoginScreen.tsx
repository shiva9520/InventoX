import {
  GestureResponderEvent,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { StackActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { loginUser } from '../services/firebase';
import Snackbar from 'react-native-snackbar';
import googleLogo from '../../assets/logo/googleLogo.png';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { WEBCLIENTID } from '../utils/constants';
import { signInWithGoogle } from './services/googleAuth';
import { useTheme } from '../context/ThemeContext';

GoogleSignin.configure({
  webClientId: WEBCLIENTID,
});

type SignupNavProp = NativeStackNavigationProp<AuthStackParamList, 'login'>;

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [secure, setSecure] = React.useState(true);
  const navigation = useNavigation<SignupNavProp>();
  const { colors } = useTheme();

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      console.log('Logged in user:', user);
      Snackbar.show({
        text: 'Logged in successfully 🎉',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#4CAF50',
        textColor: '#fff',
      });
      setEmail('');
      setPassword('');
      navigation.dispatch(StackActions.replace('home'));
    } catch (error) {
      Snackbar.show({
        text: (error as Error).message,
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FF5252',
        textColor: '#fff',
      });
    }
  };

  const onGoogleSign = async () => {
    try {
      await signInWithGoogle();

      Snackbar.show({
        text: 'Google login successful 🎉',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#4CAF50',
        textColor: '#fff',
      });
      navigation.dispatch(StackActions.replace('home'));
    } catch (error: any) {
      console.log(error);

      Snackbar.show({
        text: error.message || 'Google Sign-In failed',
        duration: Snackbar.LENGTH_LONG,
        backgroundColor: '#FF5252',
        textColor: '#fff',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome InventoX</Text>
            <Text style={styles.subtitle}>Login to your account</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Login</Text>
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
                onChangeText={setPassword}
                value={password}
                placeholderTextColor="#999"
                style={styles.input}
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
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text
                onPress={() => navigation.navigate('signup')}
                style={styles.link}
              >
                Sign Up
              </Text>
            </Text>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
              <Text style={{ color: '#999' }}>
                --------------------OR---------------------
              </Text>
            </View>
            <View>
              <Pressable onPress={onGoogleSign} style={styles.googleButton}>
                <Image
                  source={googleLogo}
                  style={{ width: 24, height: 24, marginRight: 10 }}
                />
                <Text>Google Login</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
    paddingVertical:20
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
  googleButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
  },
});
