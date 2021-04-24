import React, { useContext } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';
import CreateItemForm from '../components/CreateItemForm';

import ListDetailHeader from '../components/ListDetailHeader';
import Item from '../components/Item';
import { ShoppingListContext } from '../context';

export default function ListDetail({ route }) {
  const { state } = useContext(ShoppingListContext);
  const currentList = state.find(list => list.id === route.params.id);

  const emptyList = () => (
    <View style={styles.emptyList}>
      <Feather name="archive" size={40} color="#c4c4c4" />
      <Text style={styles.emptyListText}>This list is empty</Text>
    </View>
  );

  const renderItem = ({ item }) => {
    return <Item item={item} listId={currentList.id} />;
  };

  return (
    <View style={styles.container}>
      <ListDetailHeader list={currentList} />
      <FlatList
        data={currentList.items}
        ListEmptyComponent={emptyList}
        keyExtractor={list => list.id}
        renderItem={renderItem}
      />
      <CreateItemForm listId={currentList.id} listColor={currentList.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyList: {
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyListText: {
    color: '#c4c4c4',
    fontSize: 18,
    marginVertical: 5,
  },
});
