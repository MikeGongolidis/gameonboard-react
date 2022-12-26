import React from "react";
import { useState } from "react";
import classNames from "classnames";

function Demo(){

    const [btnState, setbtnState] = useState(0) 
    const [btnVisible, setbtnVisible] = useState('empty')


    const showImage = (btnState) => {

        if(btnState % 2 === 1){
            setbtnVisible('fire')
        }else if(btnState % 2 ===0){
            setbtnVisible('water')
        }
        setbtnState(btnState+1)

    }

    var btnClass = classNames(
        'w-36 h-36 rounded-full bg-slate-800 border border-transparent',{
        'hover:border-green-600': (btnVisible!='fire' && btnVisible!='water' ),
        'bg-fire-button bg-cover pointer-events-none': (btnVisible==='fire'),
        'bg-water-button bg-cover pointer-events-none': (btnVisible==='water'),
    });

    return(
        <>
            <div className="grid grid-cols-2 grid-rows-2 justify-items-center">
            <button 
                onClick={()=>showImage(btnState)}
                className={btnClass}
            ></button>
            <button 
                onClick={()=>showImage(btnState)}
                className={btnClass}
            ></button>
            <button 
                onClick={()=>showImage(btnState)}
                className={btnClass}
            ></button>
            <button 
                onClick={()=>showImage(btnState)}
                className={btnClass}
            ></button>
            </div>

            <div>{btnState}</div>
        </>

    )
}

export default Demo;