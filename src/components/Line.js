import React from 'react';

const Line = (props) => {
    const style = {
        height: 5 * props.size + 'px',
        width: props.width + 'px',
        marginLeft: 3 + 'px',
        marginRight: 3 + 'px',
    };

    switch (props.status) {
        case 'evaluating':
            style.backgroundColor = colors.evaluating;
            break;
        case 'error':
            style.backgroundColor = colors.error;
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
    default: 'blue',
    evaluating: 'green',
    error: 'red',
    swapped: 'purple',
};

export default Line;
