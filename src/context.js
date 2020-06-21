import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SIZE':
      return {
        ...state,
        size: action.payload,
      };
    case 'UPDATE_SPEED':
      return {
        ...state,
        speed: action.payload,
      };
    case 'UPDATE_LIST':
      return {
        ...state,
        items: action.payload,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id !== action.payload.id) {
            return item;
          } else {
            return action.payload;
          }
        }),
      };
    default:
      return state;
  }
};

// cant be 0
var items = [];
for (let i = 0; i < 20; i++) {
  items.push({
    id: i,
    value: Math.floor(Math.random() * 100),
    status: 'default',
  });
}

export class Provider extends Component {
  state = {
    size: 20,
    speed: 200, //ms
    items: items,
    dispatch: (action) => this.setState((state) => reducer(state, action)),
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
