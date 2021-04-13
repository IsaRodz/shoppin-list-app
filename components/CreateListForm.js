import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { ShoppingListContext } from '../context';
import 'react-native-get-random-values';
import { v4 } from 'uuid';

import colors from './colors';

export default function CreateListForm({ onSubmit }) {
  const { dispatch } = useContext(ShoppingListContext);
  const [listTitle, setListTitle] = useState('');
  const [listColor, setListColor] = useState(colors[0]);

  const createList = () => {
    if (listTitle.length > 2) {
      dispatch({
        type: 'CREATE_LIST',
        payload: {
          newList: {
            id: v4(),
            title: listTitle,
            items: [],
            color: listColor,
            createdAt: new Date().toString()
          },
        },
      });
      onSubmit();
    }
  };
  return (
    <View>
      <Input
        placeholder="What's this list about?"
        value={listTitle}
        onChangeText={text => setListTitle(text)}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={colors}
        keyExtractor={item => item}
        style={styles.flatList}
        renderItem={({ item }) => (
          <Button
            containerStyle={{ margin: 0, marginRight: 10 }}
            buttonStyle={styles.color(item)}
            onPress={() => setListColor(item)}
          />
        )}
        horizontal
      />
      <Button
        containerStyle={styles.button}
        buttonStyle={{ backgroundColor: listColor }}
        title="Create list"
        onPress={createList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 0,
  },
  flatList: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: -16,
    paddingVertical: 10,
  },
  color: color => ({
    backgroundColor: color,
    width: 40,
    height: 40,
    borderRadius: 20,
  }),
});
