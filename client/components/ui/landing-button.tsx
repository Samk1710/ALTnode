import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="cta">
        <span className="hover-underline-animation"> Explore </span>
        <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width={30} height={10} viewBox="0 0 46 16">
          <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545L8,16l8-8Z" transform="translate(30)" fill="#FFFFFF"/>
        </svg>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .cta {
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center; /* Keeps text and arrow aligned */
    gap: 10px; /* Adds space between text and arrow */
  }

  .cta span {
    letter-spacing: 4px;
    font-size: 14px;
    text-transform: uppercase;
    color: #FFFFFF;
  }

  .cta svg {
    transition: all 0.3s ease;
    fill: #FFFFFF;
  }

  .cta:hover svg {
    transform: translateX(5px); /* Moves arrow smoothly */
  }

  .cta:active svg {
    transform: scale(0.9);
  }

  .hover-underline-animation {
    position: relative;
    color: #FFFFFF;
  }

  .hover-underline-animation:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: #FFFFFF;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  .cta:hover .hover-underline-animation:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

export default Button;
