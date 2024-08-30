import React from "react";
import {RightMessage, Typography, MessageBubbleLeft, Time} from "./styles";

const SenderMessage = ({message}) => {
    return (
        <RightMessage
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 1}}
            style={{transformOrigin: "top right"}}
            transition={{ease: "easeInOut"}}
            id={message.id}
            key={message.id}
            className={message.type}>
            <div className={`message-body ${message.type}`}>
                {message.type === "start" && (
                    <React.Fragment>
                        <MessageBubbleLeft />
                    </React.Fragment>
                )}
                <Typography md>
                    {message.text}
                    <Time>{message.time}</Time>
                </Typography>
            </div>
        </RightMessage>
    );
};

export default SenderMessage;
