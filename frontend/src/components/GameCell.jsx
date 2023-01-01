import React, { useEffect, useState } from 'react';
import { playMoveEvent } from '../utils/websocket_events.js';
import classNames from "classnames";


//TODO: responsive tailwind and different sizes based on game?
export function GameCell({column, row, player, socket}){

    console.log("rendering cells")
    const [btnVisible, setbtnVisible] = useState('empty');

    var btnClass = classNames(
        'w-28 h-28 rounded-full bg-slate-800 border-2 border-transparent transition-colors duration-700',{
        'hover:border-sky-700': (btnVisible!='fire' && btnVisible!='water' && player === 2 ),
        'hover:border-rose-700': (btnVisible!='fire' && btnVisible!='water' && player === 1 ),
        'bg-fire-button bg-cover pointer-events-none': (btnVisible==='fire'),
        'bg-water-button bg-cover pointer-events-none': (btnVisible==='water'),
    });

    //When cell is clicked, send the play move
    const sendMove = (e) => {

        playMoveEvent.player = player;
        playMoveEvent.row = e.target.getAttribute('row');
        playMoveEvent.column = e.target.getAttribute('column');
        socket.send(JSON.stringify(playMoveEvent));
        console.log('Board: sending ' + JSON.stringify(playMoveEvent))

    }

    //When move is received, draw the move on the board
    useEffect( () => {

        const drawMove = (event) => {
            const message = JSON.parse(event.data);
            if(message.mtype === 6 && message.row === row && message.column === column){
                console.log(`Cell ${row}:${column} play move received:   ${message}`);
                let inner = message.player === 1 ? 'fire' : 'water';
                setbtnVisible(inner)
            }
        }

        socket.addEventListener('message',drawMove);
        return () => socket.removeEventListener('message',drawMove);

    },[]);

    return(
        <button
            column={column}
            row={row}
            className={btnClass}
            onClick={(e) => sendMove(e)}
        >
        </button>
    )

}

