import { motion, Variant, Variants } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Box = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly; */
  width: 200px;
  height: 200px;
  background-color: purple;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: white;
  place-self: center;
  border-radius: 35px;
`;

const myBoxVar: Variants = {
  start: { 
    scale: 0.5, 
    opacity: 0,
  },
  end: {
    opacity: 1, 
    scale: 1, 
    transition: {
      type: "spring",
      duration: 0.5, 
      bounce: 0.5, 
      delayChildren: 0.3, 
      staggerChildren: 0.1,
    } 
  }
}

const myCircleVar: Variants = {
  start: { opacity: 0, y: 10 },
  end: { opacity: 1, y: 0 }
}

function App() {

  return (
    <Wrapper>
      <Box variants={myBoxVar} initial="start" animate="end">
        <Circle variants={myCircleVar}/>
        <Circle variants={myCircleVar}/>
        <Circle variants={myCircleVar}/>
        <Circle variants={myCircleVar}/>
      </Box>
    </Wrapper>
  );
}

export default App;
