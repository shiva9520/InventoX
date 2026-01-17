import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import toastConfig from '../toastConfig';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider>
   <NavigationContainer>
        <StackNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
      </ThemeProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
