import { atom, selector } from "recoil";

export interface IToDo {
  id: number,
  text: string,
}

// 아래처럼 타입 정해서 나중에 유저가 직접 board 추가할 수 있도록 할 수 있다.
interface IToDoState {
  [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    "To Do": [{id: 1, text: "Hello01"}, {id: 2, text: "Hello02"}],
    Doing: [],
    Done: [],
  }
})


// export const minuteState = atom({
//   key: "minutes",
//   default: 0,
// })

// export const hourSelector = selector<number>({
//   key: "hours",
//   get: ({get}) => {
//     const minutes = get(minuteState);
//     return minutes / 60;
//   },
//   set: ({set}, newValue) => {
//     const minutes = Number(newValue) * 60;
//     set(minuteState, minutes);
//   }
// })