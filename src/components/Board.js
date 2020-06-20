import React, { useState } from 'react'
import Line from './Line'

const Board = (props) => {
    return (
        <div style={styles.board}>
            {props.values.map((answer, i) => {
                // the value of the board width divided by the number of values from which we substract 5 (the margin factor per)
                return (<Line key={i} size={answer} width={(1000 / props.values.length) - 5} />)
            })}

        </div>
    )
}

const styles = {
    board: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        width: '1000px',
        height: '700px',
        margin: 'auto',
        display: 'flex'
    }
}

export default Board;