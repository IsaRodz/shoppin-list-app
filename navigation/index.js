import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import Home from '../screens/Home';
import ListDetail from '../screens/ListDetail';

const Stack = createStackNavigator();
export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerTitle: 'My Shopping Lists',
            headerStyle: {
              elevation: 0,
            },
          }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="ListDetail"
          component={ListDetail}
          options={{
            headerTintColor: 'white',
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
