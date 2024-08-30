import React from "react";
import {LeftMessage, Avatar, Typography, MessageBubbleRight, Time} from "./styles";
const ReceiverMessage = ({message, messageRefArray}) => {
    return (
        <LeftMessage
            initial={{opacity: 0, scale: 0}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 1}}
            style={{transformOrigin: "top left"}}
            transition={{ease: "easeInOut"}}
            id={message.id}
            key={message.id}
            className={message.type}
            ref={(el) => (message.unread ? messageRefArray.current.push(el) : null)}>
            <Avatar src={message.userAvatar} className={message.type} alt='avatar' sm />
            <div className={`message-body ${message.type}`}>
                {message.type === "start" && (
                    <React.Fragment>
                        <Typography as='h2' sm bold>
                            {message.userName}
                        </Typography>
                        <MessageBubbleRight />
                    </React.Fragment>
                )}
                <Typography md>
                    {message.text}
                    <Time>{message.time}</Time>
                </Typography>
            </div>
        </LeftMessage>
    );
};

export default ReceiverMessage;
