import { WsProvider } from "../components/WsProvider";
import { Lobby } from "../components/Lobby";

export function TicTacToe(){

    return(
        <WsProvider>
            <Lobby game={1}/>
        </WsProvider>
    )

}