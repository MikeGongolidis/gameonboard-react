import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


export function GameSelection2(){


    let Linkstyle = classNames("m-2 rounded-lg px-6 py-2 bg-indigo-500 hover:bg-indigo-700 text-lg text-white hover:text-black hover:font-semibold")

    return(
        <div className="flex h-screen justify-center items-center">
            <div className="transition ease-in-out delay-350 hover:shadow-2xl border p-6 rounded-lg bg-zinc-900">
                <h1 className='p-2'>Game Onboard </h1>
                <div className='flex justify-center'>
                    <Link 
                        to={`tictactoe`} 
                        className={Linkstyle} 
                        >TicTacToe
                    </Link>
                    <Link 
                        to={`connect4`}
                        className={Linkstyle} 
                        >Connect4
                    </Link>
                </div>
            </div> 
        </div>
    )
}