import React from 'react'


const Line = (props) => {
    const style = {
        height: 5 * props.size + 'px',
        width: props.width + 'px',
        marginLeft: '5px',
        marginRight: '5px'
    }

    switch (props.status) {
        case 'error':
            style.backgroundColor = colors.error
            break;
        case 'allright':
            style.backgroundColor = colors.allright
            break;
        case 'swapped':
            style.backgroundColor = colors.swapped
            break;
        default:
            style.backgroundColor = colors.default
    }

    return (
        <div style={style}/>
    )
}

const colors = {
    default: 'blue',
    error: 'red',
    allright: 'green',
    swapped: 'purple'
}



export default Line;