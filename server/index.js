import { customAlphabet } from 'nanoid';
import { createServer } from 'http';
import { Server } from 'socket.io';

const numbers = '0123456789';
const numberID = customAlphabet(numbers, 6);

const server = createServer();

const io = new Server(server, {
    cors: true,
});

const rooms = {};

function createEmptyBoard(rows, cols) {
    const board = [];
    for (let row = 0; row < rows; row++) {
        board.push(Array.from({ length: cols }, () => ""));
    }
    return board;
}

// factory function: create a room object and return it
function Room() {
    let room = {
        board: createEmptyBoard(6, 7),
        turnID: null,
        players: [],
        status: {
            id: null,
            type: null,
            message: null,
            winningCells: []
        },
        addUser: (user) => {
            room.players.push(user);
            room.turnID = room.players.length === 1 ? user.id : room.turnID;
        },
        removeUser: (user) => {
            const userIndex = room.players.findIndex((u) => u.id === user.id);
            if (userIndex !== -1) {
                room.players.splice(userIndex, 1);
            }
        },
        setNextTurn: () => {
            const currentPlayerIdx = room.players.findIndex((player) => player.id === room.turnID);
            const nextPlayerIdx = (currentPlayerIdx + 1) % room.players.length;
            room.turnID = room.players[nextPlayerIdx].id;
        },

        // utility functions
        _userExists: (user) => {
            return room.players.find((u) => u.id === user.id);
        },
        _isFull: () => {
            return room.players.length >= 2;
        },
        _isEmpty: () => {
            return room.players.length === 0;
        },
    };
    return room;
}

io.on('connection', (socket) => {
    console.log('🚀new client connected👌');

    socket.on('create-room', () => {
        const roomID = numberID();
        socket.emit('room-created', roomID);
    });

    socket.on('join-room', ({ user, roomID }) => {
        let room = rooms[roomID];
        if (!room) {
            room = Room();
            rooms[roomID] = room;
        }
        if (!room._userExists(user) && !room._isFull()) {
            room.addUser(user);
            socket.join(roomID);
            io.to(roomID).emit("initializing", room);
        } else {
            socket.emit("room full");
            return;
        }
        socket.on('disconnect', () => {
            room.removeUser(user);
            socket.leave(roomID)
            io.to(roomID).emit("update", room)
            if (room._isEmpty()) {
                delete rooms[roomID];
            }
        });
    });

    socket.on('move', ({ cidx, roomID }) => {
        const room = rooms[roomID]
        if (!room) {
            return;
        }
        let rowIndex = -1;
        for (let i = room.board.length - 1; i >= 0; i--) {
            if (room.board[i][cidx] === "") {
                rowIndex = i;
                break;
            }
        }
        if (rowIndex === -1) return;
        room.board[rowIndex][cidx] = 'X'
        room.setNextTurn()
        io.to(roomID).emit("update", { ...room, board: room.board, turnID: room.turnID, status: room.status })
    })

    socket.on('typing', ({ roomID, user }) => {
        const room = socket.broadcast.to(roomID)
        if (room) {
            room.emit('typing', user);
        } else {
            console.log('room not found');
        }
    })

    socket.on('chat-message', ({ roomID, message }) => {
        io.to(roomID).emit('chat-message', message);
        const room = socket.broadcast.to(roomID);
        if (room) {
            room.emit('push-notification');
        } else {
            console.log('room not found');
        }
    });
});

server.listen(5000, () => console.log('server is running on port 5000'));