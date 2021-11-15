import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({text, category, id}: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (newCategory: IToDo["category"]) => {
    console.log("I wanna to", newCategory);
    setToDos((oldToDos) => {
      const newToDos: IToDo[] = [...oldToDos];
      const newToDo: IToDo = {text, id, category: newCategory}
      const arrIndex = newToDos.findIndex(el => el.id === id);
      newToDos.splice(arrIndex, 1, newToDo)
      // newToDos[arrIndex] = newCategory;
      return newToDos;
    })
  }

  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing</button>}
      {category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>To Do</button>}
      {category !== "DONE" && <button onClick={() => onClick("DONE")}>Done</button>}
    </li>
  );
}

export default ToDo;
