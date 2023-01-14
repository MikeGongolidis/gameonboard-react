import { WsProvider } from "../components/WsProvider";
import { Lobby } from "../components/Lobby";

export function Connect4(){

    return(
        <WsProvider>
            <Lobby game={2}/>
        </WsProvider>
    )

}