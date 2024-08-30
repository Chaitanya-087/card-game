import React, {useEffect, useState, useCallback} from "react";
import {useSocket} from "../utils/socket";
import {useUserStore} from "../store";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const {socket} = useSocket();
    const user = useUserStore();
    const [roomID, setRoomID] = useState("");
    const navigate = useNavigate();

    const onRoomCreated = useCallback((roomID) => {
        setRoomID(roomID);
    }, []);

    useEffect(() => {
        socket.on("room-created", onRoomCreated);
        return () => {
            socket.off("room-created", onRoomCreated);
        };
    }, [socket, onRoomCreated]);

    const handleRoomCreate = useCallback(() => {
        socket.emit("create-room");
    }, [socket]);

    const handleJoinRoom = useCallback(() => {
        navigate(`/${roomID}`);
    }, [navigate, roomID]);

    return (
        <section>
            {JSON.stringify(user)}
            <button onClick={handleRoomCreate}>create</button>
            <button onClick={handleJoinRoom}>join {roomID}</button>
        </section>
    );
};

export default Home;
