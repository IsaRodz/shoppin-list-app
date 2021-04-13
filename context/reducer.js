const initialState = [];

function reducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case 'CREATE_LIST':
      return [...state, payload.newList];

    case 'DELETE_LIST':
      return state.filter(list => list.id !== payload.id);

    case 'CREATE_LIST_ITEM':
      newState = [...state];
      newState
        .find(list => list.id === payload.listId)
        .items.push(payload.newItem);

      return newState;

    case 'DELETE_LIST_ITEM':
      newState = [...state];

      let list = newState.find(list => list.id === payload.listId);
      let item = list.items.findIndex(item => item.id === payload.itemId);

      list.items.splice(item, 1);

      return newState;

    default:
      return state;
  }
}

export { reducer, initialState };
