import {io} from "socket.io-client";

const socket= io(process.env.NEXT_PUBLIC_URL_BACKEND,{
    transports: ['websocket'],
    withCredentials:true,
})

export default socket;