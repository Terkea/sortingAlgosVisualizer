import React, { useState } from 'react';
import Line from './Line';
import { Consumer } from '../context';

const Board = (props) => {
  return (
    <Consumer>
      {(value) => {
        const { size, speed, items, dispatch } = value;
        return (
          <div style={styles.board}>
            {items.map((value, i) => {
              // the value of the board width divided by the number of values from which we substract 5 (the margin factor per)
              return (
                <Line key={i} size={value} width={1000 / items.length - 5} />
              );
            })}
          </div>
        );
      }}
    </Consumer>
  );
};

const styles = {
  board: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    width: '1000px',
    height: '700px',
    margin: 'auto',
    display: 'flex',
  },
};

export default Board;
