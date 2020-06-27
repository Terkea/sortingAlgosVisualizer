import React, { Component } from 'react';

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_SIZE': // TODO - SEPARATE ITEM ARRAY RELATED CONTEXT FROM THE OPTIONS RELATED CONTEXT
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
      //TODO - ADAPT THIS:
      // for (let i = 0; i < 60; i++) {
      //   items.push({
      //     id: i,
      //     value: Math.floor(Math.random() * 140),
      //     status: 'default',
      //   });
      // }
      break;
    case 'UPDATE_LIST':
      return {
        ...state,
        items: action.payload,
      };
    case 'UPDATE_SORTING':
      return {
        ...state,
        sorting: action.payload,
      };
    case 'RESET_ITEMS_COLOR':
      return {
        ...state,
        items: state.items.map((item) => {
          return {
            ...item,
            status: 'default',
          };
        }),
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
    case 'SWAP_ITEMS':
      const { item1, item2 } = action.payload;
      return {
        ...state,
        items: state.items.map((item) => {
          if (item !== item1 && item !== item2) {
            return item;
          } else if (item === item1) {
            return {
              id: item1.id,
              value: item2.value,
              status: item1.status,
            };
          } else if (item === item2) {
            return {
              id: item2.id,
              value: item1.value,
              status: item2.status,
            };
          }
        }),
      };
    case 'PUSH_ITEM':
      // itemsArray1 <=PUSH itemsArray2
      let { items } = state;
      const { item } = action.payload;
      // console.log('start');
      // console.log(items[items.length - 1]);
      // console.log(items);
      items = items.filter((itm) => itm.id !== item.id);
      // console.log(items);
      items = [...items, item];
      // console.log(items);
      // console.log('end');

      return {
        ...state,
        items: items.map((item, i) => {
          return {
            id: i,
            ...item,
          };
        }),
      };
    // case 'PUSH_ITEMS':
    //   // itemsArray1 <=PUSH itemsArray2
    //   const { items } = state;
    //   const { itemsArray1, itemsArray2 } = action.payload;
    //   const tempArray = [...itemsArray1, ...itemsArray2].map((item, i) => {
    //     return {
    //       id: i,
    //       value: item.value,
    //       status: item.status,
    //     };
    //   });
    //   const new_state = {
    //     ...state,
    //     items: items.map((item) => {
    //       return item.id > tempArray[0].id ? [item] : tempArray;
    //     }),
    //   };
    //   return new_state;
    default:
      return state;
  }
};

// cant be 0
var items = [];
for (let i = 0; i < 60; i++) {
  items.push({
    id: i,
    value: Math.floor(Math.random() * 140),
    status: 'default',
  });
}

export class Provider extends Component {
  state = {
    sorting: false,
    size: 60,
    speed: 0, //ms
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
