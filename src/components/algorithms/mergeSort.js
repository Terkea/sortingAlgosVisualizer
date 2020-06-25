import { timer, updateItem } from './helpers';

export default async function mergeSort(items, speed, dispatch) {
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
        resultArray.push(left[leftIndex]);
        timer(speed / 2);
        leftIndex++; // move left array cursor
        updateItem(
          items[leftIndex].id,
          items[leftIndex].value,
          'error',
          dispatch
        );
      } else {
        resultArray.push(right[rightIndex]);
        timer(speed / 2);
        console.log('hello');
        rightIndex++; // move right array cursor
        updateItem(
          items[leftIndex].id,
          items[leftIndex].value,
          'evaluating',
          dispatch
        );
      }
    }
    // We need to concat here because there will be one element remaining
    // from either left OR the right
    return resultArray
      .concat(left.slice(leftIndex))
      .concat(right.slice(rightIndex));
  }
  actuallyMergeSort(items);
}
