import React, {useEffect, useState, useCallback, useMemo} from "react";
import {AnimatePresence, useMotionValue, useTransform, useWillChange} from "framer-motion";
import {useSocket} from "../../utils/socket";
import BackDrop from "../Backdrop/Backdrop";
import {useMediaQuery} from "react-responsive";
import {StyledUl, StyledLi, DraggableContainer, TabContainer, DragIndicator, NotificationsCount} from "./styles";
import Tabs from "./Tabs";
import {useUserStore, useChatStore} from "../../store";

const sidebarVariantsMd = {
    initial: {
        y: "100%",
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
    },
    exit: {
        y: "100%",
    },
};

const sidebarVariantsLg = {
    initial: {
        x: "100%",
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: "100%",
    },
};

const tabVariants = {
    initial: (direction) => ({
        x: direction < 0 ? -500 : 500,
        opacity: 0,
    }),

    animate: {
        x: 0,
        opacity: 1,
    },

    exit: (direction) => ({
        x: direction < 0 ? 500 : -500,
        opacity: 0,
    }),
};

const Sidebar = () => {
    const willChange = useWillChange();
    const y = useMotionValue(0);
    const background = useTransform(y, [0, 150], ["rgba(18,18,18,0.6)", "rgba(18,18,18,0)"]);
    const blur = useTransform(y, [0, 150], ["blur(0.4rem)", "blur(0.1rem)"]);
    const user = useUserStore();
    const {socket} = useSocket();
    const [isOpen, setIsOpen] = useState(false);
    const [direction, setDirection] = useState(1);
    const [selectedTab, setSelectedTab] = useState(Tabs[0]);
    const isMobile = useMediaQuery({query: "(max-width: 768px)"});
    const addMessage = useChatStore((state) => state.addMessage);
    const notifications = useChatStore((state) => state.notifications);
    const handleTabSelect = useCallback(
        (tab) => {
            if (tab.key === selectedTab.key) {
                setIsOpen((v) => !v);
            } else {
                const direction = tab.id > selectedTab.id ? 1 : -1;
                setIsOpen(true);
                setDirection(direction);
                setSelectedTab(tab);
            }
        },
        [selectedTab]
    );

    const isChatOpen = useMemo(() => isOpen && selectedTab.key === "chat", [isOpen, selectedTab]);
    const closeSidebar = () => setIsOpen(false);

    useEffect(() => {
        const handleChatMessage = (message) => {
            const payload = {
                message: {...message, unread: !isChatOpen},
                userID: user.id,
            };
            addMessage(payload);
        };
        socket.on("chat-message", handleChatMessage);
        return () => {
            socket.off("chat-message", handleChatMessage);
        };
    }, [socket, isChatOpen]);

    const dragProps = {
        drag: isMobile ? "y" : "x",
        dragElastic: 0,
        dragSnapToOrigin: true,
        dragConstraints: isMobile ? {top: 0, bottom: 300} : {left: 0, right: 150},
        onDragEnd: (_, info) => {
            if (info.offset.x > 120 || (isMobile && info.offset.y > 200)) {
                setIsOpen(false);
            }
        },
        dragMomentum: false,
        dragTransition: {bounceStiffness: 1000, bounceDamping: 100},
    };

    return (
        <React.Fragment>
            <StyledUl>
                {[...Tabs.slice(1)].map((tab) => {
                    return (
                        <StyledLi key={tab.key} onClick={() => handleTabSelect(tab)}>
                            {isOpen && selectedTab && tab.key === selectedTab.key ? tab.activeIcon : tab.icon}
                            <AnimatePresence>
                                {tab.key === "chat" && notifications && (
                                    <NotificationsCount
                                        initial={{scale: 0}}
                                        animate={{scale: 1}}
                                        exit={{scale: 0}}
                                        key='notifications'
                                        style={{willChange}}
                                        transition={{delay: 0.5}}>
                                        <div className='count'>{notifications}</div>
                                    </NotificationsCount>
                                )}
                            </AnimatePresence>
                        </StyledLi>
                    );
                })}
            </StyledUl>
            <AnimatePresence mode='wait'>
                {isOpen && (
                    <BackDrop background={background} blur={blur} key='backDrop' onClick={closeSidebar}>
                        <DraggableContainer
                            variants={isMobile ? sidebarVariantsMd : sidebarVariantsLg}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            style={{y, willChange}}
                            key='draggableContainer'
                            transition={{duration: 0.2, ease: "easeInOut"}}
                            {...dragProps}
                            onClick={(e) => e.stopPropagation()}>
                            <AnimatePresence initial={false} mode='wait' custom={direction}>
                                <TabContainer
                                    variants={tabVariants}
                                    initial='initial'
                                    animate='animate'
                                    exit='exit'
                                    style={{willChange}}
                                    transition={{duration: 0.2, ease: "easeInOut"}}
                                    custom={direction}
                                    key={selectedTab.key}>
                                    <DragIndicator />
                                    {selectedTab.component}
                                </TabContainer>
                            </AnimatePresence>
                        </DraggableContainer>
                    </BackDrop>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Sidebar;
