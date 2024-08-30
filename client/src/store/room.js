import { create } from 'zustand'

let useRoomStore = (set) => ({
    room: null,
    setRoom: (room) => set({ room }),
})

useRoomStore = create(useRoomStore)

export default useRoomStore