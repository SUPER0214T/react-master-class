import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: string[];
  boardId: string;
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding: 20px 10px;
  padding-top: 30px;
  border-radius: 5px;
  min-height: 300px;
`;

function Board({toDos, boardId}: IBoardProps) {

  return (
    <Droppable droppableId={boardId}>
      {(magic) => {
        return (
          <Wrapper ref={magic.innerRef} {...magic.droppableProps}>
            {
              toDos.map((el, i) => (
                <DraggableCard el={el} i={i} key={el}/>
              ))
            }
            {magic.placeholder}
          </Wrapper>
        )
      }}
    </Droppable>
  );
}

export default Board;
