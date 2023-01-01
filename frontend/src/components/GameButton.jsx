import React from "react"
import classNames from "classnames"

export function GameButton({onClick, pointerEvents, innerText}){

    let style = classNames("m-2 rounded-lg px-6 py-2 bg-indigo-500 hover:bg-indigo-700 text-lg ",{
        'pointer-events-none':pointerEvents
    })

    return (
        <button className={style} onClick={()=> onClick()}>
            {innerText}
        </button>
    )
}