import React, { useState, useRef } from "react"

export default function PopUp(props) {
    const { 
        player, 
        isWin, 
        winClass, 
        direction,
        resetGame,
        setResetGame
    } = props
    const [isDown, setIsDown] = useState(false)
    const arrowDown = useRef(null)
    const arrowUp = useRef(null)

    function restartGame() {
        setResetGame(!resetGame)
    }

    return (
        <div className={`popup ${!isWin ? 'leftToRight' : 'fade'}`}>
            {!isWin ? (
                <>
                    <span className="turn">Player's {player}</span>
                    <span className="turn">TURN</span>
                </>

            ) : (
                <div className="box" style={{
                    top: isDown ? "96%" : "50%",
                    transform: isDown ? "translateX(-50%)" : "translate(-50%, -50%)"
                }}>
                    <div 
                        className="arrow-wrapper" 
                        tabIndex="0"
                        style={{
                            opacity: isDown ? '1' : '0'
                        }}
                        ref={arrowUp}
                        onKeyDown={(e) => {
                            if (e.key !== 'Enter' && e.key !== 'Space') return
                            setIsDown(false)
                            arrowDown.current.focus()
                        }}
                        onClick={() => {
                            setIsDown(false)
                            arrowDown.current.focus()
                        }}
                    >
                        <div className="arrow up"/>
                    </div>
                    <div className="box-content">
                        <header>
                            <h2>Victory!</h2>
                            <span>Player's {player} wins</span>
                        </header>
                        <div className="box-rects">
                            <div className="box-rect">
                                <span>Win piece</span>
                                <span className="class">{winClass}</span>
                            </div>
                            <div className="box-rect">
                                <span>Direction</span>
                                <span className="class">{direction}</span>
                            </div>
                        </div>
                        <button 
                            className="bttn"
                            onClick={restartGame}
                        >
                            Restart
                        </button>
                    </div>
                    <div 
                        className="arrow-wrapper" 
                        tabIndex="0"
                        style={{
                            opacity: isDown ? '0' : '1'
                        }}
                        ref={arrowDown}
                        onKeyDown={(e) => {
                            if (e.key !== 'Enter' && e.key !== 'Space') return
                            setIsDown(true)
                            arrowUp.current.focus()
                        }}
                        onClick={() => {
                            setIsDown(true)
                            arrowUp.current.focus()
                        }}
                    >
                        <div className="arrow down"/>
                    </div>
                </div>
            )}
        </div>
    )
}