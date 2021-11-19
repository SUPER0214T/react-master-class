import { motion, Variants } from "framer-motion";
import React, { useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
  hover: {scale: 1.5, rotateZ: 90,},
  click: { scale: 0.8, borderRadius: "50%" }
}


function App() {
  const biggerBoxRef = useRef(null);

  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box drag dragConstraints={biggerBoxRef} dragElastic={1} dragSnapToOrigin variants={boxVariants} whileHover="hover" whileTap="click" whileDrag={{backgroundColor: "rgb(200, 200, 200)"}} />
      </BiggerBox>
    </Wrapper>
  );
}

export default App;
