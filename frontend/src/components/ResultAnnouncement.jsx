import React from "react";
import classNames from "classnames";
import { BackHomeButton } from "./BackHomeButton";

export function ResultAnnouncement({result, winner, player, gameExited}){

    let style = classNames(
        'w-96 h-32 text-center border-2 flex flex-col rounded-lg justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border-slate-900 bg-slate-400', {
        'border-amber-700 bg-amber-500	':(player===winner),
        'border-red-800 bg-red-600':(player!==winner && result !== 13 && !gameExited),
        'border-green-800 bg-green-500':(parseInt(result) === 13),
        })

    let innerText;

    if(winner===player){
        innerText = "Congrats! You won!";
    }else if(result === 13){
        innerText = 'Fair battle, fair draw!';
    }else if(player!==winner && parseInt(result) !== 13){
        innerText = 'You lost, better luck next time!'
    }else{
        innerText = 'Something wrong happened...!';
    }

    if(gameExited){
        innerText = 'Enemy disconnected, you win this one!'
    }

    return(
        <div className={style}>
            <h4>
            {innerText}
            </h4>
            <BackHomeButton/>

        </div>
    )

}