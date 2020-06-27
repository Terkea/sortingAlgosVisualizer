import React from 'react';

const Line = (props) => {
  const style = {
    height: 5 * props.size + 'px',
    width: props.width + 'px',
    marginLeft: 3 + 'px',
    marginRight: 3 + 'px',
    borderRadius: '0px 0px 50px 0px',
  };

  switch (props.status) {
    case 'evaluating':
      style.backgroundColor = colors.evaluating;
      break;
    case 'isSwapping':
      style.backgroundColor = colors.isSwapping;
      break;
    case 'swapped':
      style.backgroundColor = colors.swapped;
      break;
    default:
      style.backgroundColor = colors.default;
  }
  return <div style={style} />;
};

const colors = {
  default: '#7C05F2',
  evaluating: '#05F29B',
  isSwapping: '#F205CB',
};

export default Line;
