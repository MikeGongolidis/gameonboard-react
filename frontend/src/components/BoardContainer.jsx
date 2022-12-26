import React, { useEffect,useState } from 'react';
import { Board } from './Board.jsx';
import { ResultAnnouncement } from './ResultAnnouncement.jsx';
import classNames from "classnames";

export function BoardContainer({ gameType, onResetEverything, player, socket}){

    //Based on gameType, initialize the gameBoard
    let gameBoard;
    let gameTitle;
    if(gameType===1){
        gameTitle = 'Tic-Tac-Toe';
        gameBoard = <Board player={player} socket={socket} columns={3} rows={3}/>;
    }else if(gameType===2){
        gameTitle = 'Connect-4';
        gameBoard = <Board player={player} socket={socket} columns={7} rows={6}/>
    }


    //When winner or draw announcement is received, finalize the game
    const [winner, setWinner] = useState('');
    useEffect( () => {

        const listenForResult = (event) => {
            let message = JSON.parse(event.data);
            //Check for Winner
            if(message.mtype === 9){
                console.log("Board - winner:"+message);
                //set winner state to the winner
                setWinner(message.player);
            }
            //Check for Draw
            if(message.mtype === 13){
                console.log("Board - draw:"+message);
                // Set the winner state to draw
                setWinner('draw');
            }

            if(message.mtype === 16){
                console.log("Board: game exited from another side");
                setWinner('forfieted')
            }
        }
        // Add the event listener and remove it upon destroy
        socket.addEventListener('message',listenForResult);
        return () => socket.removeEventListener('message',listenForResult)
    },[])

    let resultAnnouncement;
    if(winner){
        resultAnnouncement = <ResultAnnouncement winner={winner} player={player} onClick={onResetEverything}/>;
    }


    //styles
    var className = classNames(
        'flex flex-col rounded justify-center'
    );

    return(
        <>
        <div className={className}>
            <h2 className='text-center pb-5'>{gameTitle}</h2>
            {gameBoard}
            <h4 className='text-center pt-5'>You are player {player}!</h4>
        </div>
        <div>
            {resultAnnouncement}
        </div>
        </>
    )

}