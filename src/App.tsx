import React from "react";
import styled, { keyframes } from "styled-components";

const Box = styled.div`
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: ${props => props.theme.backgroundColor};
`;

const Circle = styled(Box)`
  border-radius: 50%;
`;

const Input = styled.input.attrs({required: true})`
  width: 100px;
`;

const spinnerAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    border-radius: 100px;
  }
  100% {
    transform: rotate(360deg);
    border-radius: 0;
  }
`;

const Spinner = styled.div`
  animation: ${spinnerAnimation} 1s linear infinite;
  width: 200px;
  height: 200px;
  background-color: orange;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(2);
  }

  span {
    font-size: 100px;

    &:active {
      opacity: 0;
    }
  }
`;

function App() {
  return (
    <>
      <Box bgColor={'teal'} />
      <Circle href="/" bgColor="tomato" />
      <Input />
      <Input />
      <Spinner>
        <span>Hi!</span>
      </Spinner>
    </>
  );
}

export default App;
