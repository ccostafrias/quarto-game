import React, {useState} from "react"

import { AiFillInfoCircle } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"
import { FaRobot } from "react-icons/fa"

import {ReactComponent as Logo} from './images/logo.svg'
import {ReactComponent as GitHub} from './images/github.svg'

export default function Menu(props) {
    const {
        setGameState,
        formData,
        setFormData,
    } = props

    const [infoVisible, setInfoVisible] = useState(false)
    const [howToPlay, setHowToPlay] = useState(false)

    const handleChange = (event) => {
        const { name, value, checked, type } = event.target || event

        setFormData((prevFormData) => (
            { 
                ...prevFormData, 
                [name]: type === 'checkbox' ? checked : value 
            }
        ))
    }
  
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    function keyDown(e) {
        if (e.key !== 'Enter') return
        const label = e.target
        const name = label.dataset.inputName
        const value = label.htmlFor
        
        const newData = {
            name,
            value: value === 'zen' ? !formData.zen : value
        }

        console.log(newData)
        
        handleChange(newData)
        
    }

    function showInfo() {
        setInfoVisible(prevInfoVisible => !prevInfoVisible)
    }

    return (
        <>
            {howToPlay && (
                <div className="how2play-popup"></div>
            )}
            <main className="main-menu">
                <header className="header-menu">
                    <Logo className="logo-svg"/>
                    {/* <h2>Can you run through all mazes?</h2> */}
                </header>
                <section className="section-menu">
                    <form onSubmit={handleSubmit}>
                        <div className="option-wrapper">
                            <h3>Opponent</h3>
                                <div className="bttns-wrapper">
                                    <input
                                        type="radio"
                                        className="radio-input"
                                        name="opponent"
                                        id="player"
                                        value="player"
                                        checked={formData.opponent === 'player'}
                                        onChange={handleChange}
                                    />
                                    <input
                                        type="radio"
                                        className="radio-input"
                                        name="opponent"
                                        id="ai"
                                        value="ai"
                                        disabled
                                        checked={formData.opponent === 'ai'}
                                        onChange={handleChange}
                                    />
                                    <label className={`bttn label ${formData.opponent === 'player' ? 'active' : ''}`} onKeyUp={keyDown} tabIndex="0" data-input-name="opponent" htmlFor="player">
                                        <BsFillPersonFill className="svg-label"/>
                                        x
                                        <BsFillPersonFill className="svg-label"/>
                                    </label>
                                    <label className={`bttn label blocked ${formData.opponent === 'ai' ? 'active' : ''}`} onKeyUp={keyDown} tabIndex="1" data-input-name="opponent" htmlFor="ai">
                                        <BsFillPersonFill className="svg-label"/>
                                        x
                                        <FaRobot className="svg-label"/>
                                    </label>
                                </div>
                        </div>
                        <div className="option-wrapper">
                            <h3>Zen Mode</h3>
                            <div className="switch-wrapper">
                                <input
                                    type="checkbox"
                                    className="zen-checkbox"
                                    name="zen"
                                    id="zen"
                                    checked={formData.zen}
                                    onChange={handleChange}
                                />
                                <label className="switch switch-label" onKeyDown={keyDown} tabIndex="0" data-input-name="zen" htmlFor="zen">
                                    <div className={`switch-ball ${formData.zen ? 'active' : ''}`} />
                                </label>
                                <div className="info-wrapper">
                                    <AiFillInfoCircle
                                        className="info"
                                        onClick={showInfo}
                                    />
                                    <div className="info-container" style={{
                                        opacity: infoVisible ? '1' : '0',
                                    }}>
                                        <span>Toogle timer <strong>on</strong> or <strong>off.</strong></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <button
                        className="bttn bttn-plus"
                        onClick={() => setGameState('game')}
                    >
                        Start game
                    </button>
                </section>
                <footer className="footer">
                    <a href="https://github.com/ccostafrias" target="_blank">
                        <GitHub className="svg-footer"/>
                    </a>
                    <div
                        tabIndex='0'
                        onClick={() => setHowToPlay(prevHowToPlay => !prevHowToPlay)}
                        className="h2p-icon"
                    >
                        <AiFillInfoCircle 
                            className="svg-footer"
                        />
                    </div>
                </footer>
            </main>
        </>
    )
}