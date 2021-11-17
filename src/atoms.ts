import { atom, selector } from "recoil";

// 아래처럼 타입 정해서 나중에 유저가 직접 board 추가할 수 있도록 할 수 있다.
interface IToDoState {
  [key: string]: string[];
}

export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    to_do: ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
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