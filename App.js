import React from 'react';
import { ThemeProvider } from 'react-native-elements';
import { ShoppingListProvider } from './context';
import AppContainer from './navigation';
import theme from './theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ShoppingListProvider>
        <AppContainer />
      </ShoppingListProvider>
    </ThemeProvider>
  );
}
