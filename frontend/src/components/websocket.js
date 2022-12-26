import { useEffect, useRef } from "react";
import {joinRoomEvent} from './websocket_events.js';



export function webSocketConnection(){

    const ws = useRef(null);

    function onOpen(){
        // Get the parameters from the URL.
        console.log("ws connection open");
        //setWebsocketStatus(true);
        const params = new URLSearchParams(window.location.search);
        console.log(params);
        if (params.has("mtype") && params.has("room_id")) {
            // Second player joins an existing game.
            console.log('sending join request')
            joinRoomEvent.room_id = params.get("room_id");
    
            ws.send(JSON.stringify(joinRoomEvent));
        }
    
    }

    function onClose(){
        //setWebsocketStatus(false);
        console.log('ws connection closed');
    }


    useEffect( () => {

        if(ws.current !== null) return;

        const wsUri = 'ws://localhost:8080';
        ws.current = new WebSocket(wsUri);

        ws.current.onopen = () => onOpen();
        ws.current.onclose = () => onClose();
        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };

    },[])

    return ws.current;
}