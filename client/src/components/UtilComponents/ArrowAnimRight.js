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
    left: 20%;
    margin-left: 0px;
    bottom: 10%;
    z-index:999;
  }
  /* set arrow styles */
  .arrow path {
    stroke: ${colors.trans_color_main_2};
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


const ArrowAnimRight = () => (
  <StyledArrow>
    <svg className="arrow">
      <path className="a1" d="M0 0 L12 20 L0 40" />
      <path className="a2" d="M10 0 L22 22 L10 40" />
      <path className="a3" d="M20 0 L32 20 L20 40" />
    </svg>
  </StyledArrow>
);


export default ArrowAnimRight;
