import React from "react"

export default function Square(props) {
    const {color, style} = props
    return (
        <>
            <svg className="square-win" style={style} viewBox="0 0 300 300" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <path d="M0,0v300h300v-300L0,0Z" fill="none"/>
            </svg>
        </>
    )
}