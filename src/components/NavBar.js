import React from 'react';
import './styles/NavBar.css';
import { Consumer } from '../context';

const SIZE_MAXIMUM = 100;
const SIZE_MINIMUM = 0;

const SPEED_MAXIMUM = 2000;
const SPEED_MINIMUM = 20; //ms

const NavBar = () => {

  const updateItem = (id, size, color, dispatch) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        id: id,
        value: size,
        status: color
      },
    });
  }

  const onChangeSize = (e, dispatch) => {
    const size = e.target.value;
    if (size > SIZE_MAXIMUM) {
      e.target.value = SIZE_MAXIMUM;
    } else if (size < SIZE_MINIMUM) {
      e.target.value = SIZE_MINIMUM;
    }
    dispatch({
      type: 'UPDATE_SIZE',
      payload: size,
    });

    // cant be 0
    var items = [];
    for (let i = 0; i < size; i++) {
      items.push({
        id: i,
        value: Math.floor(Math.random() * 100),
        status: 'default',
      });
    }

    dispatch({
      type: 'UPDATE_LIST',
      payload: items,
    });
  };

  const onChangeSpeed = (e, dispatch) => {
    const speed = e.target.value;
    if (speed > SPEED_MAXIMUM) {
      e.target.value = SPEED_MAXIMUM;
    } else if (speed < SPEED_MINIMUM) {
      e.target.value = SPEED_MINIMUM;
    }
    dispatch({
      type: 'UPDATE_SPEED',
      payload: speed,
    });
  };

  // Returns a Promise that resolves after "ms" Milliseconds
  function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  async function bubbleSort(items, speed, dispatch) {
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
        updateItem(temp_items[j].id, temp_items[j].value, 'evaluating', dispatch)
        updateItem(temp_items[j + 1].id, temp_items[j + 1].value, 'evaluating', dispatch)
        if (temp_items[j].value > temp_items[j + 1].value) {
          await timer(speed / 2);
          //Swap the numbers
          var tmp = temp_items[j].value; //Temporary variable to hold the current number
          temp_items[j].value = temp_items[j + 1].value; //Replace current number with adjacent number
          temp_items[j + 1].value = tmp; //Replace adjacent number with current number
          updateItem(temp_items[j].id, temp_items[j].value, 'evaluating', dispatch)
          updateItem(temp_items[j + 1].id, temp_items[j + 1].value, 'error', dispatch)

          await timer(speed / 2);
          updateItem(temp_items[j].id, temp_items[j].value, 'default', dispatch)
          updateItem(temp_items[j + 1].id, temp_items[j + 1].value, 'default', dispatch)
        } else {
          await timer(speed);
          updateItem(temp_items[j].id, temp_items[j].value, 'default', dispatch)
          updateItem(temp_items[j].id, temp_items[j].value, 'default', dispatch)
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

  async function insertionSort() {
    console.log('Preparing to insert');
  }

  async function selectionSort() {
    console.log('Preparing to selectionSort');
  }

  async function mergeSort() {
    console.log('Preparing to mergeSort');
  }

  async function quickSort() {
    console.log('Preparing to quickSort');
  }

  async function timSort() {
    console.log('Preparing to timSort');
  }

  async function heapSort() {
    console.log('Preparing to heapSort');
  }

  return (
    <Consumer>
      {(value) => {
        const { sorting, size, speed, items, dispatch } = value;
        let algorithm;
        let sortType = 'BUBBLE';
        const sort = () => {
          if (sorting == false) {
            switch (sortType) {
              case 'BUBBLE':
                algorithm = bubbleSort;
                break;
              case 'INSERTION':
                insertionSort();
                break;
              case 'SELECTION':
                selectionSort();
                break;
              case 'MERGE':
                mergeSort();
                break;
              case 'QUICK':
                quickSort();
                break;
              case 'TIM':
                timSort();
                break;
              case 'HEAP':
                heapSort();
                break;
              default:
                algorithm = null;
            }
            if (algorithm != null) {
              algorithm(items, speed, dispatch);
            }
          }
        };

        return (
          <nav style={navbarStyle}>
            <ul
              style={{
                margin: '0px',
                display: 'flex',
                listStyle: 'none',
                paddingTop: '.7em',
              }}
            >
              <li style={listElementsStyle}>Input Size</li>
              <input
                onChange={(e) => onChangeSize(e, dispatch)}
                style={listElementsStyle}
                type="number"
                defaultValue={size}
              />
              <div className="dropdown" style={listElementsStyle}>
                <button className="dropbtn">Sorting Algorithms ↴</button>
                <div className="dropdown-content">
                  <a onClick={() => (sortType = 'BUBBLE')}>Bubble Sort</a>
                  <a onClick={() => (sortType = 'INSERTION')}>Insertion Sort</a>
                  <a onClick={() => (sortType = 'SELECTION')}>Selection Sort</a>
                  <a onClick={() => (sortType = 'MERGE')}>Merge Sort</a>
                  <a onClick={() => (sortType = 'QUICK')}>Quick Sort</a>
                  <a onClick={() => (sortType = 'TIM')}>Tim Sort</a>
                  <a onClick={() => (sortType = 'HEAP')}>Heap Sort</a>
                </div>
              </div>
              <li style={listElementsStyle}>Speed</li>

              <input
                onChange={(e) => onChangeSpeed(e, dispatch)}
                style={listElementsStyle}
                type="number"
                defaultValue={speed}
              />
              <button onClick={() => sort(bubbleSort)}>SORT THIS SHIT</button>
            </ul>
          </nav>
        );
      }}
    </Consumer>
  );
};

const navbarStyle = {
  backgroundColor: '#ff6262',
  height: '3rem',
};

const listElementsStyle = {
  marginRight: '1em',
};

export default NavBar;
