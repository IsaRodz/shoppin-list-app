import React, { useEffect, createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShoppingListContext = createContext();

function ShoppingListProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      const result = await AsyncStorage.getItem('@list-data');
      dispatch({
        type: 'LOAD_DATA',
        payload: {
          data: JSON.parse(result),
        },
      });
    };
    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@list-data', JSON.stringify(state));
  }, [state]);

  return (
    <ShoppingListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ShoppingListContext.Provider>
  );
}

export { ShoppingListContext, ShoppingListProvider };
