import React from "react";
import {motion} from "framer-motion";
import {useSocket} from "../../utils/socket";
import {useRoomStore,useUserStore} from "../../store";
import {useParams} from "react-router-dom";

const grid = {
    hidden: {opacity: 0, y: -30},
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            when: "beforeChildren",
            staggerChildren: 0.01,
            type: "spring",
            bounce: 0,
        },
    },
};

const disc = {
    hidden: {scale: 0, opacity: 0},
    show: {scale: 1, opacity: 1, transition: {duration: 0.5, type: "spring", bounce: 0}},
};

const GameGrid = () => {
    const {socket} = useSocket();
    const board = useRoomStore((state) => state.room.board);
    const turnID = useRoomStore((state) => state.room.turnID);
    const userID = useUserStore((state) => state.id);

    const {roomID} = useParams();
    const handleClick = (cidx) => {
        if (turnID === userID) {
            socket.emit("move", {cidx, roomID});
        }
    };

    return (
        <motion.div variants={grid} initial='hidden' animate='show' className='grid'>
            {board.map((row, i) =>
                row.map((el, j) => (
                    <motion.div
                        variants={disc}
                        key={6 * i + j}
                        className={"disc " + el}
                        onClick={() => handleClick(j)}></motion.div>
                ))
            )}
        </motion.div>
    );
};

export default GameGrid;
