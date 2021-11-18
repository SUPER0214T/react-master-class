import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDo, toDoState } from "../atoms";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

interface IForm {
  toDo: string;
}

const Wrapper = styled.div`
  background-color: #dfe6e9;
  padding-top: 10px;
  border-radius: 5px;
  min-height: 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${props => props.isDraggingOver ? '#b2bec3' : props.draggingFromThisWith ? "#b2bec3" : 'transparent'};
  flex-grow: 1;
  transition: background-color 200ms ease-in-out;
  padding: 10px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

function Board({toDos, boardId}: IBoardProps) {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDo = useSetRecoilState(toDoState);

  const onValid = ({ toDo }: IForm) => {
    const newToDo: IToDo = {
      id: Date.now(),
      text: toDo,
    }
    setToDo(oldToDos => {
      return {
        ...oldToDos,
        [boardId]: [newToDo, ...oldToDos[boardId]],
      }
    })
    setValue("toDo", "");
  }

  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId}`} />
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, snapshot) => {
          return (
            <Area isDraggingOver={snapshot.isDraggingOver} draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)} ref={magic.innerRef} {...magic.droppableProps}>
              {
                toDos.map((el, i) => (
                  <DraggableCard toDoId={el.id} i={i} key={el.id} toDoText={el.text}/>
                ))
              }
              {magic.placeholder}
            </Area>
          )
        }}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
