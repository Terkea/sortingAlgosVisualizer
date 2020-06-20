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
    case 'GENERATE_LIST':
      return {
        ...state,
        items: action.payload,
      };
    // case 'UPDATE_LIST':
    //   return {
    //     ...state,
    //     contacts: state.contacts.filter(
    //       (contact) => contact.id !== action.payload
    //     ),
    //   };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    size: 20,
    speed: 200, //ms
    items: [],
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
