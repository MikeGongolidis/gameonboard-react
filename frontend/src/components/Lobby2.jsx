import React,{useContext} from "react";
import { WsContext } from './WsProvider.jsx';
import { Board } from "./Board.jsx";
import { MainMenu } from "./MainMenu.jsx";

export function Lobby2({game}){

    const {connectionStatus, _} = useContext(WsContext);
    let body;
    if(connectionStatus.connection === 'disconnected'){
        body = <h3>"Connection to the server was dropped"</h3>
    }else{
        body = (<>
                    <Board game={game}/>
                    <MainMenu game={game}/>
            </>)
    }

    return(
        body
    )

}