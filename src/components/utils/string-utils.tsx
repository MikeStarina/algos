import { ElementStates } from "../../types/element-states";

export const swap = (arr: string[], headIndex: number, tailIndex: number): void => {
    const temp = arr[headIndex];
    arr[headIndex] = arr[tailIndex];
    arr[tailIndex] = temp;
}

export const circleStyle = (index: number, modifiedIndexes: number[], changingIndexes: number[]) => {
    if (modifiedIndexes.findIndex(item => item === index) !== -1) {
      return ElementStates.Modified;
    } else if (changingIndexes.findIndex(item => item === index) !== -1) {
      return ElementStates.Changing;
    } else {
      return ElementStates.Default;
    }
  }