import React from 'react';
import classNames from 'classnames';

export function WaitingBox({roomId, game}){

    let link ='';
    if(roomId){
        link = <input defaultValue={`${window.origin}?mtype=3&room_id=${roomId}&game_type=${game}`}></input>
    }

    let style = classNames('col-span-full flex flex-col items-center justify-around')

    return (
        <div className={style}>
            <p>Loading....</p>
            <div>{link}</div>
            <button onClick={() => props.resetMenu('')}>Exit Queue</button>
        </div>
    )

}