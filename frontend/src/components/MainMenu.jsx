import React,{useContext} from "react";
import { WsContext } from './WsProvider.jsx';
import { GameButton } from "./GameButton.jsx";
import { WaitingBox } from "./WaitingBox.jsx";
import {inviteFriendEvent, findEnemyEvent, exitQueueEvent, destoryRoomEvent} from '../utils/websocket_events.js'


export function MainMenu({game}){

    const {connectionStatus, socket} = useContext(WsContext);

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
        body = <WaitingBox roomId={connectionStatus.roomId} game={game}/> ;
    }

    return(
        <div className="grid grid-cols-2 gap-y-2.5">
            <GameButton 
                onClick={() => sendAction('invite')}
                innerText='Invite a Friend'
            />
            <GameButton 
                onClick={() => sendAction('find')} 
                innerText='Find game'
            />
            {body}
            <div className='col-span-full text-center'>Players Online: {connectionStatus.onlinePlayers}</div>
            <GameButton 
                onClick={ ()=> {
                    // redirect to main menu;
                    }
                }
                innerText='Back to Main Menu'
            />
    </div>
    )

}