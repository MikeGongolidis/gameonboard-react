import React from "react";
import classNames from "classnames"

export function BackHomeButton(){

    let style = classNames("m-2 rounded-lg p-2 bg-indigo-500 hover:bg-indigo-700 text-white text-lg")

    return (
        <div className={style} onClick={()=> console.log('clicked')}>
            <a href={'/'} className='text-white'>Back to Main Menu</a>
        </div>
    )
}