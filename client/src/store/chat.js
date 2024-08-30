import { create } from "zustand";
import { produce } from "immer";

const useChatStore = create((set) => ({
    messages: [],
    notifications: 0,
    addMessage: (payload) =>
        set(
            produce((draft) => {
                const {message,userID} = payload;
                const lastMessage = draft.messages[draft.messages.length - 1];
                let isSent = "";
                let type = "";

                if (userID === message.userID) {
                    isSent = true;
                } else {
                    isSent = false;
                }

                if (!lastMessage || lastMessage?.userID !== message.userID) {
                    type = "start";
                } else {
                    type = "middle";
                }  
                
                
                draft.messages.push({...message,isSent, type});
                draft.notifications = message.unread ? draft.notifications + 1 : draft.notifications;
            })
        ),
    markAsRead: (id) =>
        set(
            produce((draft) => {
                const messageIdx = draft.messages.findIndex((m) => m.id === id);
                if (messageIdx !== -1) {
                    draft.messages[messageIdx].unread = false;
                    draft.notifications = draft.notifications > 0 ? draft.notifications - 1 : 0;
                }
            })
        ),


}));

export default useChatStore;