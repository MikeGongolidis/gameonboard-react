import  React, {useEffect, useState }from 'react';
import {MainMenu} from './MainMenu.jsx';
import {GameMenu} from './GameMenu.jsx';
import {BoardContainer} from './BoardContainer.jsx';
import { exitGameEvent } from './websocket_events.js';



export function MenuContainer({socket, numberPlayersOnline}){

    const [gameType, setGameType] = useState('');
    // Number of players online in the server

    // player number: 1 or 2
    const [player, setPlayer] = useState('');
    // State of the game: empty, or playing
    const [gameState, setGameState] = useState('');
    //Set the gameState to playing when we receive a start game event
    useEffect( () =>{

        const listenStartGame = (event) => {
            let message = JSON.parse(event.data);
            if(message.mtype === 4){
                console.log('In MenuContainer, received: '+ JSON.stringify(message))
                //Start game
                setPlayer(message.player);
                setGameState('playing');
                const params = new URLSearchParams(window.location.search);
                if(params.has('game_type')){
                    setGameType(parseInt(params.get('game_type')));
                }
            }
        }

        socket.addEventListener('message',listenStartGame)
        return () => socket.removeEventListener('message',listenStartGame)
    },[])



    const resetEverything = (notify) => {
        setGameState('');
        setPlayer('');
        setGameType('');
        console.log("MenuContainer: exiting game");
        if(notify){
            socket.send(JSON.stringify(exitGameEvent));
        }
    }

    // If the gameType is not decided, create the main menu 
    if(gameType===''){
        return (<MainMenu onSelect={setGameType}/>)
    } else if(gameState==='playing' ){
        return (
            <BoardContainer
                gameType={gameType} 
                onResetEverything={resetEverything} 
                player={player} 
                socket={socket}
            />
        )
    }else{
        return (
                <GameMenu 
                    onResetState={setGameType} 
                    setGameState={setGameState}
                    numberPlayersOnline={numberPlayersOnline}
                    gameType={gameType}
                    socket={socket}
                />
        )
    }



}