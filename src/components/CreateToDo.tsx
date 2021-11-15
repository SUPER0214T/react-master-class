import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState)
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<IForm>();
  const onValid = ({toDo}: IForm) => {
    setToDos((oldToDos) => [{text: toDo, id: Date.now(), category: "TO_DO"}, ...oldToDos])
    setValue("toDo", "");
  }

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <input {...register("toDo", {required: "Please write a To Do"})} placeholder="Write ToDos"/>
      <button type="submit">Add</button>
      <span>{errors?.toDo?.message}</span>
    </form>
  );
}

export default CreateToDo;