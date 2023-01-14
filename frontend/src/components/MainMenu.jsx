import React,{useContext} from "react";
import classNames from "classnames";
import { WsContext } from './WsProvider.jsx';
import { GameButton } from "./GameButton.jsx";
import {BackHomeButton} from "./BackHomeButton"
import { WaitingBox } from "./WaitingBox.jsx";
import {inviteFriendEvent, findEnemyEvent} from '../utils/websocket_events.js'


export function MainMenu({game}){

    const {connectionStatus, socket} = useContext(WsContext);

    const containerStyle = classNames("",{
        "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-y-2.5 justify-center items-center border p-6 rounded-lg bg-indigo-300 hover:bg-indigo-400 hover:dark:bg-zinc-700 dark:bg-zinc-900 dark:text-white hover:shadow-2xl transition ease-in-out duration-500" : connectionStatus.gameStatus !== 'playing',
        "hidden": connectionStatus.gameStatus === 'playing'
    })

    const sendAction = (actionType) => {
        console.log('Sending find to game server');

        if(actionType==='find'){
            findEnemyEvent.game_type = game;
            console.log(JSON.stringify(findEnemyEvent));
            console.log(socket)
            socket.send(JSON.stringify(findEnemyEvent));

        }else if(actionType==='invite'){
            inviteFriendEvent.game_type = game;
            socket.send(JSON.stringify(inviteFriendEvent))
        }
    }

    let body;
    if(connectionStatus.gameStatus === 'waiting'){
        body = <WaitingBox 
                    roomId={connectionStatus.roomId} 
                    game={game}/> ;
    }else{
        body = <div className='col-span-full py-2 text-center text-lg '>Players online: {connectionStatus.onlinePlayers}</div>

    }

    return(
        <div className={containerStyle}>
            <div className='col-span-full text-center' ><h2>{game===1 ? "Tic-Tac-Toe":"Connect 4"}</h2></div>

            <GameButton 
                onClick={() => sendAction('invite')}
                pointerEvents={(connectionStatus.gameStatus === 'waiting')}
                innerText='Invite a Friend'
            />
            <GameButton 
                onClick={() => sendAction('find')} 
                pointerEvents={connectionStatus.gameStatus === 'waiting'}
                innerText='Find game'
            />

            {body}
            <div className='col-span-full text-center' ><BackHomeButton/></div>
            
    </div>
    )

}