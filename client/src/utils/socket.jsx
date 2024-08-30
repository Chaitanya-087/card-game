import {io} from "socket.io-client";
import {createContext, useMemo, useContext} from "react";

const SocketContext = createContext(null);

export const SocketProvider = ({children}) => {
    const socket = useMemo(() => io("http://localhost:5000"), []);
    return <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);