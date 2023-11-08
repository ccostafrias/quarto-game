import React, { useRef } from "react"

import Square from "./Square"

export default function Table(props) {
    const {
        pieces, 
        squares, 
        choosePiece, 
        hoverSquare,
        putPiece, 
        changeStage, 
        win,
    } = props
    const pieceChoosen = pieces.find(piece => piece.isChoosen)
    const getClass = (classes) => Object.values(classes).concat('piece').join(' ')

    function setTabIndex(turn) {
        if (win.isWin) return -1
        if (turn) return pieceChoosen ? '0' : '-1'
        return pieceChoosen ? '-1' : '0'

    }

    const tableElements = squares.map(square => {
        return (
            <div 
                className="square"
                onMouseOver={() => hoverSquare(square.id, true)}
                onMouseOut={() => hoverSquare(square.id, false)}
                onFocus={() => hoverSquare(square.id, true)}
                onBlur={() => hoverSquare(square.id, false)}
                onClick={() => {
                    if (!pieceChoosen) return
                    if (square.placed) return
                    putPiece(square.id, pieceChoosen.class)
                    changeStage()
                }}
                onKeyDown={(e) => {
                    if (e.key !== 'Enter' && e.key !== 'Space') return
                    if (!pieceChoosen) return
                    if (square.placed) return
                    e.target.blur()
                    putPiece(square.id, pieceChoosen.class)
                    changeStage()
                }}
                tabIndex={setTabIndex(true)}
            >
                {square.placed ? (
                    <div 
                        className={getClass(square.placed)+' '+'placed'}
                    />
                ) : (
                    square.isHover && pieceChoosen && !pieceChoosen.isPlaced && (
                        <div 
                            className={getClass(pieceChoosen.class)}
                            style={{
                                opacity: '.5'
                            }}
                        />
                    )
                )}
            </div>
        )
    })
    
    const pieceElements = pieces.map(piece => {
        const style = piece.isChoosen ? {opacity: '.4'} : null
        return (
            <>
                <div 
                    className="side-square"
                    onClick={() => {
                        if (piece.isChoosen || piece.isPlaced) return
                        choosePiece(piece.id)
                        if (!pieceChoosen) changeStage()
                    }}
                    onKeyDown={(e) => {
                        if (e.key !== 'Enter' && e.key !== 'Space') return
                        if (piece.isChoosen || piece.isPlaced) return
                        e.target.blur()
                        choosePiece(piece.id)
                        if (!pieceChoosen) changeStage()
                    }}
                    tabIndex={setTabIndex(false)}
                >
                    {!piece.isPlaced && (
                        <div 
                            className={getClass(piece.class)}
                            style={style}
                        />
                    )}
                </div>
            </>
        )
    })

    const leftSideTableElements = pieceElements.filter((piece, i) => i < pieceElements.length / 2)
    const rightSideTableElements = pieceElements.filter((piece, i) => i >= pieceElements.length / 2)

    return (
        <>
            <main className="main-game">
                <div className={`side-table ${pieceChoosen ? 'blocked' : ''}`}>
                    {leftSideTableElements}
                </div>
                <div className="table">
                    {win.direction !== 'square' ? (
                        <div className="table-win" style={win.style}/>
                    ) : (
                        <Square 
                            style={win.style}
                        />
                    )}
                    {tableElements}
                </div>
                <div className={`side-table ${pieceChoosen ? 'blocked' : ''}`}>
                    {rightSideTableElements}
                </div>
            </main>
        </>
    )
}