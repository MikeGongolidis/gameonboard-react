import React,{useContext} from "react";
import { WsContext } from './WsProvider.jsx';
import { Board } from "./Board.jsx";
import { MainMenu } from "./MainMenu.jsx";

export function Lobby({game}){

    const {connectionStatus, _} = useContext(WsContext);
    console.log("Render Lobby")
    let body;
    if(connectionStatus.connection === 'connected' && connectionStatus.gameStatus === 'playing'){
        body = <Board game={game}/>
    }else if(connectionStatus.connection === 'disconnected'){
        body = <h3>"Connection to the server was dropped"</h3>
    
    }else{
        body = <MainMenu game={game}/>
    }

    return(
        body
    )

}