import React from "react"

export function FancyButton(props){

    const {onClick, innerText, ...style} = props

    console.log(style)

    return (
        <button className={style.style} onClick={()=> props.onClick()}>
            {props.innerText}
        </button>
    )
}