import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import RBSheet from 'react-native-raw-bottom-sheet';
import ShoppingItemForm from './CreateItemForm';
import ListItem from './Item';
import { ShoppingListContext } from '../context';

export default function AppContainer() {
  const bs = useRef();
  const { state } = useContext(ShoppingListContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={ListItem}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
      <Button
        containerStyle={{ margin: 20 }}
        title="Add new item"
        onPress={() => bs.current.open()}
      />
      <RBSheet
        ref={bs}
        closeOnDragDown={true}
        customStyles={{
          container: styles.bottomSheet,
          draggableIcon: styles.draggableIcon,
        }}
      >
        <ShoppingItemForm />
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
  },
  divider: {
    backgroundColor: '#ededed',
    height: 1,
    marginHorizontal: 16,
  },
  button: {
    margin: 16,
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
