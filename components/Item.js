import React, { useContext } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { ShoppingListContext } from '../context';

export default function Item({ item, listId }) {
  const { dispatch } = useContext(ShoppingListContext);

  const deleteItem = () => {
    dispatch({
      type: 'DELETE_LIST_ITEM',
      payload: {
        itemId: item.id,
        listId: listId,
      },
    });
    console.log('delete', item.id);
  };

  const Actions = () => (
    <TouchableNativeFeedback style={styles.buttonContainer}>
      <Animated.View style={styles.deleteButton}>
        <Ionicons color="white" name="trash-outline" size={20} />
        <Text style={styles.buttonText}>Delete</Text>
      </Animated.View>
    </TouchableNativeFeedback>
  );

  return (
    <Swipeable renderLeftActions={Actions} onSwipeableWillOpen={deleteItem}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>S/. {item.price}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  listItemText: {
    color: '#313131',
  },
  buttonContainer: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 20,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});
