
import { createContext } from 'react';
import { useWebSocketConnection } from '../hooks/websocket';

export const WsContext = createContext(null);

export function WsProvider({children}){

    const [connectionStatus, socket, dispatch] = useWebSocketConnection();

    return(
        <WsContext.Provider value={{connectionStatus: connectionStatus, socket : socket, dispatch: dispatch}}>
            {children}
        </WsContext.Provider>
    )
    
}