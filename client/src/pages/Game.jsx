import React, {useEffect, useState} from "react";
import {Gameboard, Logo, Sidebar} from "../components";
import {useSocket} from "../utils/socket";
import {useParams} from "react-router-dom";
import {useUserStore, useRoomStore} from "../store";
import {GridLoader} from "react-spinners";

const Game = () => {
    const {roomID} = useParams();
    const {socket} = useSocket();
    const user = useUserStore();
    const setRoom = useRoomStore((state) => state.setRoom);
    const [isIntializing, setIsIntializing] = useState(true);

    const initializeRoom = (data) => {
        setRoom(data);
        setTimeout(() => {
            setIsIntializing(false);
        }, 1000);
    };

    const handleUpdate = (data) => {
        setRoom(data);
    };

    useEffect(() => {
        socket.emit("join-room", {user, roomID});
        socket.on("initializing", initializeRoom);
        socket.on("update", handleUpdate);

        return () => {
            socket.off("initializing", initializeRoom);
            socket.off("update", handleUpdate);
        };
    }, [socket, user, roomID, initializeRoom, handleUpdate]);

    return (
        <section className='container'>
            <div className='game'>
                {isIntializing ? (
                    <div className='initial'>
                        <GridLoader color='#fff' size={10} />
                        <p>initializing...</p>
                    </div>
                ) : (
                    <React.Fragment>
                        <Logo />
                        <Gameboard />
                    </React.Fragment>
                )}
            </div>
            <Sidebar />
        </section>
    );
};

export default Game;
