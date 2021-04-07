import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ListItem from './components/ListItem';

const list = [
  { id: 1, name: 'Chicken', price: 14.9 },
  { id: 2, name: 'Cheese', price: 4.0 },
  { id: 3, name: 'Rice', price: 2.5 },
  { id: 4, name: 'Carrots', price: 1.5 },
  { id: 5, name: 'Banana', price: 2.0 },
];

export default function ShoppingList() {
  return (
    <FlatList
      data={list}
      keyExtractor={item => item.id}
      renderItem={ListItem}
      ItemSeparatorComponent={() => <View style={styles.divider} />}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    backgroundColor: '#ededed',
    height: 1,
    marginHorizontal: 16,
  },
});
