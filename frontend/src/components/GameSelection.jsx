import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';


export function GameSelection(){


    let Linkstyle = classNames("m-2 rounded-lg px-6 py-2 bg-indigo-500 hover:bg-indigo-700 text-lg text-white hover:text-black")

    return(
            <div className="border p-6 rounded-lg transition ease-in-out duration-500 hover:shadow-2xl  bg-indigo-300 hover:bg-indigo-400 hover:dark:bg-zinc-700 dark:bg-zinc-900 dark:text-white">
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
    )
}