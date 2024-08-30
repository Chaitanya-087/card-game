import React from "react";
import styled from "styled-components";
import {motion} from "framer-motion";

const BackDropContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    backdrop-filter: blur(0.4rem);
    background-color: rgba(18, 18, 18, 0.6);
    z-index: 9;
`;
const backDropVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

const BackDrop = ({children, onClick, background, blur}) => {
    return (
        <BackDropContainer
            variants={backDropVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
            style={{background,backdropFilter:blur}}
            onClick={onClick}>
            {children}
        </BackDropContainer>
    );
};

export default BackDrop;