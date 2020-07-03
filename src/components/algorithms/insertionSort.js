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
      updateItem(temp_items[j].id, temp_items[j].value, 'evaluating', dispatch);
      updateItem(
        temp_items[j + 1].id,
        temp_items[j + 1].value,
        'evaluating',
        dispatch
      );

      await timer(speedSetting / 2);
      updateItem(temp_items[j].id, temp_items[j].value, 'evaluating', dispatch);
      updateItem(
        temp_items[j + 1].id,
        temp_items[j + 1].value,
        'isSwapping',
        dispatch
      );

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
