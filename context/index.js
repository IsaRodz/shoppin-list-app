import React, { createContext, useReducer } from "react";
import { reducer, initialState } from "./reducer";

const ShoppingListContext = createContext();

function ShoppingListProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <ShoppingListContext.Provider value={{ state, dispatch }}>
      {props.children}
    </ShoppingListContext.Provider>
  );
}

export { ShoppingListContext, ShoppingListProvider };
