import React from 'react';
import ReactDOM from 'react-dom';
import './styles/NavBar.css';
import { Consumer } from '../context';

// Algorithms:
import bubbleSort from './algorithms/bubbleSort';
import insertionSort from './algorithms/insertionSort';
import selectionSort from './algorithms/selectionSort';
import mergeSort from './algorithms/mergeSort';
import quickSort from './algorithms/quickSort';

// TODO: these options have to be better implemented elsewhere

const SIZE_MAXIMUM = 100;
const SIZE_MINIMUM = 0;

const SPEED_MAXIMUM = 2000; // ms

let algorithm = bubbleSort; // default option

const onChangeSize = (e, dispatch) => {
  const sizeSetting = e.target.value;
  if (sizeSetting > SIZE_MAXIMUM) {
    e.target.value = SIZE_MAXIMUM;
  } else if (sizeSetting < SIZE_MINIMUM) {
    e.target.value = SIZE_MINIMUM;
  }
  dispatch({
    type: 'UPDATE_SIZE_SETTING',
    payload: sizeSetting,
  });
};

const resetItems = (dispatch) => {
  dispatch({
    type: 'UPDATE_IS_SORTING',
    payload: false,
  });
  dispatch({
    type: 'GENERATE_RANDOM_LIST',
  });
};

const onChangeSpeed = (e, dispatch) => {
  const speedSetting = e.target.value;
  if (speedSetting > SPEED_MAXIMUM) {
    e.target.value = SPEED_MAXIMUM;
  } else if (speedSetting < 0) {
    e.target.value = 0;
  }
  dispatch({
    type: 'UPDATE_SPEED_SETTING',
    payload: speedSetting,
  });
};

async function timSort(items, speedSetting, dispatch) {
  console.log('Preparing to timSort');
}

async function heapSort(items, speedSetting, dispatch) {
  console.log('Preparing to heapSort');
}

const setSortType = (e, dispatch) => {
  let domNode = ReactDOM.findDOMNode(e.target);
  let option = domNode.innerText.split(' ')[0];
  console.log(option);
  switch (option) {
    case 'Bubble':
      algorithm = bubbleSort;
      break;
    case 'Insertion':
      algorithm = insertionSort;
      break;
    case 'Selection':
      algorithm = selectionSort;
      break;
    case 'Merge':
      algorithm = mergeSort;
      break;
    case 'Quick':
      algorithm = quickSort;
      break;
    case 'Tim':
      algorithm = timSort;
      break;
    case 'Heap':
      algorithm = heapSort;
      break;
    default:
      break;
  }
  console.log(algorithm);
  // Must set isSortingSetting to false so it makes it stop when selecting a new option
  dispatch({
    type: 'UPDATE_IS_SORTING',
    payload: false,
  });
};

const sort = async (state) => {
  const { isSortingSetting, dispatch } = state;
  console.log(isSortingSetting);
  if (state.isSortingSetting === false) {
    if (algorithm != null) {
      dispatch({
        type: 'UPDATE_IS_SORTING',
        payload: true,
      });
      await algorithm(state);
      dispatch({
        type: 'UPDATE_IS_SORTING',
        payload: false,
      });
    }
  }
};

const NavBar = () => {
  return (
    <Consumer>
      {(state) => {
        const {
          isSortingSetting,
          sizeSetting,
          speedSetting,
          items,
          dispatch,
        } = state;

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
                defaultValue={sizeSetting}
              />
              <div className="dropdown" style={listElementsStyle}>
                <button className="dropbtn">Sorting Algorithms ↴</button>
                <div className="dropdown-content">
                  <a onClick={(e) => setSortType(e, dispatch)}>Bubble Sort</a>
                  <a onClick={(e) => setSortType(e, dispatch)}>
                    Insertion Sort
                  </a>
                  <a onClick={(e) => setSortType(e, dispatch)}>
                    Selection Sort
                  </a>
                  {/* <a onClick={(e) => setSortType(e,dispatch)}>Merge Sort</a>
                  <a onClick={(e) => setSortType(e,dispatch)}>Quick Sort</a>
                  <a onClick={(e) => setSortType(e,dispatch)}>Tim Sort</a>
                  <a onClick={(e) => setSortType(e,dispatch)}>Heap Sort</a> */}
                </div>
              </div>
              <li style={listElementsStyle}>Speed</li>

              <input
                onChange={(e) => onChangeSpeed(e, dispatch)}
                style={listElementsStyle}
                type="number"
                defaultValue={speedSetting}
              />
              <button onClick={() => sort(state)}>SORT</button>
              <div style={{ paddingLeft: '1em' }} />
              <button onClick={() => resetItems(dispatch)}>Reset</button>
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
