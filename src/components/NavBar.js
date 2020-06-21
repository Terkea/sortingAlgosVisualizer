import React from 'react';
import './styles/NavBar.css';
import { Consumer } from '../context';

const SIZE_MAXIMUM = 100;
const SIZE_MINIMUM = 0;

const SPEED_MAXIMUM = 2000;
const SPEED_MINIMUM = 20; //ms

const NavBar = (props) => {
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
        dispatch({
          type: 'UPDATE_ITEM',
          payload: {
            id: temp_items[j].id,
            value: temp_items[j].value,
            status: 'evaluating',
          },
        });
        dispatch({
          type: 'UPDATE_ITEM',
          payload: {
            id: temp_items[j + 1].id,
            value: temp_items[j + 1].value,
            status: 'evaluating',
          },
        });
        if (temp_items[j].value > temp_items[j + 1].value) {
          await timer(speed / 2);
          //Swap the numbers
          var tmp = temp_items[j].value; //Temporary variable to hold the current number
          temp_items[j].value = temp_items[j + 1].value; //Replace current number with adjacent number
          temp_items[j + 1].value = tmp; //Replace adjacent number with current number
          dispatch({
            type: 'UPDATE_ITEM',
            payload: {
              id: temp_items[j].id,
              value: temp_items[j].value,
              status: 'evaluating',
            },
          });
          dispatch({
            type: 'UPDATE_ITEM',
            payload: {
              id: temp_items[j + 1].id,
              value: temp_items[j + 1].value,
              status: 'error',
            },
          });

          await timer(speed / 2);
          dispatch({
            type: 'UPDATE_ITEM',
            payload: {
              id: temp_items[j].id,
              value: temp_items[j].value,
              status: 'default',
            },
          });
          dispatch({
            type: 'UPDATE_ITEM',
            payload: {
              id: temp_items[j + 1].id,
              value: temp_items[j + 1].value,
              status: 'default',
            },
          });
        } else {
          await timer(speed);

          dispatch({
            type: 'UPDATE_ITEM',
            payload: {
              id: temp_items[j].id,
              value: temp_items[j].value,
              status: 'default',
            },
          });
          dispatch({
            type: 'UPDATE_ITEM',
            payload: {
              id: temp_items[j + 1].id,
              value: temp_items[j + 1].value,
              status: 'default',
            },
          });
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

  return (
    <Consumer>
      {(value) => {
        const { sorting, size, speed, items, dispatch } = value;
        const sort = (algorithm) => {
          if (sorting == false) {
            algorithm(items, speed, dispatch);
          }

          console.log(items);
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
                  <a href="#">Bubble Sort</a>
                  <a href="#">Insertion Sort</a>
                  <a href="#">Selection Sort</a>
                  <a href="#">Merge Sort</a>
                  <a href="#">Quick Sort</a>
                  <a href="#">Tim Sort</a>
                  <a href="#">Heap Sort</a>
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
