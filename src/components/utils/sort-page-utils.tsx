import { ElementStates } from "../../types/element-states";


export const randomArrFunc = (): number[] => {
    const arr: number[] = [];
    const minLen = 3;
    const maxLen = 17;
    const arrLen =  Math.floor(Math.random() * (maxLen - minLen) + minLen);


    for (let i = 0; i < arrLen; i++) {
        const value = Math.floor(Math.random() * (100 - 0) + 0);
        arr[i] = value;
    }


    return arr;
}


export const columnStyle = (
    index: number,
    modifiedIndexes: number[],
    changingIndexes: number[]
  ) => {
    //
    if (changingIndexes.findIndex((item) => item === index) !== -1) {
        return ElementStates.Changing;
    } 

    if (modifiedIndexes.findIndex((item) => item === index) !== -1) {
        return ElementStates.Modified;
    }

    return ElementStates.Default;


  };