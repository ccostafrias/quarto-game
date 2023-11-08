import React, {useEffect, useState} from "react"

import Bar from "./Bar"

export default function Progress(props) {
    const {
        secondsBar, 
        isWin, 
        stage, 
        changeStage,
        isZen,
    } = props

    return (
        <footer className="progress-wrapper">
            {/* <span className="turn-bar">Player's {stage.player} Turn</span> */}
            <span className="stage">
                {stage.stage}
            </span>
            {!isZen && (
                <div className="progress">
                    <Bar 
                        target={secondsBar.place}
                        stage={stage.stage}
                        isWin={isWin}
                        type="place"
                        changeStage={changeStage}
                    />
                    <Bar 
                        target={secondsBar.choose}
                        stage={stage.stage}
                        isWin={isWin}
                        type="choose"
                        changeStage={changeStage}
                    />
                </div>
            )}
        </footer>
    )
}