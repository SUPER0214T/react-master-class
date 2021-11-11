import { useState } from "react";
import styled from "styled-components";

const Container = styled.div<CircleProps>`  // props로 들어오는 녀석의 타입을 정한것
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: ${props => props.bgColor};
  border: 1px solid ${props => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

function Circle({ bgColor, borderColor, text = "Hello" }: CircleProps) {  // props: CircleProps
  const [counter, setCounter] = useState(1);
  
  const btnEvent = () => setCounter(cur => cur + 1)

  return (
    <>
      <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
        {text}
        {counter}
      </Container>
      <button type="button" onClick={btnEvent}>Add</button>
    </>
  )
}

export default Circle;