import React from 'react';
import './styles/NavBar.css';
import { Consumer } from '../context';

const SIZE_MAXIMUM = 100;
const SIZE_MINIMUM = 0;

const SPEED_MAXIMUM = 2000;
const SPEED_MINIMUM = 200; //ms

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
      type: 'GENERATE_LIST',
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

  const updateItem = (item, dispatch) => {
    const { id, size } = item;
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        id: id,
        // grab the original value
        size: size,
        status: 'error'
      },
    });
  }



  return (
    <Consumer>
      {(value) => {
        const { size, speed, items, dispatch } = value;
        const sort = (algorithm) => {

          var arr = Object.keys(items).map(function (key) {
            return [Number(key), items[key]];
          });

          console.log(arr)

          let swapped;
          do {
            swapped = false;
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].value > arr[i + 1].value) {
                let tmp = arr[i].value;
                arr[i].value = arr[i + 1].value;
                arr[i + 1].value = tmp;
                swapped = true;
              }
            }
          } while (swapped);
          console.log(arr);
        }

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
              <button onClick={() => sort('bubble')} >SORT THIS SHIT</button>
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
