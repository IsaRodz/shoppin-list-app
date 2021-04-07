import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard } from 'react-native';
import { ShoppingListContext } from '../context';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

export default function CreateItemForm({ listId, listColor }) {
  const { dispatch } = useContext(ShoppingListContext);

  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);

  const handlePress = () => {
    if (name && name.length && price > 0) {
      const id = v4();
      dispatch({
        type: 'CREATE_LIST_ITEM',
        payload: {
          newItem: { id, name, price: parseFloat(price) },
          listId,
        },
      });
      setName(null);
      setPrice(null);
      Keyboard.dismiss();
    } else {
      alert('Fill the fields');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        style={styles.input}
        label="Name"
        onChangeText={name => setName(name)}
        value={name}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        label="Price"
        keyboardType="number-pad"
        value={price}
        onChangeText={price => setPrice(price)}
      />
      <TouchableNativeFeedback
        onPress={handlePress}
        style={styles.button(listColor)}
      >
        <Ionicons name="add" color="#fff" size={24} />
      </TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    height: 65,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    marginRight: 7,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    borderColor: '#ddd',
    flex: 1,
  },
  button: color => ({
    backgroundColor: color,
    flex: 1,
    height: 45,
    width: 45,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
