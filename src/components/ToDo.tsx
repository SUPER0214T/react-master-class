import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

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
      {category !== Categories.DOING && <button name={Categories.DOING} onClick={() => onClick(Categories.DOING)}>Doing</button>}
      {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={() => onClick(Categories.TO_DO)}>To Do</button>}
      {category !== Categories.DONE && <button name={Categories.DONE} onClick={() => onClick(Categories.DONE)}>Done</button>}
    </li>
  );
}

export default ToDo;
