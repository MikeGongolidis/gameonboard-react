import React,{useState} from "react"
import classNames from "classnames"

export function GameButton({onClick, pointerEvents, innerText}){

    const [clicked,setClicked] = useState(false)

    let style = classNames("m-1 min-w-[130px] rounded-lg  py-1 px-2 bg-indigo-500 hover:bg-indigo-700 text-sm md:text-lg ",{
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