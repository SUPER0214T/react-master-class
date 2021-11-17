import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  el: string;
  i: number;
}


const Card = styled.div`
  background-color: ${props => props.theme.cardBgColor};
  padding: 10px 10px;
  border-radius: 5px;
  font-weight: 700;
  margin-bottom: 5px;
`;

function DraggableCard({el, i}: IDraggableCardProps) {
  console.log("Render: " + el)

  return (
    <Draggable draggableId={el} index={i} key={el}>
      {(magic) => (
        <Card ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {el}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard);