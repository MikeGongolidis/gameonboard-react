import React,{ useState, useContext} from "react";
import { range } from 'lodash';
import classNames from "classnames";

import { WsContext } from "./WsProvider";
import { GameCell } from "./GameCell";
import { ResultAnnouncement } from "./ResultAnnouncement";
import { useEffect } from "react";

export function Board({game}){
    console.log("rendering Board")
    const {connectionStatus, socket} = useContext(WsContext);
    const [gameExited,setGameExited] = useState(false);


    let gridRows =  range(0, (game === 1) ? 3:6).reverse();
    let gridColumns =  range(0, (game === 1) ? 3:7); 
    let gameTitle = (game === 1) ? 'Tic-Tac-Toe': 'Connect-4';

    //When move is received, draw the move on the board
    useEffect( () => {

        //The server notifed us that the game exited from some unknown reason
        const gameExitedFromExternalEvent = (event) => {
            const message = JSON.parse(event.data);
            if(message.mtype === 16){
                console.log(JSON.stringify(message))
                setGameExited(true);
            }
        }

        socket.addEventListener('message',gameExitedFromExternalEvent);
        return () => socket.removeEventListener('message',gameExitedFromExternalEvent);

    },[]);

    let resultAnnouncement;
    if(connectionStatus.result || gameExited){
        console.log("announcing results")
        resultAnnouncement = <ResultAnnouncement 
                                result={connectionStatus.result}
                                winner={connectionStatus.winner} 
                                player={connectionStatus.currentPlayer} 
                                gameExited={gameExited}
                            />;
    }

    var boardStyle = classNames(
        'grid gap-1',{
        'grid-cols-7 grid-rows-6': (game === 2),
        'grid-cols-3 grid-rows-3': (game === 1),
    });

    //styles
    var containerStyle = classNames(
        'flex flex-col rounded justify-center'
    );

    return (
        <>
        <div className={containerStyle}>
            <h2 className='text-center pb-5'>{gameTitle}</h2>

            <div className={boardStyle}>
            {
                gridRows.map( (row) => {

                    return gridColumns.map( (column) => {
                        return <GameCell
                                key={column+""+row}
                                column={column}
                                row={row}
                                player={connectionStatus.currentPlayer}
                                socket={socket}
                                />
                    })
                })
            }
            </div>
            <h4 className='text-center pt-5'>You are player {connectionStatus.currentPlayer}!</h4>
        </div>
        {resultAnnouncement}
        </>

    )
}