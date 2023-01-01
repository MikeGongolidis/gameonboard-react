import React, { useState } from 'react';
import classNames from 'classnames';

import { GameSelection } from './components/GameSelection.jsx';
import { Lobby } from './components/Lobby.jsx'
import { WsProvider } from './components/WsProvider';
import { useEffect } from 'react';


function App() {

    const [game,setGame] = useState(null);


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has("room_id") && params.has("game_type")) {
            // Second player joins an existing game.
            setGame(parseInt(params.get("game_type")))
        }
    },[])

    let style = classNames("flex h-screen justify-center items-center",{})


    let body;
    if(game === 1 || game === 2){
        body = (
            <WsProvider>
                <Lobby game={game}/>
            </WsProvider>
        )
    }else{
        body = <GameSelection setGame={setGame}/>;
    }

  return (
    <div className={style}>
        <div className="transition ease-in-out delay-350 hover:shadow-2xl border p-6 rounded-lg bg-zinc-900">
        {body}
        </div>
        
    </div>
  );
}

export default App;
