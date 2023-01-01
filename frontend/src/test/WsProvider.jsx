
import { createContext } from 'react';
import { useWebSocketConnection } from '../hooks/websocket';

export const WsContext = createContext(null);

export function WsProvider({children}){

    const [connectionStatus, socket] = useWebSocketConnection();

    let disconnected;
    if(!connectionStatus){
        disconnected = "Connection to the server was dropped";
    }

    return(
        <>
            <WsContext.Provider value={{connectionStatus: connectionStatus, socket : socket}}>
                {children}
            </WsContext.Provider>
            <div>
                {disconnected}
            </div>
        </>
    )
    

}