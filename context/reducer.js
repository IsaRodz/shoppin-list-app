const initialState = [];

function reducer(state = initialState, action) {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case 'LOAD_DATA':
      newState = payload.data;
      break;

    case 'CREATE_LIST':
      newState = [...state, payload.newList];
      break;

    case 'DELETE_LIST':
      newState = state.filter(list => list.id !== payload.id);
      break;

    case 'CREATE_LIST_ITEM':
      newState = [...state];
      newState
        .find(list => list.id === payload.listId)
        .items.push(payload.newItem);
      break;

    case 'DELETE_LIST_ITEM':
      newState = [...state];

      let list = newState.find(list => list.id === payload.listId);
      let item = list.items.findIndex(item => item.id === payload.itemId);

      list.items.splice(item, 1);
      break;

    default:
      return state;
  }

  return newState;
}

export { reducer, initialState };
