import React from "react"
import classNames from "classnames"

export function GameButton({onClick, innerText}){

    let style = classNames("m-2 rounded-2 padding-2 bg-indigo-500 hover:bg-indigo-700 ")

    return (
        <button className={style} onClick={()=> onClick()}>
            {innerText}
        </button>
    )
}