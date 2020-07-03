import { timer, updateItem } from './helpers';

export default async function selectionSort(state) {
  const { items, speedSetting, dispatch } = state;

  var temp_items = items;
  var length = temp_items.length;

  for (let i = 0; i < length; i++) {
    let min = i;
    await timer(speedSetting);
    updateItem(temp_items[min].id, temp_items[min].value, 'error', dispatch);

    for (let j = i + 1; j < length; j++) {
      if (temp_items[min].value > temp_items[j].value) {
        await timer(speedSetting / 2);
        updateItem(
          temp_items[j].id,
          temp_items[j].value,
          'evaluating',
          dispatch
        );

        await timer(speedSetting / 2);
        updateItem(temp_items[j].id, temp_items[j].value, 'default', dispatch);

        min = j;
      }
    }
    if (min !== i) {
      let tmp = temp_items[i].value;
      temp_items[i].value = temp_items[min].value;
      temp_items[min].value = tmp;
      updateItem(temp_items[i].id, temp_items[i].value, 'default', dispatch);
      dispatch({
        type: 'UPDATE_LIST',
        payload: temp_items,
      });
    }
  }
  dispatch({
    type: 'UPDATE_LIST',
    payload: temp_items,
  });
}
