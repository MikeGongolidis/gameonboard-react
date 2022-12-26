import React, { useState, useEffect } from 'react';
import {MenuContainer} from './components/MenuContainer.jsx'
//import { webSocketConnection } from './components/websocket_handlers.js';
import {joinRoomEvent} from './components/websocket_events.js';
import {parseOpenArgs} from './components/websocket_handlers.js'


//TODO: Inform user when connection is closed
let socket = new WebSocket('ws://localhost:8080');
socket.onopen = function(){
    console.log('Opened connection!');
    parseOpenArgs(socket, joinRoomEvent);
}

function App() {

  const [invalidRoomRequest, setInvalidRoomRequest] = useState(false);

  // const [websocketStatus, setWebSocketStatus] = useState(false);
  // const socket = webSocketConnection();

  useEffect( () =>{

      const ListenInvalidRoom = (event) => {
        const message = JSON.parse(event.data);
        if(message.mtype === 14){
            console.log(`App: received Invalid Room`);
            setInvalidRoomRequest(true);
        }
      }

    socket.addEventListener('message',ListenInvalidRoom);
    return () => socket.removeEventListener('message',ListenInvalidRoom);
  },[])

  const [numberPlayersOnline, setNumberPlayersOnline] = useState(0);
  useEffect( () =>{
      // listen for number of players in the server
      const listenForNumPlayers = (event) => {
          let message = JSON.parse(event.data);
          if(message.mtype === 10){
            console.log("App:"+message)
            // Change the online players state
            setNumberPlayersOnline(message.num_clients);
          }
      }
      // Add the event listener and remove it upon destroy
      socket.addEventListener('message',listenForNumPlayers);
      return () => socket.removeEventListener('message',listenForNumPlayers)

  },[])


  if(invalidRoomRequest){
    return(
      <>
      <div>
        The room you requested to join is invalid! 
      </div>
      <button onClick={() => setInvalidRoomRequest(false)}>
        Back to main menu
      </button>
      </>
    )
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <MenuContainer 
        socket={socket}
        numberPlayersOnline={numberPlayersOnline}
      />
    </div>
  );
}

export default App;
