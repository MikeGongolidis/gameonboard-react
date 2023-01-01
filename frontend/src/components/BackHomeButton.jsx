import React,{useState} from "react";
import classNames from "classnames"

export function BackHomeButton(){

    const [clicked,setClicked] = useState(false)

    let style = classNames("w-full rounded-lg py-2 bg-indigo-500 hover:bg-indigo-700 text-white text-lg hover:cursor-pointer",{
        'animate-wiggle': clicked
    })


    return (
        <div 
            className={style} 
            onClick={()=> {
                setClicked(true)
                window.location.href = "http://localhost:5173";

            }}
            onAnimationEnd={()=> setClicked(false)}>
            Back to Main Menu
        </div>
    )
}