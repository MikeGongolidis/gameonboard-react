import React,{useState} from "react"
import classNames from "classnames"

export function GameButton({onClick, pointerEvents, innerText}){

    const [clicked,setClicked] = useState(false)

    let style = classNames("m-2 rounded-lg px-6 py-2 bg-indigo-500 hover:bg-indigo-700 text-lg ",{
        'pointer-events-none':pointerEvents,
        'animate-wiggle': clicked
    })

    return (
        <button className={style} 
                onClick={()=> {
                                setClicked(true)
                                onClick()
                            }}
                onAnimationEnd={ () => setClicked(false)}
            >
            {innerText}
        </button>
    )
}