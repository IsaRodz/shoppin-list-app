import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ShoppingListContext } from '../context';
import CreateListForm from '../components/CreateListForm';
import ActionSheet from '../components/ActionSheet';

export default function Home({ navigation }) {
  const { state } = useContext(ShoppingListContext);

  const formSheet = useRef();

  const renderItem = ({ item }) => {
    const total = (function () {
      const list = item;
      return list.items.reduce((acc, item) => item.price + acc, 0);
    })();

    const goToDetail = () => {
      navigation.navigate('ListDetail', { list: item });
    };

    return (
      <View style={[styles.item, { backgroundColor: item.color }]}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#c4c4c4', true)}
          onPress={goToDetail}
          style={styles.touchable}
        >
          <Text style={{ fontSize: 18, color: '#fff', marginBottom: 7 }}>
            {item.title}
          </Text>
          <Text style={{ color: '#fff9', fontSize: 24 }}>
            {item.items.length}
          </Text>
          <Text style={{ color: '#fff9', marginBottom: 7 }}>Items</Text>
          <Text style={{ color: '#fff9', fontSize: 24 }}>{total}</Text>
          <Text style={{ color: '#fff9' }}>Total</Text>
        </TouchableNativeFeedback>
      </View>
    );
  };

  const emptyList = () => (
    <View style={styles.emptyList}>
      <Ionicons name="folder-open-outline" size={36} color="#9a9a9a" />
      <Text style={{ color: '#9a9a9a', fontSize: 16 }}>
        You don't have any lists yet
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{ marginLeft: 8 }}
        data={state}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={emptyList}
        horizontal
      />
      <ActionSheet ref={formSheet} title="Create a new shopping list">
        <CreateListForm onSubmit={() => formSheet.current.close()} />
      </ActionSheet>
      <Button
        containerStyle={{ margin: 30 }}
        buttonStyle={{ width: 60, height: 60, borderRadius: 30 }}
        onPress={() => formSheet.current.open()}
        icon={() => <Ionicons color="white" size={24} name="add" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  bottomSheet: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  draggableIcon: {
    height: 4,
    backgroundColor: '#eaeaea',
  },
  floatingButton: {
    borderRadius: 55,
    height: 55,
    width: 55,
    padding: 0,
  },
  item: {
    borderRadius: 5,
    marginRight: 8,
    overflow: 'hidden',
    alignSelf: 'center',
    width: 160,
  },
  touchable: {
    padding: 16,
    alignItems: 'center',
  },
});
