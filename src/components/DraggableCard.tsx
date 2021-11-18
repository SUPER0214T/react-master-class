import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface IDraggableCardProps {
  toDoId: number,
  toDoText: string;
  i: number;
}

interface ICardProps {
  isDragging: boolean;
}

const Card = styled.div<ICardProps>`
  background-color: ${props => props.isDragging ? "#74b9ff" : props.theme.cardBgColor};
  box-shadow: ${props => props ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none"};
  padding: 10px 10px;
  border-radius: 5px;
  font-weight: 700;
  margin-bottom: 5px;
`;

function DraggableCard({toDoId, toDoText, i}: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={i} key={toDoId}>
      {(magic, snapshot) => (
        <Card isDragging={snapshot.isDragging} ref={magic.innerRef} {...magic.draggableProps} {...magic.dragHandleProps}>
          {toDoText}
        </Card>
      )}
    </Draggable>
  )
}

export default React.memo(DraggableCard);