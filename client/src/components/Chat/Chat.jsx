import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import {useSocket} from "../../utils/socket";
import {AnimatePresence} from "framer-motion";
import {FiSend} from "react-icons/fi";
import {BeatLoader} from "react-spinners";
import {nanoid} from "nanoid";
import {useRoomStore, useChatStore, useUserStore} from "../../store";
import {HiOutlineStatusOnline} from "react-icons/hi";
import {RiArrowDownSLine} from "react-icons/ri";
import * as S from "./styles";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./receiverMessage";
import {useLayoutEffect} from "react";

const Chat = () => {
    const {roomID} = useParams();
    const user = useUserStore();
    const {socket} = useSocket();
    const room = useRoomStore((state) => state.room);
    const [message, setMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [typingUsers, setTypingUsers] = useState([]);
    const messages = useChatStore((state) => state.messages);
    const markAsRead = useChatStore((state) => state.markAsRead);
    const chatRef = useRef(null);
    const messageRefArray = useRef([]);
    const unreadMessageRef = useRef(null);
    const [hasMessageSent, setHasMessageSent] = useState(false);
    const [hasScrolledToTop, setHasScrolledToTop] = useState(false);

    const firstUnreadMessageIdx = useMemo(() => {
        return messages.findIndex((m) => m.unread);
    }, []);

    const numberOfUnreadMessages = useMemo(() => {
        return messages.filter((m) => m.unread).length;
    }, []);

    const sendMessage = useCallback(
        (e) => {
            setHasMessageSent(true);
            e.preventDefault();
            if (!message.trim()) return;
            const updatedMessage = {
                id: nanoid(6),
                unread: false,
                text: message,
                userID: user.id,
                userName: user.name,
                userAvatar: user.avatar,
                time: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false}),
            };
            socket.emit("chat-message", {roomID, message: updatedMessage});
            setMessage("");
        },
        [message, roomID, socket, user]
    );

    const handleOnChange = (e) => {
        setMessage(e.target.value);
        socket.emit("typing", {roomID, user});
    };

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    const scrollIntoViewSmooth = () => {
        if (unreadMessageRef.current) {
            unreadMessageRef.current.scrollIntoView({behavior: "smooth", block: "center"});
        }
    };

    const handleOnScroll = () => {
        const {scrollTop, clientHeight, scrollHeight} = chatRef.current;
        const offset = 150;
        const hasScrolledToTop = scrollHeight - scrollTop >= clientHeight + offset;
        setHasScrolledToTop(hasScrolledToTop);
    };

    useEffect(() => {
        if (firstUnreadMessageIdx !== -1 && !hasMessageSent) return;
        else scrollToBottom();
    }, [messages.length, firstUnreadMessageIdx]);

    useEffect(() => {
        let timeoutId;
        scrollIntoViewSmooth();
        const handleTyping = (typingUser) => {
            setIsTyping(true);
            setTypingUsers((prevUsers) => [typingUser, ...prevUsers]);
            const handleTypingTimeout = () => {
                setTypingUsers((prevUsers) => prevUsers.filter((user) => user.id !== typingUser.id));
                setIsTyping(false);
            };
            clearTimeout(timeoutId);
            timeoutId = setTimeout(handleTypingTimeout, 2000);
        };
        const options = {
            root: chatRef.current,
            rootMargin: "0px",
            threshold: 0.75,
        };
        let observedElements = [];
        const intersectionHandler = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !observedElements.includes(entry.target.id)) {
                    markAsRead(entry.target.id);
                    observedElements.push(entry.target.id);
                }
            });
        };
        const observer = new IntersectionObserver(intersectionHandler, options);
        messageRefArray.current.forEach((el) => {
            if (el instanceof Element) {
                observer.observe(el);
            }
        });
        socket.on("typing", handleTyping);
        return () => {
            socket.off("typing", handleTyping);
            observer.disconnect();
            messageRefArray.current = [];
        };
    }, [socket]);

    return (
        <S.Chat>
            <S.Header>
                <div className='chat-description'>
                    <S.Typography as='h1' bold>
                        chat
                    </S.Typography>
                    <AnimatePresence>
                        {isTyping && (
                            <S.TypingUser
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{ease: "easeInOut"}}>
                                <S.Typography xs bold color='#7a44fe'>
                                    {typingUsers[0].name} is typing
                                </S.Typography>
                                <BeatLoader color='#7a44fe' margin={1} size={4} speedMultiplier={1} />
                            </S.TypingUser>
                        )}
                    </AnimatePresence>
                </div>
                <div className='online-users'>
                    <HiOutlineStatusOnline color='#25D366' size={18} />
                    <S.Typography as='span' sm bold>
                        {room.players.length} online
                    </S.Typography>
                </div>
            </S.Header>
            <S.Background>
                <S.MessageGroup ref={chatRef} onScroll={handleOnScroll}>
                    <AnimatePresence initial={false}>
                        {messages.map((message, index) => {
                            return (
                                <React.Fragment key={message.id}>
                                    {firstUnreadMessageIdx === index && !hasMessageSent && (
                                        <S.UnRead ref={unreadMessageRef}>
                                            <div className='unread-message'>
                                                <S.Typography sm>{numberOfUnreadMessages} Unread Messages</S.Typography>
                                            </div>
                                        </S.UnRead>
                                    )}
                                    {message.isSent ? (
                                        <SenderMessage message={message} />
                                    ) : (
                                        <ReceiverMessage message={message} messageRefArray={messageRefArray} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </AnimatePresence>
                </S.MessageGroup>
                <AnimatePresence>
                    {hasScrolledToTop && (
                        <S.ScrollToBottom
                            key='scroll'
                            initial={{scale: 0, opacity: 0}}
                            animate={{scale: 1, opacity: 1}}
                            exit={{scale: 0, opacity: 0}}
                            transition={{ease: "easeInOut", duration: 0.2}}
                            onClick={scrollToBottom}>
                            <RiArrowDownSLine />
                        </S.ScrollToBottom>
                    )}
                </AnimatePresence>

                <S.Form onSubmit={sendMessage}>
                    <S.Avatar md src={user.avatar} alt='user-avatar' />
                    <div className='input-wrapper'>
                        <S.Input
                            type='text'
                            name='message'
                            autoFocus='on'
                            value={message}
                            autoComplete='off'
                            placeholder='Message...'
                            onChange={handleOnChange}
                        />
                        <S.Button type='submit'>
                            <FiSend className='icon' />
                        </S.Button>
                    </div>
                </S.Form>
            </S.Background>
        </S.Chat>
    );
};

export default Chat;
