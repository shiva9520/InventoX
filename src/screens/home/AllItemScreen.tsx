import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Item } from './types';
import { useTheme } from '../../context/ThemeContext';

type Props = {
  data: Item[];
};
const AllItemScreen = ({ data }: Props) => {
  const { colors, toggleTheme, theme } = useTheme();
    const isDark = theme === 'dark';
  
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={[styles.headingText,{color: isDark?'#F5F5F5':'#121212'}]}>Item</Text>
        <Text style={[styles.headingText,{color: isDark?'#F5F5F5':'#121212'}]}>Quantity</Text>
      </View>
      <FlatList
        data={data ?? []}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.itemContainer,
              { backgroundColor: item.stock > 5 ? '#D7F6BFFF' : '#FFCCCC' },
            ]}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.stock}</Text>
          </View>
        )}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

export default AllItemScreen;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 7,
  },
  itemText: {
    fontSize: 15,
    fontWeight: '400',
  },
});
