import React from "react";
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 100%;
`;


function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const {draggableId, destination, source} = info;
    if(!destination) return;
    if(source.droppableId === destination?.droppableId) {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      })
    } else {
      if(!destination) return;
      setToDos((allBoards) => {
        /* 
          1. 이전의 board의 값에서 삭제 (source.index 사용)
          2. destination을 사용해서 새로 옮긴 곳의 board를 가져옴 그리고 index 추가
          3. olToDos를 풀고 이전과 이후의 board를 두 개 넣으면 됨
        */
        const prevBoardCopy = [...allBoards[source.droppableId]]
        const nextBoardCopy = [...allBoards[destination.droppableId]]
        const taskObj = prevBoardCopy[source.index];
        prevBoardCopy.splice(source.index, 1);
        nextBoardCopy.splice(destination.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: prevBoardCopy,
          [destination.droppableId]: nextBoardCopy,
        };
      })
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            { Object.keys(toDos).map((boardId) => <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />) }
          </Boards>
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;
