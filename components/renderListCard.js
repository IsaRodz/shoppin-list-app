import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import listTotal from '../helpers/getListTotal';

export default renderListCard = ({ item }) => {
  return <ListCard list={item} />;
};

const ListCard = ({ list }) => {
  const navigation = useNavigation();
  const total = listTotal(list);

  const goToDetail = () => {
    navigation.navigate('ListDetail', { id: list.id });
  };

  return (
    <View style={[styles.card, { backgroundColor: list.color }]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('white', true)}
        onPress={goToDetail}
        style={styles.touchable}
      >
        <Text style={{ fontSize: 18, color: '#fff', marginBottom: 7 }}>
          {list.title}
        </Text>
        <Text style={{ color: '#fff9', fontSize: 24 }}>
          {list.items.length}
        </Text>
        <Text style={{ color: '#fff9', marginBottom: 7 }}>Items</Text>
        <Text style={{ color: '#fff9', fontSize: 24 }}>S/. {total}</Text>
        <Text style={{ color: '#fff9' }}>Total</Text>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
