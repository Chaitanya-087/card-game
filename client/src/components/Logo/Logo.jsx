import React from "react";
import styled from "styled-components";

const StyledLogo = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, 10px);
    gap: 6px;
`;

const Dot = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 100%;
    outline: 2px solid black;
    box-shadow: 0 2.5px 0 1px black;
`;

const PinkDot = styled(Dot)`
    background-color: #ff6787;
`;

const YellowDot = styled(Dot)`
    background-color: #fecf68;
`;

const Logo = () => {
    return (
        <StyledLogo>
            <PinkDot />
            <YellowDot />
            <YellowDot />
            <PinkDot />
        </StyledLogo>
    );
};

export default Logo;
