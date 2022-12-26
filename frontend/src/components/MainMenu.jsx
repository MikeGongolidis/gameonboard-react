import React from 'react'
import { FancyButton } from './FancyButton.jsx'


export function MainMenu(props){

    return(
        <div className="transition ease-in-out delay-350 hover:shadow-2xl border p-6 rounded-lg bg-zinc-900">
            <h1 className='p-2'>Game Onboard </h1>
            <div className='flex justify-center'>
                <FancyButton style="m-2 bg-indigo-500 hover:bg-indigo-700 " onClick={()=>props.onSelect(1)} innerText="Tic-Tac-Toe"/>
                <FancyButton style="m-2 bg-indigo-500 hover:bg-indigo-700 " onClick={()=>props.onSelect(2)} innerText="Connect4"/>
            </div>
        </div>
    )
}