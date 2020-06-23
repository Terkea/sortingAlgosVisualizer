// Returns a Promise that resolves after "ms" Milliseconds
const timer = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};

const updateItem = (id, size, color, dispatch) => {
  dispatch({
    type: 'UPDATE_ITEM',
    payload: {
      id: id,
      value: size,
      status: color,
    },
  });
};

export { timer, updateItem };
