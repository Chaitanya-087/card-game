import { nanoid, customAlphabet } from "nanoid";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';

const numbers = '0123456789';
const numberID = customAlphabet(numbers, 4);

let useUserStore = () => ({
    id: nanoid(8),
    name: "Player" + numberID(),
    avatar: "https://i.pravatar.cc/100",
    symbol: "",
});

useUserStore = create(persist(useUserStore, { name: 'user-storage', storage: createJSONStorage(() => sessionStorage) }));


export default useUserStore;