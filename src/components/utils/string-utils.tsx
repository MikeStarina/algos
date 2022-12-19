import { ElementStates } from "../../types/element-states";
import { TLettersArray } from "../../types/string";

export const swap = (
  arr: TLettersArray[],
  headIndex: number,
  tailIndex: number
): void => {
  const temp = arr[headIndex];
  arr[headIndex] = arr[tailIndex];
  arr[tailIndex] = temp;
};


export const reverseFunc = async ( lettersArray: TLettersArray[], setLettersArray: (arr: TLettersArray[]) => void ) => {
  
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  for (let i = 0; i < Math.floor(lettersArray.length / 2); i++) {

    const headIndex = i;
    const tailIndex = lettersArray.length - 1 - i;
    lettersArray[headIndex].itemState = ElementStates.Changing;
    lettersArray[tailIndex].itemState = ElementStates.Changing;
    setLettersArray([...lettersArray]);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    swap(lettersArray, headIndex, tailIndex);
    lettersArray[headIndex].itemState = ElementStates.Modified;
    lettersArray[tailIndex].itemState = ElementStates.Modified;
    setLettersArray([...lettersArray]);
   
  } 

  
  await new Promise((resolve) => setTimeout(resolve, 1000));
  lettersArray.forEach((item: any) => {
    if (item.itemState === ElementStates.Default) item.itemState = ElementStates.Changing;
    
  })
  setLettersArray([...lettersArray]);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  lettersArray.map((item: any) => {item.itemState = ElementStates.Modified})
  return lettersArray;
};
