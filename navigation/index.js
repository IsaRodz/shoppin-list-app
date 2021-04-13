import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ListDetail from '../screens/ListDetail';

const Stack = createStackNavigator();
export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ListDetail" component={ListDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
