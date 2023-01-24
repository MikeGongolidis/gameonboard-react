import { useEffect, useRef, useReducer } from "react";
import {wsReducer} from '../components/wsReducer';
import {joinRoomEvent} from '../utils/websocket_events.js';


// const URL = 'ws://52.59.191.206:8765'
// const URLocal = 'ws://localhost:8080'

export function useWebSocketConnection(){

    const [connectionStatus, dispatch] = useReducer(wsReducer, initialState);
    const ws = useRef(null);

    const getUrl = () => {
        if(window.location.hostname === 'localhost'){
            return 'ws://localhost:8080'
        }else{
            return 'ws://52.59.191.206:8765/ws'
        }
    }
    
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
        //const wsUri = 'ws://localhost:8080';
        ws.current = new WebSocket(getUrl());

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