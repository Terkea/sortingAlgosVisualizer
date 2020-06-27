import React from 'react';
import './styles/NavBar.css';
import { Consumer } from '../context';

// Algorithms:
import bubbleSort from './algorithms/bubbleSort';
import insertionSort from './algorithms/insertionSort';
import selectionSort from './algorithms/selectionSort';
import mergeSort from './algorithms/mergeSort';
import quickSort from './algorithms/quickSort';

const SIZE_MAXIMUM = 100;
const SIZE_MINIMUM = 0;

const SPEED_MAXIMUM = 2000;
const SPEED_MINIMUM = 20; //ms

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

async function timSort(items, speed, dispatch) {
  console.log('Preparing to timSort');
}

async function heapSort(items, speed, dispatch) {
  console.log('Preparing to heapSort');
}

const NavBar = () => {
  return (
    <Consumer>
      {(value) => {
        const { sorting, size, speed, items, dispatch } = value;
        let algorithm;
        let sortType = 'BUBBLE';
        const sort = () => {
          if (sorting === false) {
            switch (sortType) {
              case 'BUBBLE':
                console.log('bubble');
                algorithm = bubbleSort;
                break;
              case 'INSERTION':
                console.log('insertion');
                insertionSort(items, speed, dispatch);
                break;
              case 'SELECTION':
                console.log('selection');
                selectionSort(items, speed, dispatch);
                break;
              case 'MERGE':
                console.log('merge');
                mergeSort(items, speed, dispatch);
                break;
              case 'QUICK':
                console.log('quick');
                quickSort(items, speed, dispatch);
                break;
              case 'TIM':
                console.log('tim');
                timSort(items, speed, dispatch);
                break;
              case 'HEAP':
                console.log('heap');
                heapSort(items, speed, dispatch);
                break;
              default:
                algorithm = bubbleSort;
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
              <button onClick={() => sort()}>SORT THIS SHIT</button>
            </ul>
          </nav>
        );
      }}
    </Consumer>
  );
};

const navbarStyle = {
  backgroundColor: '#6204BF',
  height: '3rem',
};

const listElementsStyle = {
  marginRight: '1em',
};

export default NavBar;
