import {
  timer,
  updateItem,
  pushItems,
  pushItem,
  resetItemsColor,
} from './helpers';

export default function mergeSort(items, speed, dispatch) {
  // Merge Sort Implentation (Recursion)
  function actuallyMergeSort(unsortedArray) {
    // No need to sort the array if the array only has one element or empty
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }
    // In order to divide the array in half, we need to figure out the middle
    const middle = Math.floor(unsortedArray.length / 2);
    // This is where we will be dividing the array into left and right
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);

    // Using recursion to combine the left and right
    return merge(actuallyMergeSort(left), actuallyMergeSort(right));
  }

  // Merge the two arrays: left and right
  function merge(left, right) {
    let resultArray = [],
      leftIndex = 0,
      rightIndex = 0;

    // We will concatenate values into the resultArray in order

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].value < right[rightIndex].value) {
        updateItem(
          left[leftIndex].id,
          left[leftIndex].value,
          'evaluating',
          dispatch
        );
        timer(speed / 2);
        resultArray.push(left[leftIndex]);
        pushItem(
          {
            id: left[leftIndex].id,
            value: left[leftIndex].value,
            color: 'isSwapping',
          },
          dispatch
        );
        // await timer(speed / 2);
        // timer(speed / 2);
        leftIndex++; // move left array cursor
      } else {
        updateItem(
          right[rightIndex].id,
          right[rightIndex].value,
          'evaluating',
          dispatch
        );
        // await timer(speed / 2);
        resultArray.push(right[rightIndex]);
        pushItem(
          {
            id: right[rightIndex].id,
            value: right[rightIndex].value,
            color: 'isSwapping',
          },
          dispatch
        );
        // await timer(speed / 2);
        updateItem(
          right[rightIndex].id,
          right[rightIndex].value,
          'evaluating',
          dispatch
        );
        // timer(speed / 2);
        rightIndex++; // move right array cursor
      }
      resetItemsColor(dispatch);
    }

    // const leftSliced = left.slice(leftIndex);
    // const rightSliced = right.slice(rightIndex);
    // We need to concat here because there will be one element remaining
    // from either left OR the right

    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }
  actuallyMergeSort(items);
}
