import React, { useState, useEffect } from "react"

import Game from "./Game"
import Menu from "./Menu"

export default function App() {
    const [gameState, setGameState] = useState('menu')
    const [formData, setFormData] = useState({
        opponent: 'player',
        zen: false,
    })
    const [resetGame, setResetGame] = useState(false)
    const [score, setScore] = useState({
        1: 0,
        2: 0,
    })

    const actualElement = (() => {
        if (gameState === 'menu') {
            return (
                <Menu 
                    setGameState={setGameState}
                    formData={formData}
                    setFormData={setFormData}
                />
            )
        } else if (gameState === 'game') {
            return (
                <Game 
                    setGameState={setGameState}
                    isZen={formData.zen}
                    resetGame={resetGame}
                    setResetGame={setResetGame}
                    key={resetGame}
                    score={score}
                    setScore={setScore}
                />
            )
        }
    })()

    return (
        <>
            {actualElement}
        </>
    )
}