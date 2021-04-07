import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import {
  FlatList,
  TouchableNativeFeedback,
} from 'react-native-gesture-handler';
import { Divider, ListItem } from 'react-native-elements';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import CreateItemForm from '../components/CreateItemForm';
import { ShoppingListContext } from '../context';

const { configureNext, create } = LayoutAnimation;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const window = Dimensions.get('window');

export default function ListDetail({ route, navigation }) {
  const { dispatch } = useContext(ShoppingListContext);
  const currentList = route.params.list;

  const deleteList = () => {
    dispatch({
      type: 'DELETE_LIST',
      payload: { id: currentList.id },
    });
    navigation.navigate('Home');
  };

  useEffect(() => {
    navigation.setOptions({
      title: currentList.title,
      headerStyle: {
        backgroundColor: currentList.color,
      },
      headerTintColor: 'white',
      headerRight: () => (
        <TouchableNativeFeedback
          style={{ flexDirection: 'row' }}
          background={TouchableNativeFeedback.Ripple('#161616', true, 20)}
          onPress={deleteList}
        >
          <Ionicons name="trash-outline" color="white" size={20} />
        </TouchableNativeFeedback>
      ),
      headerRightContainerStyle: { marginRight: 16 },
    });
  });

  const emptyList = () => (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('screen').height / 2,
      }}
    >
      <Ionicons name="folder-open-outline" size={40} color="#c4c4c4" />
      <Text style={{ color: '#c4c4c4', fontSize: 18, marginVertical: 5 }}>
        This list is empty
      </Text>
    </View>
  );

  const renderItem = ({ item }) => <Item item={item} listId={currentList.id} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={currentList.items}
        ListEmptyComponent={emptyList}
        keyExtractor={list => list.id}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
      <CreateItemForm listId={currentList.id} listColor={currentList.color} />
    </View>
  );
}

function Item({ item, listId }) {
  const { dispatch } = useContext(ShoppingListContext);
  const [willDelete, setWillDelete] = useState(false);
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

  const listItemAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
    });

    return (
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 16,
          borderRadius: 4,
          // transform: [{ scale }],
        }}
      >
        <Ionicons name="trash-outline" size={20} color="#fff" />
        <Text style={{ color: '#fff' }}>Delete</Text>
      </Animated.View>
    );
  };

  return (
    <Swipeable
      containerStyle={{
        backgroundColor: !willDelete ? '#f44336' : '#9a9a9a',
      }}
      rightThreshold={window.width / 2}
      renderRightActions={listItemAction}
      onSwipeableRightWillOpen={deleteItem}
    >
      <Animated.View style={{ transform: [{ translateX }] }}>
        <ListItem>
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
