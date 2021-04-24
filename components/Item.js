import React, { useContext, useRef } from 'react';
import {
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { ListItem } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { ShoppingListContext } from '../context';

const { configureNext, create } = LayoutAnimation;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const window = Dimensions.get('window');

export default function Item({ item, listId }) {
  const { dispatch } = useContext(ShoppingListContext);
  const translateX = useRef(new Animated.Value(0)).current;

  const deleteItem = () => {
    Animated.timing(translateX, {
      duration: 150,
      toValue: -window.width,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      configureNext(create(150, 'linear', 'opacity'));
      dispatch({
        type: 'DELETE_LIST_ITEM',
        payload: { itemId: item.id, listId },
      });
    }, 150);
  };

  const listItemAction = () => (
    <Animated.View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
      }}
    >
      <Feather name="trash-2" size={20} color="#fff" />
      <Text style={{ color: '#fff' }}>Delete</Text>
    </Animated.View>
  );

  return (
    <Swipeable
      containerStyle={{
        backgroundColor: '#f44336',
      }}
      rightThreshold={window.width / 2}
      renderRightActions={listItemAction}
      onSwipeableRightWillOpen={deleteItem}
    >
      <Animated.View style={{ transform: [{ translateX }] }}>
        <ListItem bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
            <ListItem.Subtitle>S/. {item.price}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </Animated.View>
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
