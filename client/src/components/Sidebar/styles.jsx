import styled from "styled-components";
import {motion} from "framer-motion";

export const StyledUl = styled.ul`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: var(--secondary-color);
    display: flex;
    flex-direction: column;
    z-index: 10;
    @media (width<=768px) {
        flex-direction: row;
        justify-content: space-around;
        width: 100%;
        top: auto;
        bottom: 0;
        height: 50px;
    }
`;

export const StyledLi = styled.li`
    width: 50px;
    aspect-ratio: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #ffffff;
    transition: all 0.2s ease-in-out;
    position: relative;
`;

export const NotificationsCount = styled(motion.div)`
    position: absolute;
    padding: 1px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--accent-color-3);
    top: 10px;
    right: 10px;

    display: grid;
    place-items: center;

    font-size: 0.5rem;
    font-weight: 700;
    box-shadow: 0 0 0 3px var(--secondary-color);

    .count {
        position: absolute;
        transform: translateY(-10%);
    }
`;

export const DraggableContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 368px;
    background-color: var(--secondary-color);
    z-index: 10;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: #ffffff;
    user-select: none;
    @media (max-width: 768px) {
        width: 100%;
        border-radius: 1.25rem 1.25rem 0 0;
        height: 75dvh;
        top: auto;
        bottom: 50px;
        z-index: 10;
    }
`;

export const TabContainer = styled(motion.div)`
    flex: 1;
    touch-action: none;
    overflow: hidden auto;
    /* position: relative; */
`;

export const DragIndicator = styled.div`
    position: absolute;
    width: 5px;
    height: 40px;
    background-color: var(--primary-color);
    z-index: 5;
    border-radius: 25px;
    top: 50%;
    transform: translateY(-50%);
    left: 4px;
    @media (max-width: 768px) {
        top: 0;
        left: 50%;
        transform: translateX(-50%) rotate(90deg);
    }
`;
