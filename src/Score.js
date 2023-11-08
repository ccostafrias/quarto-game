import React from 'react'

export default function Score(props) {
    const { 
        score,
        player,
    } = props

    const playerTurn = ps => {
        console.log(player)
        if (player === ps) return 'player-turn'
        return ''
    }

    return (
        <header className='score-wrapper'>
            <div className={`score-player ${playerTurn(1)}`}>
                <span className='player-abbr'>P1</span>
                <span className='player'>Player 1</span>
                <span className='score'>{score[1]}</span>
            </div>
            <div className={`score-player ${playerTurn(2)}`}>
                <span className='player-abbr'>P2</span>
                <span className='player'>Player 2</span>
                <span className='score'>{score[2]}</span>
            </div>
        </header>
    )
}