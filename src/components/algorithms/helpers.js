// Returns a Promise that resolves after "ms" Milliseconds
const timer = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};

const updateItem = (id, sizeSetting, color, dispatch) => {
  dispatch({
    type: 'UPDATE_ITEM',
    payload: {
      id: id,
      value: sizeSetting,
      status: color,
    },
  });
};

const swapItems = (item1, item2, dispatch) => {
  dispatch({
    type: 'SWAP_ITEMS',
    payload: {
      item1,
      item2,
    },
  });
};

const pushItem = (item, dispatch) => {
  dispatch({
    type: 'PUSH_ITEM',
    payload: {
      item,
    },
  });
};

const resetItemsColor = (dispatch) => {
  dispatch({
    type: 'RESET_ITEMS_COLOR',
  });
};

export { timer, updateItem, swapItems, pushItem, resetItemsColor };
