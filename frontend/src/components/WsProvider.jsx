
import { createContext } from 'react';
import { useWebSocketConnection } from '../hooks/websocket';

export const WsContext = createContext(null);

export function WsProvider({children}){

    const [connectionStatus, socket] = useWebSocketConnection();

    return(
        <WsContext.Provider value={{connectionStatus: connectionStatus, socket : socket}}>
            {children}
        </WsContext.Provider>
    )
    
}