import React from "react";
import { useState, useRef } from "react";
import { useWebSocketConnection } from "../hooks/websocket.js";
import classNames from "classnames";
import { GameCell } from "./gamecelldemo.jsx";
import { WsProvider } from './WsProvider';


function Demo(){

    const [tT, settT] = useState(false);

    let body;
    if(tT){
        body = (
            <div>
            the connection is open
            <GameCell 
                column={1}
                row={1}
                player={2}
                >
            </GameCell>
        </div>
        )
    }else{
        body =''
    }

    return( 
        <WsProvider>
            <button onClick={()=>settT(true)}>Open</button>
        {body}
        </WsProvider>
    )


}

export default Demo;