import React, {useEffect, useState} from 'react';
import {inviteFriendEvent, findEnemyEvent, exitQueueEvent, destoryRoomEvent} from './websocket_events.js'
import { LobbyLoading } from './LobbyLoading.jsx';
import {FancyButton } from './FancyButton.jsx';

export function GameMenu(props){
    
    let body;
    //Based on the action, send the correct message to the server.
    const [action,setAction] = useState('');
    useEffect( () => {
        if(action==='find'){
            console.log('Sending find to game server');
            findEnemyEvent.game_type = props.gameType;
            console.log(findEnemyEvent)
            props.socket.send(JSON.stringify(findEnemyEvent))

        }else if(action==='invite'){
            console.log('Sending invite to game server');
            inviteFriendEvent.game_type = props.gameType;
            console.log(findEnemyEvent)
            props.socket.send(JSON.stringify(inviteFriendEvent))
        }

    },[action])

    // If we receive "WAIT" from server, change the body of the menu
    const [menuState,setMenuState] = useState('');
    const [roomId,setRoomId] = useState('');
    useEffect(()=>{

        const waitForGame = (event) => {
            let message = JSON.parse(event.data);
            if(message.mtype === 2){
                // If we wait for an invite link do the additional actions:
                console.log('Waiting...')
                if(message.room_id){
                    setMenuState('waiting-friend');
                    setRoomId(message.room_id)
                }else{
                    setMenuState('waiting-enemy');
                }
            }            
        }
        props.socket.addEventListener('message',waitForGame);
        return () => props.socket.removeEventListener('message',waitForGame)

    },[])

    //To be called when exiting the waiting lobby
    const resetMenu = () => {
        setMenuState('');
        setAction('');
        if(roomId){
            destoryRoomEvent.room_id = roomId;
            destoryRoomEvent.game_type = props.gameType;
            props.socket.send(JSON.stringify(destoryRoomEvent));
        }else{
            exitQueueEvent.game_type = props.gameType;
            props.socket.send(JSON.stringify(exitQueueEvent));
        }
        setRoomId('');

    }

    if(menuState ==='waiting-friend' || menuState ==='waiting-enemy'){
        body = <LobbyLoading type={menuState} roomId={roomId} gameType={props.gameType} resetMenu={resetMenu}/> ;
    }else {
        body = '';
    }





    return(
        <div className="grid grid-cols-2 gap-y-2.5">
            <FancyButton 
                style="m-2 bg-indigo-500 hover:bg-indigo-700" 
                onClick={() => setAction('invite')}
                innerText="Invite a Friend"
            />
            <FancyButton 
                style="m-2 bg-indigo-500 hover:bg-indigo-700"
                onClick={() => setAction('find')} 
                innerText="Find Game"
            />
            {body}
            <div className='col-span-full text-center'>Players Online: {props.numberPlayersOnline}</div>
            <FancyButton 
                style="m-2 bg-indigo-500 hover:bg-indigo-700 col-span-full"
                onClick={ ()=> {
                    setAction('');
                    props.onResetState('');
                    }
                }
                innerText="Back to Main Menu"
            />
        </div>
    )
}