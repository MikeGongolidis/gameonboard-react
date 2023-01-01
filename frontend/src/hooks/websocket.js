import { useEffect, useRef, useReducer, useCallback } from "react";
import {wsReducer} from '../components/wsReducer';
import {joinRoomEvent} from '../utils/websocket_events.js';


export function useWebSocketConnection(){

    const [connectionStatus, dispatch] = useReducer(wsReducer, initialState);
    const ws = useRef(null);
    
    function onOpen(){
        // Get the parameters from the URL.
        console.log("ws connection open");

        dispatch({
            type:'connection',
            payload: 'connected'
        })

        const params = new URLSearchParams(window.location.search);
        console.log(params);
        if (params.has("mtype") && params.has("room_id")) {
            // Second player joins an existing game.
            console.log('sending join request')
            joinRoomEvent.room_id = params.get("room_id");
    
            ws.current.send(JSON.stringify(joinRoomEvent));
        }
    
    }

    // Effect to place a custom listener
    const onMessage = (data) => {
        const message = JSON.parse(data); 
        console.log(`Message received in onMessage ${JSON.stringify(message)}`)
        if(message.mtype){
            dispatch({
                type: message.mtype,
                payload: message
            })
        }
    }

    function onClose(){
        dispatch({
            type:'connection',
            payload: 'disconnected'
        })
        console.log('ws connection closed');
    }


    // Effect to open the connection and place the initial open and close listeners
    useEffect( () => {

        if(ws.current !== null) return;
        console.log('trying localhost')
        const wsUri = 'ws://localhost:8080';
        ws.current = new WebSocket(wsUri);

        ws.current.onopen = () => onOpen();
        ws.current.onmessage = (e) => onMessage(e.data);
        ws.current.onclose = () => onClose();
        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };

    },[])
    return [connectionStatus, ws.current, dispatch];
}


const initialState = {
    connection: null,
    onlinePlayers: 0,
    gameStatus: null,
    currentPlayer: null,
    roomId: null,
    isInvalidRoom:false,
    result: null,
    winner: null
}