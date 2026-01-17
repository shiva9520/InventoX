import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { logoutUser } from '../../services/firebase';
import { useNavigation } from '@react-navigation/native';
import { AuthStackParamList } from '../../auth/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AllItemScreen from './AllItemScreen';
import CreateScreen from './CreateScreen';
import Feather from 'react-native-vector-icons/Feather';
import { Item } from './types';
import { useTheme } from '../../context/ThemeContext';
import { subscribeItems } from '../../services/firebase';

type HomeNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'login'
>;

const Home = () => {
  const [view, setView] = useState(0);
  const [data, setData] = useState<Item[]>([]);
  const { colors, toggleTheme, theme } = useTheme();
  const isDark = theme === 'dark';

  const navigation = useNavigation<HomeNavigationProp>();
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.reset({
        index: 0,
        routes: [{ name: 'login' }],
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  useEffect(() => {
  const unsubscribe = subscribeItems(setData);
  return () => unsubscribe();
}, []);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={[styles.dashboardText, { color: colors.text }]}>
          Dashboard
        </Text>
        <Pressable onPress={toggleTheme}>
          <Feather
            name={isDark ? 'sun' : 'moon'}
            size={24}
            color={colors.text}
          />
        </Pressable>
        <TouchableOpacity
          style={{
            backgroundColor: isDark ? '#F5F5F5' : '#121212',
            height: 40,
            width: 100,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: isDark ? '#121212' : '#F5F5F5' }}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            view === 0
              ? { backgroundColor: isDark ? '#F5F5F5' : '#72C37AFF' }
              : null,
          ]}
          onPress={() => setView(0)}
        >
          <Text
            style={[
              styles.buttonText,
              view === 0
                ? { color: !isDark ? '#F5F5F5' : '#121212' }
                : { color: isDark ? '#F5F5F5' : '#121212' },
            ]}
          >
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 1
              ? { backgroundColor: isDark ? '#F5F5F5' : '#72C37AFF' }
              : null,
          ]}
          onPress={() => setView(1)}
        >
          <Text
            style={[
              styles.buttonText,
              view === 1
                ? { color: !isDark ? '#F5F5F5' : '#121212' }
                : { color: isDark ? '#F5F5F5' : '#121212' },
            ]}
          >
            Low Stock
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            view === 2
              ? { backgroundColor: isDark ? '#F5F5F5' : '#72C37AFF' }
              : null,
          ]}
          onPress={() => setView(2)}
        >
          <Text
            style={[
              styles.buttonText,
              view === 2
                ? { color: !isDark ? '#F5F5F5' : '#121212' }
                : { color: isDark ? '#F5F5F5' : '#121212' },
            ]}
          >
            Create
          </Text>
        </Pressable>
      </View>

      {view === 0 && <AllItemScreen data={data} />}
      {view === 1 && (
        <AllItemScreen data={data.filter(item => item.stock < 5)} />
      )}
      {view === 2 && <CreateScreen data={data} setData={setData} />}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '4%',
    backgroundColor: '#fff',
  },
  dashboardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 0.8,
    borderColor: '#72C37AFF',
  },
  buttonText: {
    fontSize: 12,
  },
});
