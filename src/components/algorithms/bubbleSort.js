import { timer, updateItem } from './helpers';

export default async function bubbleSort(items, speed, dispatch) {
  //prevent from sorting multiple times
  dispatch({
    type: 'UPDATE_SORTING',
    payload: true,
  });

  // We need to wrap the loop into an async function for this to work
  var temp_items = items;
  var length = temp_items.length;

  for (var i = 0; i < length; i++) {
    //Number of passes
    for (var j = 0; j < length - i - 1; j++) {
      //Notice that j < (length - i)
      // Compare the adjacent positions
      await timer(speed);
      updateItem(temp_items[j].id, temp_items[j].value, 'evaluating', dispatch);
      updateItem(
        temp_items[j + 1].id,
        temp_items[j + 1].value,
        'evaluating',
        dispatch
      );
      if (temp_items[j].value > temp_items[j + 1].value) {
        await timer(speed / 2);
        //Swap the numbers
        var tmp = temp_items[j].value; //Temporary variable to hold the current number
        temp_items[j].value = temp_items[j + 1].value; //Replace current number with adjacent number
        temp_items[j + 1].value = tmp; //Replace adjacent number with current number
        updateItem(
          temp_items[j].id,
          temp_items[j].value,
          'evaluating',
          dispatch
        );
        updateItem(
          temp_items[j + 1].id,
          temp_items[j + 1].value,
          'error',
          dispatch
        );

        await timer(speed / 2);
        updateItem(temp_items[j].id, temp_items[j].value, 'default', dispatch);
        updateItem(
          temp_items[j + 1].id,
          temp_items[j + 1].value,
          'default',
          dispatch
        );
      } else {
        await timer(speed);
        updateItem(temp_items[j].id, temp_items[j].value, 'default', dispatch);
        updateItem(
          temp_items[j + 1].id,
          temp_items[j + 1].value,
          'default',
          dispatch
        );
      }
    }
  }
  dispatch({
    type: 'UPDATE_LIST',
    payload: temp_items,
  });
  //prevent from sorting multiple times
  dispatch({
    type: 'UPDATE_SORTING',
    payload: false,
  });
}
