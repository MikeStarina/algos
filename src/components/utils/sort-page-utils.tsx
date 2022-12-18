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


  export const selectionSort = async (sortingDirection: string, newArr: number[], length: number, setArrayToSort: any) => {
    for (let i = 0; i < length - 1; i++) {
        let maxInd = i;
        for (let t = i + 1; t < length; t++) {
         
          await new Promise((resolve) => setTimeout(resolve, 500));
          if (sortingDirection === 'Descending' && newArr[t] > newArr[maxInd]) {
            const temp = newArr[t];
            newArr[t] = newArr[maxInd];
            newArr[maxInd] = temp;
            setArrayToSort([...newArr]);
          } else if (sortingDirection === 'Ascending' && newArr[t] < newArr[maxInd]) {
            const temp = newArr[t];
            newArr[t] = newArr[maxInd];
            newArr[maxInd] = temp;
            setArrayToSort([...newArr]);
          }
         
          setArrayToSort([...newArr]);
         
        
          
        }
      
      }

      return newArr;
  }


  export const bubbleSort = async (sortingDirection: string, newArr: number[], length: number, setArrayToSort: any) => {
    for (let t = newArr.length - 1; t > 0; t--) {
      
        for (let i = 0; i < t; i++) {
        
          await new Promise((resolve) => setTimeout(resolve, 500));
          if (sortingDirection === 'Ascending' && newArr[i] > newArr[i + 1]) {
            let temp = newArr[i];
            newArr[i] = newArr[i + 1];
            newArr[i + 1] = temp;
           
          } 
          if (sortingDirection === 'Descending' && newArr[i] < newArr[i + 1]) {
            let temp = newArr[i];
            newArr[i] = newArr[i + 1];
            newArr[i + 1] = temp;
           
          }
         
          setArrayToSort([...newArr])
         
        }
       
        setArrayToSort([...newArr])
       
      } 
    return newArr;
  }