import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { ShoppingListContext } from '../context';
import CreateListForm from '../components/CreateListForm';
import ActionSheet from '../components/ActionSheet';
import { StatusBar } from 'expo-status-bar';
import listTotal from '../helpers/getListTotal';

export default function Home({ navigation }) {
  const { state } = useContext(ShoppingListContext);

  const formSheet = useRef();
  const flatList = useRef();

  const handleSizeChange = () => {
    flatList.current.scrollToEnd({ animated: true });
  };

  const renderItem = ({ item }) => {
    const total = listTotal(item);

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
          <Text style={{ color: '#fff9', fontSize: 24 }}>S/. {total}</Text>
          <Text style={{ color: '#fff9' }}>Total</Text>
        </TouchableNativeFeedback>
      </View>
    );
  };

  const emptyList = () => (
    <View style={styles.emptyList}>
      <Feather name="archive" size={36} color="#9a9a9a" />
      <Text style={{ color: '#9a9a9a', fontSize: 16 }}>
        You don't have any lists yet
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" animated={true} />
      <Text
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          marginHorizontal: 16,
          marginBottom: 100,
          marginTop: -100,
        }}
      >
        My ShoppingList
      </Text>
      <FlatList
        ref={flatList}
        onContentSizeChange={handleSizeChange}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 8, flexGrow: 0 }}
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
        containerStyle={{ position: 'absolute', bottom: 30 }}
        buttonStyle={{ width: 60, height: 60, borderRadius: 30 }}
        onPress={() => formSheet.current.open()}
        icon={() => <Feather color="white" size={24} name="plus" />}
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
    minWidth: 160,
  },
  touchable: {
    padding: 16,
    alignItems: 'center',
  },
});
