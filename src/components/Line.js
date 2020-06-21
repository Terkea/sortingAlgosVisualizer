import React from 'react';

const Line = (props) => {
  const style = {
    height: 5 * props.size + 'px',
    width: props.width + 'px',
    marginLeft: '5px',
    marginRight: '5px',
  };

  switch (props.status) {
    case 'evaluating':
      style.backgroundColor = colors.evaluating;
      break;
    case 'finished':
      style.backgroundColor = colors.finished;
      break;
    default:
      style.backgroundColor = colors.default;
  }

  return <div style={style} />;
};

const colors = {
  default: 'blue',
  evaluating: 'red',
  finished: 'green',
};

export default Line;
