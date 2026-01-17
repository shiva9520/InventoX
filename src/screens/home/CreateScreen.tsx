import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { Item } from './types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { showSuccess, showError } from '../../utils/toast';
import { useTheme } from '../../context/ThemeContext';
import {
  addItem,
  updateItem,
  deleteItem,
} from '../../services/firebase';

type Props = {
  data: Item[];
  setData: React.Dispatch<React.SetStateAction<Item[]>>;
};

type Errors = {
  name?: string;
  stock?: string;
};

const CreateScreen: React.FC<Props> = ({ data, setData }) => {
  const [itemName, setItemName] = React.useState('');
  const [stockAmount, setStockAmount] = React.useState('');
  const [isEdit, setIsEdit] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [errors, setErrors] = React.useState<Errors>({});
  const { colors, toggleTheme, theme } = useTheme();
      const isDark = theme === 'dark';

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!itemName.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!stockAmount.trim()) {
      newErrors.stock = 'Stock amount is required';
    } else if (isNaN(Number(stockAmount)) || Number(stockAmount) < 0) {
      newErrors.stock = 'Stock must be a valid number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleAddOrEdit = async () => {
  if (!validate()) return;

  try {
    if (isEdit && editingId !== null) {
      const updatedItem: Item = {
        id: editingId,
        name: itemName,
        stock: Number(stockAmount),
      };

      await updateItem(updatedItem);
      showSuccess('Item updated successfully');
    } else {
      const newItem: Item = {
        id: Date.now(),
        name: itemName,
        stock: Number(stockAmount),
      };

      await addItem(newItem);
      showSuccess('Item added successfully');
    }

    resetForm();
  } catch (error) {
    showError('Something went wrong');
  }
};


  const resetForm = () => {
    setItemName('');
    setStockAmount('');
    setErrors({});
    setIsEdit(false);
    setEditingId(null);
  };

  const editItemHandler = (item: Item) => {
    setItemName(item.name);
    setStockAmount(item.stock.toString());
    setIsEdit(true);
    setEditingId(item.id);
    setErrors({});

  };

 const deleteItemHandler = async (id: number) => {
  try {
    await deleteItem(id);
    showSuccess('Item deleted successfully');
  } catch (error) {
    showError('Failed to delete item');
  }
};


  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errors.name && styles.errorInput, {color: isDark?'#fff':'#000', borderColor: isDark?'#F5F5F5':'#D7F6BFFF'}]}
        placeholder="Enter Item"
        placeholderTextColor={isDark?'#fff':'#999'}
        value={itemName}
        onChangeText={text => {
          setItemName(text);
          if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
        }}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, errors.stock && styles.errorInput, {color: isDark?'#fff':'#000', borderColor: isDark?'#F5F5F5':'#D7F6BFFF'}]}
        placeholder="Enter Stock Amount"
        placeholderTextColor={isDark?'#fff':'#999'}
        value={stockAmount}
        keyboardType="numeric"
        onChangeText={text => {
          setStockAmount(text);
          if (errors.stock) setErrors(prev => ({ ...prev, stock: undefined }));
        }}
      />
      {errors.stock && <Text style={styles.errorText}>{errors.stock}</Text>}

      <Pressable
        style={[
          styles.addButton,
          Object.keys(errors).length > 0 && styles.disabledButton,
        ]}
        onPress={handleAddOrEdit}
      >
        <Text style={styles.addButtonText}>
          {isEdit ? 'UPDATE ITEM' : 'ADD ITEM'}
        </Text>
      </Pressable>

      <View style={{ marginVertical: 10 }}>
        <Text style={[styles.headingText, { color: isDark ? '#F5F5F5' : '#121212' }]}>All Items in the Stock</Text>

        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.itemContainer,
                {
                  backgroundColor: item.stock > 5 ? '#D7F6BFFF' : '#FFCCCC',
                },
              ]}
            >
              <Text style={styles.itemText}>{item.name}</Text>

              <View style={{ flexDirection: 'row', gap: 20 }}>
                <Text style={styles.itemText}>{item.stock}</Text>

                <Pressable onPress={() => editItemHandler(item)}>
                  <MaterialIcons name="edit" size={20} />
                </Pressable>

                <Pressable onPress={() => deleteItemHandler(item.id)}>
                  <MaterialIcons name="delete" size={20} color="red" />
                </Pressable>
              </View>
            </View>
          )}
          contentContainerStyle={{ gap: 10 }}
        />
      </View>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '4%',
    gap: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D7F6BFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  addButton: {
    backgroundColor: '#CABFEEFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },
  headingText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
  },

  errorInput: {
    borderColor: 'red',
  },

  disabledButton: {
    opacity: 0.7,
  },
});
