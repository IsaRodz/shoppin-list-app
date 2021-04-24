import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { ShoppingListContext } from '../context';
import formatedDate from '../helpers/formatDate';
import listTotal from '../helpers/getListTotal';

function ListDetailHeader({ list }) {
  console.log(list);
  const navigation = useNavigation();
  const { dispatch } = useContext(ShoppingListContext);
  const total = listTotal(list);

  const deleteList = () => {
    navigation.navigate('Home');
    setTimeout(() => {
      dispatch({
        type: 'DELETE_LIST',
        payload: { id: list.id },
      });
    }, 550);
  };

  return (
    <View style={[styles.container, { backgroundColor: list.color }]}>
      <StatusBar style="light" animated={true} />
      <View style={{ flex: 1 }}>
        <View style={styles.backButtonContainer}>
          <TouchableNativeFeedback
            onPress={() => navigation.goBack()}
            background={TouchableNativeFeedback.Ripple('white', true)}
            style={styles.backButtonTouchable}
          >
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableNativeFeedback>
        </View>
        <Text style={styles.title}>{list.title}</Text>
        <Text style={styles.subtitle}>
          Created: {formatedDate(list.createdAt)}
        </Text>
        <Text style={styles.subtitle}>Total: S/. {total}</Text>
      </View>
      <View style={styles.deleteButtonContainer}>
        <TouchableNativeFeedback
          style={styles.deleteButtonTouchable}
          background={TouchableNativeFeedback.Ripple('white', true)}
          onPress={deleteList}
        >
          <Feather name="trash-2" color="white" size={20} />
        </TouchableNativeFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 30,
    paddingHorizontal: 16,
  },
  backButtonContainer: {
    overflow: 'hidden',
    borderRadius: 40,
    width: 40,
    marginLeft: -10,
  },
  backButtonTouchable: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'white',
  },
  subtitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  deleteButtonContainer: {
    overflow: 'hidden',
    borderRadius: 40,
    width: 40,
    height: 40,
    marginRight: -10,
  },
  deleteButtonTouchable: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ListDetailHeader;
