import React from 'react'

export default function Score(props) {
    const { score } = props

    return (
        <div className='score-wrapper'>
            <span>P1</span>
            <div className='score-container'>
                <span className='score'>{score[1]}</span>
                <span>-</span>
                <span className='score'>{score[2]}</span>
            </div>
            <span>P2</span>
        </div>
    )
}