import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';
import { ShoppingListContext } from '../context';
import CreateListForm from '../components/CreateListForm';
import ActionSheet from '../components/ActionSheet';
import { StatusBar } from 'expo-status-bar';
import renderListCard from '../components/renderListCard';
import { Dimensions } from 'react-native';

export default function Home() {
  const { state } = useContext(ShoppingListContext);

  const formSheet = useRef();
  const flatList = useRef();

  const handleSizeChange = () => {
    flatList.current.scrollToEnd({ animated: true });
  };

  const emptyList = () => (
    <View style={styles.emptyList}>
      <Feather name="archive" size={36} color="#c4c4c4" />
      <Text style={{ color: '#c4c4c4', fontSize: 16, marginTop: 10 }}>
        You don't have any lists yet
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" animated={true} />
      <Text style={styles.title}>My Shopping Lists</Text>
      <FlatList
        ref={flatList}
        onContentSizeChange={handleSizeChange}
        showsHorizontalScrollIndicator={false}
        style={{ marginLeft: 10, flexGrow: 0 }}
        data={state}
        keyExtractor={item => item.id}
        renderItem={renderListCard}
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 100,
    marginTop: -100,
  },
  emptyList: {
    marginLeft: -16,
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  floatingButton: {
    borderRadius: 55,
    height: 55,
    width: 55,
    padding: 0,
  },
});
