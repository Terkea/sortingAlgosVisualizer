import { timer, updateItem } from './helpers';

export default async function insertionSort(state) {
  const { items, speedSetting, dispatch } = state;
  var temp_items = items;
  var length = temp_items.length;
  for (let i = 1; i < length; i++) {
    let j = i - 1;
    let temp = temp_items[i].value;
    updateItem(temp_items[i].id, temp_items[i].value, 'isSwapping', dispatch);

    while (j >= 0 && temp_items[j].value > temp) {
      await timer(speedSetting / 2);

      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          ...temp_items[j],
          status: 'evaluating',
        },
      });

      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          ...temp_items[j + 1],
          status: 'evaluating',
        },
      });

      await timer(speedSetting / 2);

      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          ...temp_items[j],
          status: 'evaluating',
        },
      });

      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          ...temp_items[j + 1],
          status: 'isSwapping',
        },
      });

      temp_items[j + 1].value = temp_items[j].value;
      await timer(speedSetting);

      j--;
      dispatch({
        type: 'UPDATE_LIST',
        payload: temp_items,
      });
    }
    temp_items[j + 1].value = temp;
  }
}
