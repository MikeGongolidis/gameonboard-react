
export function parseOpenArgs(socket, joinEvent){
    // Get the parameters from the URL.
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    if (params.has("mtype") && params.has("room_id")) {
        // Second player joins an existing game.
        console.log('sending join request')
        joinEvent.room_id = params.get("room_id");
        socket.send(JSON.stringify(joinEvent));
    }

}