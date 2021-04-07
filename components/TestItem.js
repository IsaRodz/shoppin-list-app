import React, { useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const TestItem = ({ text }) => {
  const ITEM_HEIGHT = useRef(new Animated.Value(54));

  const action = () => {
    return (
      <View>
        <Ionicons name="trash-outline" />
      </View>
    );
  };

  return (
    <Swipeable
      containerStyle={{
        height: ITEM_HEIGHT,
      }}
      renderRightActions={action}
      onSwipeableRightOpen={() => console.log('delete')}
    >
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{text}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </Swipeable>
  );
};

export default TestItem;
