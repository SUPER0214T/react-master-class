import React, { useState } from "react";
import { useForm } from "react-hook-form";


// function ToDoList() {
//   const [toDo, setToDo] = useState("")
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const value = e.currentTarget.value;
//     setToDo(value);
//   }
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(toDo);
//     setToDo("");
//   }
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write ToDos"/>
//         <button type="submit">Add</button>
//       </form>
//     </div>
//   );
// }

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password2: string;
  extraError?: string;
}

function ToDoList() { 
  const { register, watch, handleSubmit, formState: {errors}, setError } = useForm<IForm>({
    defaultValues: {
      email: "@naver.com",
    }
  });

  const onValid = (data: IForm) => {
    console.log("data: ",data);
    if(data.password !== data.password2) {
      setError("password2", { message: "Password are not the same" }, { shouldFocus: true })
    }
    // setError("extraError", { message: "Server Offline." })
  };
  // console.log("register: ", register);
  // console.log("watch: ", watch());
  console.log("errors: ", errors);

  return (
    <div>
      <form style={{display: "flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: "Email is required", pattern: {value: /^[A-Za-z0-9._%+-]+@naver.com$/, message: "Only naver.com emails allowed"}})} placeholder="Email"/>
        <span>{errors?.email?.message}</span>
        <input {...register("firstName", { required: "Write here", maxLength: {value: 10, message: "Your password is too long"}, validate: {
          fName: (value) => {
            return value.includes("young") ? "rename" : true;
          }
        } })} placeholder="First Name"/>
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: "Write here", minLength: {value: 10, message: "Your password is too short"} })} placeholder="Last name"/>
        <span>{errors?.lastName?.message}</span>
        <input {...register("username", { required: "Write here", minLength: {value: 10, message: "Your password is too short"} })} placeholder="Username"/>
        <span>{errors?.username?.message}</span>
        <input {...register("password", { required: "Write here", minLength: {value: 10, message: "Your password is too short"} })} placeholder="Password"/>
        <span>{errors?.password?.message}</span>
        <input {...register("password2", { required: "Write here", minLength: {value: 10, message: "Your password is too short"} })} placeholder="Password"/>
        <span>{errors?.password2?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default ToDoList;