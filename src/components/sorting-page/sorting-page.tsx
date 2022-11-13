import React, { SyntheticEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { randomArrFunc } from "../utils/sort-page-utils";
import { columnStyle } from "../utils/sort-page-utils";


export const SortingPage: React.FC = () => {

  const [ sortingType, setSortingType] = useState<string>('selectionSort');
  //const [ sortingDirection, setSortingDirection ] = useState<string>('');
  const [ arrayToSort, setArrayToSort ] = useState<number[]>([]);
  const [ loader, setButtonLoader ] = useState<boolean>(false);
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);
  //console.log(changingIndexes);
  //console.log(modifiedIndexes);

 

  const selectionSortFunc = async (sortingDirection: string) => {
    const newArr = arrayToSort;
    const { length } = newArr;
    for (let i = 0; i < length - 1; i++) {
      let maxInd = i;
      for (let t = i + 1; t < length; t++) {
        setChangingIndexes([maxInd, t]);
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
        //setModifiedIndexes(indexArr);
        setChangingIndexes([]);
        const newModIndexesArr = modifiedIndexes;
        newModIndexesArr.push(t)
        setModifiedIndexes(newModIndexesArr);
        
      }
      const newModIndexesArr = modifiedIndexes;
      newModIndexesArr.push(maxInd)
      setModifiedIndexes(newModIndexesArr);
      
      setChangingIndexes([]);
    }
    
    
    setArrayToSort([...newArr]);
    setButtonLoader(false);
  }





  const bubbleSortFunc = async (sortingDirection: string) => {
    const newArr = arrayToSort;
    setModifiedIndexes([]);
    for (let t = newArr.length - 1; t > 0; t--) {
      
      for (let i = 0; i < t; i++) {
        setChangingIndexes([t, i]);
        await new Promise((resolve) => setTimeout(resolve, 500));
        if (sortingDirection === 'Ascending' && newArr[i] > newArr[i + 1]) {
          let temp = newArr[i];
          newArr[i] = newArr[i + 1];
          newArr[i + 1] = temp;
          setChangingIndexes([t, i + 1]);
        } 
        if (sortingDirection === 'Descending' && newArr[i] < newArr[i + 1]) {
          let temp = newArr[i];
          newArr[i] = newArr[i + 1];
          newArr[i + 1] = temp;
          setChangingIndexes([t, i + 1]);
        }
        setChangingIndexes([]);
        setArrayToSort([...newArr])
        const newModIndexesArr = modifiedIndexes;
        newModIndexesArr.push(t)
        setModifiedIndexes(newModIndexesArr);
      }
      setChangingIndexes([]);
      setArrayToSort([...newArr])
      const newModIndexesArr = modifiedIndexes;
      newModIndexesArr.push(t)
      setModifiedIndexes(newModIndexesArr);
    }
    setArrayToSort([...newArr])
    setButtonLoader(false);
  }






  const radioOnChangeHandler = (event: SyntheticEvent<HTMLInputElement>) => {
    setSortingType(event.currentTarget.value);
  }

  const directionButtonClickHandler = (event: SyntheticEvent<HTMLButtonElement>) => {
    //setSortingDirection(event.currentTarget.id);
    const sortingDirection = event.currentTarget.id;
    setButtonLoader(true);
    setModifiedIndexes([...[]]);

    if (sortingType === 'selectionSort') {
      selectionSortFunc(sortingDirection);
    } else {
      bubbleSortFunc(sortingDirection);
    }
  }

  const createArrayButtonClickHandler = () => {
      
    setArrayToSort(randomArrFunc());
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls_container}>
        <div className={styles.controls_wrapper}>
          <RadioInput label='Выбор' name='sortingType' value='selectionSort' onChange={radioOnChangeHandler} checked={sortingType === 'selectionSort'} />
          <RadioInput label='Пузырёк' name='sortingType' value='bubbleSort' onChange={radioOnChangeHandler} />
        </div>
        <div className={styles.controls_wrapper}>
          <Button sorting={Direction.Ascending} text='По возрастанию' id='Ascending' onClick={directionButtonClickHandler} isLoader={loader} />
          <Button sorting={Direction.Descending} text='По убыванию' id='Descending' onClick={directionButtonClickHandler} isLoader={loader} />
        </div>
        <Button text='Новый массив' onClick={createArrayButtonClickHandler} isLoader={loader}/>  
      </div>




      <div className={styles.result_container}>
        {arrayToSort && arrayToSort.map((item, index) => (
          <Column key={index} index={item} state={columnStyle(index, modifiedIndexes, changingIndexes)} />
        ))}
      </div>

    </SolutionLayout>
  );
};
