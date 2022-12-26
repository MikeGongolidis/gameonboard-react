import React from "react";
import classNames from "classnames";

export function ResultAnnouncement({winner, player, onClick}){

    let style = classNames(
        'w-96 h-32 text-center border-2 flex flex-col rounded-lg justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 border-slate-900 bg-slate-400', {
        'border-rose-700 bg-red-800	':(player===1),
        'border-sky-700 bg-sky-900':(player===2)
        })

    let innerText;

    if(winner===player){
        innerText = "Congrats! You won!";
    }else if(winner === 'draw'){
        innerText = 'Fair battle, fair draw!';
    }else if(winner === 'forfieted'){
        innerText = 'The enemy exited the game, you win!';
    }else{
        innerText = 'You lost, better luck next time!'
    }

    let sendExitGame = (winner === 'forfieted') ? false : true


    return(
        <div className={style}>
           <h4>
           {innerText}
            </h4>
            <button onClick={()=>onClick(sendExitGame)}>
            Back to main menu
            </button>
        </div>
    )

}