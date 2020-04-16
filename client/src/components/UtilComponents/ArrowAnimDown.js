import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledArrow = styled.div`
  background-color: white;
  height: 50px;
  width: 50px;
  position: relative;
  z-index:10;

  .arrow {
    width: 100%;
    height: 80%;
    position: absolute; /* don't forget set container to relative */
    left: 10%;
    margin-left: 0px;
    bottom: 5%;
    z-index:999;
  }
  /* set arrow styles */
  .arrow path {
    stroke: ${colors.trans_color_main_4};
    stroke-width: 2px;
    fill: transparent;
    animation: down 2s infinite;
  }
  /* arrow keyframe animation */
  @keyframes down{
  0% { opacity:0 }
  25% { opacity:1 }
  75% { opacity:0 }
  100% { opacity:0 }
  }
  /* arrow animation delay */
  .arrow path.a1{ animation-delay:-1s; }
  .arrow path.a2{ animation-delay:-.5s; }
  .arrow path.a3{ animation-delay:0s; }
`;


const ArrowAnimDown = () => (
  <StyledArrow>
    <svg className="arrow">
      <path className="a1" d="M0 0 L20 12 L40 0" />
      <path className="a2" d="M0 10 L20 22 L40 10" />
      <path className="a3" d="M0 20 L20 32 L40 20" />
    </svg>
  </StyledArrow>
);


export default ArrowAnimDown;
