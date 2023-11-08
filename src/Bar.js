import { useEffect, useState, useRef } from 'react'

export const useIsMount = () => {
    const isMountRef = useRef(true)
    useEffect(() => {
      isMountRef.current = false
    }, [])
    return isMountRef.current
}

export default function Bar(props) {
    const { 
        target, 
        stage, 
        type, 
        changeStage, 
        isWin
    } = props
    const [countDown, setCountDown] = useState(target)
    const isMount = useIsMount()
    const step = 500

    useEffect(() => {
        if (stage === type && !isWin) {
            const interval = setTimeout(() => {
                if (countDown > 0) {
                    setCountDown(prevCountdown => prevCountdown - step)
                }
                else {
                    changeStage(true)
                    clearTimeout(interval)
                }
            }, step)
    
            return () => clearTimeout(interval)
        }
    }, [countDown, stage])

    useEffect(() => {
        setCountDown(target)
    }, [stage])

    const percentage =  (target - countDown) * 100 / target

    const style = (() => {
        if (type === 'place' && isMount) {
            return ({
                backgroundColor: '#4e709f',
                width: '0',
            })
        }
        if (stage === type) {
            return ({
                position: 'absolute',
                transform: 'translateX(0)',
                width: !isWin ? `${percentage}%` : '0',
                transition: 'width .5s linear, background 5s ease',
                backgroundColor: countDown < 5000 ? '#5c0344' : '#4e709f'
            })
        } else {
            if (percentage) {
                document.documentElement.style.setProperty('--width-bar', `${percentage}%`)
            }
            return ({
                animationName: 'fillBar',
                animationDuration: '1.2s',
                animationTimingFunction: 'ease',
                animationFillMode: 'forwards',
                backgroundColor: '#4e709f',
                transition: 'background .2s ease'
            })
        }

    })()

    return (
        <div className='bar'>
            <div className='bar-fill' style={style}></div>
        </div>
    )
}