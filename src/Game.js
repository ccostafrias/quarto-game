import React, { useState, useEffect } from "react"

import Table from "./Table"
import PopUp from "./PopUp"
import Progress from "./Progress"
import Score from "./Score.js"

export default function Game(props) {
    const {
        isZen,
        resetGame,
        setResetGame,
        score,
        setScore,
        setGameState
    } = props

    const classifications = {
        size: ['small', 'large'], 
        texture: ['flat', 'pierced'], 
        shape: ['circle', 'square'], 
        color: ['dark', 'light']
    }

    const secondsBar = {
        place: 30000,
        choose: 15000
    }

    const [win, setWin] = useState({
        isWin: false,
        style: {
            width: '0',
            height: '0',
            top: '0',
            left: '0'
        }
    })
    
    const [pieces, setPieces] = useState(
        shuffle(generateCombinations(classifications))
            .map((piece, id) => (
                {
                    id: id,
                    isChoosen: false,
                    class: piece
                }
            ))
    )

    const [squares, setSquares] = useState(
        Array(4**2).fill()
            .map((_, id) => {
                const x = id % 4
                const y = Math.floor(id/4)
                return (
                    {
                        coords: [x, y],
                        id: id,
                        isHover: false
                    }
                )
            })
            )
            
    const [stage, setStage] = useState(
        {
            stage: 'choose',
            player: 1
        }
    )

    useEffect(() => {
        const communClass = (arr) => arr.reduce((p, c) => p.filter(e => c.includes(e)))
        const columnToRow = (arr) => arr.map((r, j) => r.map((c, i) => arr[i][j]))
        
        const gap = 5
        
        const matrix = Array.from(Array(4)).map((r, ri) => Array.from(Array(4)).map((c, i) => squares[ri*4+i]))

        const fullColumns = columnToRow(matrix).map((fc, i) => ({column: i, isWin: fc})).filter(fc => fc.isWin.every(e => e.placed))
        const hasCommunColumns = fullColumns.map(fc => ({column: fc.column, isWin: communClass(fc.isWin.map(c => Object.values(c.placed))).join(' ')})).find(r => r.isWin)

        const fullRows = matrix.map((fr, i) => ({row: i, isWin: fr})).filter(fr => fr.isWin.every(e => e.placed))
        const hasCommunRows = fullRows.map((fr, i) => ({row: fr.row, isWin: communClass(fr.isWin.map(r => Object.values(r.placed))).join(' ')})).find(c => c.isWin)

        const firstDiagonal = Array.from(Array(4)).map((d, i) => squares[5*i])
        const secondDiagonal = Array.from(Array(4)).map((d, i) => squares[3*i+3])
        const diagonals = [firstDiagonal, secondDiagonal]
        
        const fullDiagonals = diagonals.map((fd, i) => ({diagonal: i, isWin: fd})).filter(fd => fd.isWin.every(e => e.placed))
        const hasCommunDiagonals = fullDiagonals.map((fd, i) => ({diagonal: fd.diagonal, isWin: communClass(fd.isWin.map(d => Object.values(d.placed))).join(' ')})).find(c => c.isWin)

        const rects = Array.from(Array(3**2)).map((s, si) => Array.from(Array(4)).map((e, ei) => squares[si % 3 + Math.floor(si / 3) * 4 + ei % 2 + Math.floor(ei / 2) * 4]))
        const fullRects = rects.map((fr, i) => ({rect: i, isWin: fr})).filter(fr => fr.isWin.every(e => e.placed))
        const hasCommunRects = fullRects.map((fr, i) => ({rect: fr.rect, isWin: communClass(fr.isWin.map(r => Object.values(r.placed))).join(' ')})).find(c => c.isWin)

        if (hasCommunColumns) {
            const {column, isWin} = hasCommunColumns
            setWin(prevWin => {
                return {
                    isWin: true,
                    winClass: isWin,
                    direction: 'column',
                    style: {
                        width: '20px',
                        height: '105%',
                        top: '-2.5%',
                        left: `calc((100% - 3px * ${gap}) / 4 * ${column} + (100% - 3px * ${gap}) / 8 + ${column} * ${gap}px)`,
                        transform: 'translateX(-50%)',
                        transition: 'height .4s ease'
                    }
                }
            })
        }

        else if (hasCommunRows) {
            const {row, isWin} = hasCommunRows
            setWin(prevWin => {
                return {
                    isWin: true,
                    winClass: isWin,
                    direction: 'row',
                    style: {
                        height: '20px',
                        width: '105%',
                        top: `calc((100% - 3px * ${gap}) / 4 * ${row} + (100% - 3px * ${gap}) / 8 + ${row} * ${gap}px)`,
                        left: '-2.5%',
                        transform: 'translateY(-50%)',
                        transition: 'width .4s ease'
                    }
                }
            })
        }

        else if (hasCommunDiagonals) {
            const {diagonal, isWin} = hasCommunDiagonals
            setWin(prevWin => {
                return {
                    isWin: true,
                    winClass: isWin,
                    direction: 'diagonal',
                    style: {
                        width: '20px',
                        height: '141%',
                        top: `0px`,
                        left: diagonal === 0 ? '0px' : '100%',
                        transform: diagonal === 0 ? 'translateX(-50%) rotate(315deg)' : 'translateX(-50%) rotate(45deg)',
                        transformOrigin: 'top',
                        transition: 'height .4s ease'
                    }
                }
            })
        }

        else if (hasCommunRects) {
            const {rect, isWin} = hasCommunRects
            const left = rect % 3 
            const top = Math.floor(rect / 3)

            setWin(prevWin => {
                return {
                    isWin: true,
                    winClass: isWin,
                    direction: 'square',
                    style: {
                        width: `calc((100% - 3px * ${gap}) / 4 + ${gap}px)`,
                        height: `calc((100% - 3px * ${gap}) / 4 + ${gap}px)`,
                        top: `calc((100% - 3px * ${gap}) / 4 * ${top} + (100% - 3px * ${gap}) / 8 + ${top} * ${gap}px)`,
                        left: `calc((100% - 3px * ${gap}) / 4 * ${left} + (100% - 3px * ${gap}) / 8 + ${left} * ${gap}px)`,
                        animation: 'square .4s ease 0s both',
                    }
                }
            })
        }

        else return

        setScore(prevScore => {
            return {
                ...prevScore,
                [stage.player]: prevScore[stage.player] + 1
            }
        })

                
    }, [squares, stage])
        
    const pieceChoosen = pieces.find(piece => piece.isChoosen)
    const random = (max) => Math.floor(Math.random() * max)

    function generateCombinations(obj) {
        const keys = Object.keys(obj)
        const combinations = []
        
        function backtrack(index, currentCombination) {
            if (index === keys.length) {
                combinations.push({...currentCombination})
                return
            }
            
            const key = keys[index]
            const values = obj[key]
            
            for (const value of values) {
                currentCombination[key] = value
                backtrack(index + 1, currentCombination)
            }
        }
        
        backtrack(0, {})
        return combinations
    }

    function shuffle(arr) {
        return arr
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    function changeStage(auto = false) {
        const tie = pieces.every(piece => piece.isPlaced)

        setStage(prevStage => {
            const isChoose = prevStage.stage === 'choose'
            const isPlayerOne = prevStage.player === 1

            return (
                {
                    player: isChoose ? (
                        isPlayerOne ? 2 : 1
                    ) : prevStage.player,
                    stage: isChoose ? 'place' : 'choose',
                }
            )
        })

        if (auto && !tie) {
            const isChoose = stage.stage === 'choose'
            let randomId = random(pieces.length)
            

            if (isChoose) {
                do {
                    randomId = random(pieces.length)
                } while (pieces.find(piece => piece.id === randomId).isPlaced)
            
                choosePiece(randomId)
            } else {
                do {
                    randomId = random(pieces.length)
                } while (squares.find(square => square.id === randomId).placed)

                putPiece(randomId, pieces.find(piece => piece.isChoosen).class)
            }
        }
    }

    function choosePiece(id) {
        if (!pieceChoosen) {
            setPieces(prevPieces => {
                return prevPieces.map(piece => {
                    return (
                        piece.id === id ? (
                            {
                                ...piece,
                                isChoosen: true
                            }
                        ) : {...piece}
                    )
                })
            })
        }
    }

    function hoverSquare(id, state) {
        if (pieceChoosen) {   
            setSquares(prevSquares => {
                return (
                    squares.map(square => {
                        return (
                            square.id === id ? (
                                {
                                    ...square,
                                    isHover: state
                                }
                            ) : (
                                {
                                    ...square,
                                    isHover: false
                                }
                            )
                        )
                    })
                )
            })
        }
    }

    function putPiece(id, classes) {
        setSquares(prevSquares => {
            return (
                squares.map(square => {
                    return (
                        square.id === id ? (
                            {
                                ...square,
                                isHover: false,
                                placed: {...classes},
                            }
                            ) : {...square}
                            )
                        })
            )
        })

        const coords = squares.find(square => square.id === id).coords

        setPieces(prevPieces => {
            return prevPieces.map(piece => {
                return (
                    piece.isChoosen ? (
                        {
                            ...piece,
                            isChoosen: false,
                            isPlaced: true,
                            coords
                        }
                    ) : {...piece}
                )
            })
        })
    }

    const showPopUp = stage.stage === 'place' || win.isWin

    return (
        <>
            {showPopUp && (
                <PopUp 
                    isWin={win.isWin}
                    player={stage.player}
                    winClass={win.winClass}
                    direction={win.direction}
                    resetGame={resetGame}
                    setResetGame={setResetGame}
                    setGameState={setGameState}
                />
            )}
            <Score 
                score={score}
                player={stage.player}
            />

            <Table 
                pieces={pieces}
                squares={squares}
                win={win}
                choosePiece={choosePiece}
                hoverSquare={hoverSquare}
                changeStage={changeStage}
                putPiece={putPiece}
                score={score}
            />

            <Progress
                secondsBar={secondsBar}
                stage={stage}
                isWin={win.isWin}
                changeStage={changeStage}
                isZen={isZen}
            />
        </>
    )
}