import { timer, updateItem } from './helpers';

export default function quickSort(state) {
  //////////////////////////
  const { items, speedSetting, dispatch } = state;

  async function swap(items, leftIndex, rightIndex) {
    let temp = items[leftIndex].value;
    await timer(speedSetting / 2);
    updateItem(
      items[leftIndex].id,
      items[rightIndex].value,
      'isSwapping',
      dispatch
    );
    await timer(speedSetting / 2);
    updateItem(items[rightIndex].id, temp, 'evaluating', dispatch);
  }

  function partition(items, left, right) {
    let pivot = items[Math.floor((right + left) / 2)].id, //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (items[i].id < pivot) {
        i++;
      }
      while (items[j].id > pivot) {
        j--;
      }
      if (i <= j) {
        swap(items, i, j); //swapping two elements
        i++;
        j--;
      }
    }
    return i;
  }

  function quickSort(items, left, right) {
    let index;
    if (items.length > 1) {
      index = partition(items, left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        quickSort(items, left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        quickSort(items, index, right);
      }
    }
    return items;
  }

  console.log('check it works');

  quickSort(items, 0, items.length - 1);
}
