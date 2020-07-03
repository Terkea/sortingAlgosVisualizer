import { timer, updateItem } from './helpers';

export default async function bubbleSort(state) {
  const { items, speedSetting, dispatch } = state;
  //prevent from isSortingSetting multiple times

  // We need to wrap the loop into an async function for this to work
  var temp_items = items;
  var length = temp_items.length;

  for (var i = 0; i < length; i++) {
    //Number of passes
    await timer(speedSetting / 2);
    for (var j = 0; j < length - i - 1; j++) {
      //Notice that j < (length - i)
      // Compare the adjacent positions
      await timer(speedSetting);

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

      if (temp_items[j].value > temp_items[j + 1].value) {
        await timer(speedSetting / 2);

        // Swap the numbers
        var tmp = temp_items[j].value; //Temporary variable to hold the current number
        temp_items[j].value = temp_items[j + 1].value; //Replace current number with adjacent number
        temp_items[j + 1].value = tmp; //Replace adjacent number with current number

        dispatch({
          type: 'UPDATE_ITEM',
          payload: {
            ...temp_items[j + 1],
            status: 'isSwapping',
          },
        });
      }
      await timer(speedSetting / 2);

      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          ...temp_items[j],
          status: 'default',
        },
      });
      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          ...temp_items[j + 1],
          status: 'default',
        },
      });
    }
  }
}
