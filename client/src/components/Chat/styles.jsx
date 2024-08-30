import styled from "styled-components";
import {motion} from "framer-motion";

export const Chat = styled.section`
    height: 100%;
    color: var(--text-color);
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 50px;
    padding-inline: 0.75rem;
    & > .chat-description {
        display: flex;
        gap: 0.25rem;
        position: relative;
        align-items: center;
        flex: 1;
    }
    & > .online-users {
        font-size: 12px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
`;

export const TypingUser = styled(motion.div)`
    display: flex;
    align-items: center;
    gap: 0.125rem;
    position: absolute;
    bottom: -0.75rem;
`;

export const Typography = styled.p`
    font-size: ${(props) => {
        if (props.xs) return "0.65rem";
        else if (props.sm) return "0.85rem";
        else if (props.md) return "0.9rem";
        else if (props.lg) return "1.25rem";
        else if (props.xl) return "1.5rem";
        else return "1rem";
    }};
    font-weight: ${(props) => {
        if (props.bold) return "700";
        else if (props.light) return "300";
        else return "400";
    }};
    word-break: break-all;
    color: ${(props) => props.color || "var(--text-color)"};
`;

export const MessageGroup = styled.ul`
    flex: 1;
    z-index: 1;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    touch-action: none;
    padding-inline: 0.5rem;
    position: relative;
    scrollbar-gutter: auto;
    &::-webkit-scrollbar {
        width: 2.5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #5b595980;
    }
    & > *:has(.start) {
        margin-top: 0.45rem;
    }
`;

export const Message = styled(motion.li)`
    display: flex;
    gap: 0.45rem;
    --radius: 0.6rem;
    & > .message-body {
        display: flex;
        flex-direction: column;
        max-width: 92%;
        padding: 0.35rem 0.35rem 0.35rem 0.5rem;
        position: relative;
        border-top-left-radius: 0;
        min-width: 65px;
        justify-content: center;
        border-radius: var(--radius);
    }
`;

export const RightMessage = styled(Message)`
    justify-content: flex-end;
    & > .message-body {
        background: var(--accent-color);
    }
    & > .message-body.start {
        border-top-right-radius: 0;
    }
    & > .message-body.middle {
        margin-top: 0.15rem;
    }
`;

export const LeftMessage = styled(Message)`
    justify-content: flex-start;
    & > .message-body {
        background: linear-gradient(to right, #1e1e1e, #292929);
    }
    & > .message-body.start {
        border-top-left-radius: 0;
    }
    & > .message-body.middle {
        margin-top: 0.15rem;
    }
`;

export const Avatar = styled.img`
    width: var(--size);
    height: var(--size);
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    --size: ${(props) => {
        if (props.sm) return "24px";
        else if (props.md) return "32px";
        else if (props.lg) return "40px";
        else if (props.xl) return "48px";
        else return "32px";
    }};
    &.start {
        visibility: visible;
    }
    &.middle {
        visibility: hidden;
    }
`;

export const MessageBubbleRight = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    aspect-ratio: 1;
    background-color: #1e1e1e;
    transform: translateX(-50%) skewX(45deg);
    border-top-left-radius: 5px;
    z-index: -1;
`;

export const MessageBubbleLeft = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 8px;
    aspect-ratio: 1;
    background-color: var(--accent-color);
    transform: translateX(50%) skewX(-45deg);
    border-top-right-radius: 5px;
    z-index: -1;
`;

export const Background = styled.div`
    background: url(../../src/assets/chatbg10.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: hidden;
    touch-action: none;
`;

export const Form = styled.form`
    padding: 0.25rem 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.125rem;
    z-index: 4;
    z-index: 10;
    & > .input-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        border-radius: 4px;
        background-color: var(--secondary-color);
        border-radius: 25px;
    }
`;

export const Input = styled.input`
    outline: none;
    border: none;
    height: 40px;
    flex: 1;
    background-color: transparent;
    padding-left: 1rem;
    color: var(--text-color);
    &::placeholder {
        color: var(--text-color);
        opacity: 0.5;
    }
`;

export const Button = styled.button`
    padding-inline: 1rem;
    color: white;
    & > .icon {
        font-size: 1rem;
    }
`;

export const ScrollToBottom = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    aspect-ratio: 1;
    background: var(--secondary-color);
    position: absolute;
    bottom: 4rem;
    right: 0.5rem;
    z-index: 4;
    border-radius: 999px;
    font-size: 1.25rem;
    font-weight: 700;
    cursor: pointer;
`;

export const UnRead = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: 0.25rem;
    margin-block: 0.125rem;
    width: calc(100% + 1rem);
    position: relative;
    left: -0.5rem;
    background: rgba(18, 18, 18, 0.5);
    & > .unread-message {
        background-color: var(--primary-color);
        padding: 0.425rem 0.5rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const Time = styled.span`
    color: var(--text-color);
    opacity: 0.75;
    font-size: 0.65rem;
    float: right;
    position: relative;
    top: 0.5rem;
    margin-left: 0.5rem;
    font-weight: 400;
`;
