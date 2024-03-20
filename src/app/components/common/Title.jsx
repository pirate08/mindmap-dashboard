'use client';

import React from 'react';
import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-left: 0.5rem;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 5px;
    background-image: linear-gradient(
      45deg,
      #f3ec78,
      #af4261,
      #5786e5,
      #f3ec78
    );
    background-size: 400% 400%;
    animation: gradient 8s ease infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Title = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
