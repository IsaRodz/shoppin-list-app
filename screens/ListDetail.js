import React, { useContext, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  FlatList,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CreateItemForm from '../components/CreateItemForm';
import { ShoppingListContext } from '../context';

import ListDetailHeader from '../components/ListDetailHeader';

const { configureNext, create } = LayoutAnimation;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const window = Dimensions.get('window');

export default function ListDetail({ route }) {
  const currentList = route.params.list;

  const emptyList = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('screen').height / 2,
      }}
    >
      <Feather name="archive" size={40} color="#c4c4c4" />
      <Text style={{ color: '#c4c4c4', fontSize: 18, marginVertical: 5 }}>
        This list is empty
      </Text>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} listId={currentList.id} />;

  return (
    <View style={styles.container}>
      <ListDetailHeader currentList={currentList} />
      <FlatList
        // onScroll={e => console.log(e)}
        data={currentList.items}
        ListEmptyComponent={emptyList}
        keyExtractor={list => list.id}
        renderItem={renderItem}
      />
      <CreateItemForm listId={currentList.id} listColor={currentList.color} />
    </View>
  );
}

function Item({ item, listId }) {
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Dimensions.get('window').height / 4,
  },
});
