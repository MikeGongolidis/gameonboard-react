import React from 'react';

export function LobbyLoading(props){

    let link ='';
    if(props.type==='waiting-friend'){
        link = <input defaultValue={`${window.origin}?mtype=3&room_id=${props.roomId}&game_type=${props.gameType}`}></input>
    }

    return (
        <div className='col-span-full flex flex-col items-center justify-around'>
            <p>Loading....</p>
            <div>{link}</div>
            <button onClick={() => props.resetMenu('')}>Exit Queue</button>
        </div>
    )

}