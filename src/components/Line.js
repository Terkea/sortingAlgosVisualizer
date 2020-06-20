import React, { useState } from 'react'


const Line = (props) => {
    const [status, setStatus] = useState('default');

    const onClick = () => {
        setStatus('error')
    }

    const style = {
        height: 5 * props.size + 'px',
        width: props.width + 'px',
        marginLeft: '5px',
        marginRight: '5px'
    }

    switch (status) {
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
        <div style={style} onClick={onClick} />
    )
}

const colors = {
    default: 'blue',
    error: 'red',
    allright: 'green',
    swapped: 'purple'
}



export default Line;