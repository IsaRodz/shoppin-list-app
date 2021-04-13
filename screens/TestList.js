import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, Divider, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import 'react-native-get-random-values';
import { v4 } from 'uuid';
import ActionSheet from '../components/ActionSheet';
import TestItem from '../components/TestItem';

export default function TestList() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState(null);

  const bs = useRef(null);

  const openSheet = () => bs.current.open();

  const emptyList = () => (
    <View style={{ paddingVertical: 50, alignItems: 'center' }}>
      <Ionicons size={40} color="#9a9a9a" name="archive-open-outline" />
      <Text style={{ fontSize: 16, color: '#7a7a7a', marginVertical: 7 }}>
        You don't have items yet
      </Text>
      <Button title="Create a new one" onPress={openSheet} />
    </View>
  );

  const renderItem = ({ item }) => {
    return <TestItem text={item.text} />;
  };

  const addNewItem = () => {
    setList([
      ...list,
      {
        text: newItem,
        id: v4(),
      },
    ]);
    setNewItem(null);
    bs.current.close();
  };

  return (
    <View>
      <ActionSheet ref={bs}>
        <Input
          value={newItem}
          onChangeText={value => setNewItem(value)}
          label="New item"
        />
        <Button title="Create new item" onPress={addNewItem} />
      </ActionSheet>
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={emptyList}
        ItemSeparatorComponent={Divider}
      />
      {list.length ? (
        <Button title="Create new item" onPress={openSheet} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
