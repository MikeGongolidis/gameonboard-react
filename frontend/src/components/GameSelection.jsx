import React from 'react'
import { GameButton } from './GameButton.jsx'


export function GameSelection({setGame}){

    return(
        <>
            <h1 className='p-2'>Game Onboard </h1>
            <div className='flex justify-center'>
                <GameButton onClick={()=>setGame(1)} innerText='Tic-Tac-Toe'/>
                <GameButton onClick={()=>setGame(2)} innerText='Connect 4'/>
            </div>
        </>
    )
}