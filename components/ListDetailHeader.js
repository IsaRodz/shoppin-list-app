import React, { useContext } from 'react';
import { View, Text, TouchableNativeFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { ShoppingListContext } from '../context';
import formatedDate from '../helpers/formatDate';
import listTotal from '../helpers/getListTotal';

function ListDetailHeader({ currentList }) {
  const navigation = useNavigation();
  const { dispatch } = useContext(ShoppingListContext);
  const total = listTotal(currentList);

  const deleteList = () => {
    dispatch({
      type: 'DELETE_LIST',
      payload: { id: currentList.id },
    });
    navigation.navigate('Home');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: currentList.color,
        paddingVertical: 30,
        paddingHorizontal: 16,
      }}
    >
      <StatusBar style="light" animated={true} />
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            overflow: 'hidden',
            borderRadius: 40,
            width: 40,
          }}
        >
          <TouchableNativeFeedback
            onPress={() => navigation.goBack()}
            background={TouchableNativeFeedback.Ripple('white', true)}
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableNativeFeedback>
        </View>
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            marginVertical: 16,
            color: 'white',
          }}
        >
          {currentList.title}
        </Text>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>
          Created: {formatedDate(currentList.createdAt)}
        </Text>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>
          Total: S/. {total}
        </Text>
      </View>
      <View
        style={{
          overflow: 'hidden',
          borderRadius: 40,
        }}
      >
        <TouchableNativeFeedback
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          background={TouchableNativeFeedback.Ripple('white', true)}
          onPress={deleteList}
        >
          <Feather name="trash-2" color="white" size={20} />
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

export default ListDetailHeader;
