import React, { SyntheticEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './sorting-page.module.css';
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { randomArrFunc } from "../utils/sort-page-utils";
import { columnStyle } from "../utils/sort-page-utils";

type TControlsState = {disabled: {sortingButtons: boolean, arrButton: boolean; radioButtons: boolean }; isLoading: {ascButton: boolean, descButton: boolean; arrButton: boolean}}

const initialControlsState: TControlsState = {
  disabled: {
    sortingButtons: false,
    arrButton: false,
    radioButtons: false,
  },
  isLoading: {
    arrButton: false,
    ascButton: false,
    descButton: false,
  }
}


export const SortingPage: React.FC = () => {

  const [ sortingType, setSortingType] = useState<string>('selectionSort');
  const [ arrayToSort, setArrayToSort ] = useState<number[]>(randomArrFunc());
  const [ loader, setButtonLoader ] = useState<boolean>(false);
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);
  const [controlsState, setControlsState] = useState<TControlsState>(initialControlsState);
  


 

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
    setControlsState(
      {
        disabled: {
          sortingButtons: false,
          arrButton: false,
          radioButtons: false,
        },
        isLoading: {
          arrButton: false,
          ascButton: false,
          descButton: false,
        }
      }
    )
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
    setControlsState(
      {
        disabled: {
          sortingButtons: false,
          arrButton: false,
          radioButtons: false,
        },
        isLoading: {
          arrButton: false,
          ascButton: false,
          descButton: false,
        }
      }
    )
  }






  const radioOnChangeHandler = (event: SyntheticEvent<HTMLInputElement>) => {
    setSortingType(event.currentTarget.value);
  }

  const directionButtonClickHandler = (event: SyntheticEvent<HTMLButtonElement>) => {
    const sortingDirection = event.currentTarget.id;
    setButtonLoader(true);
    setModifiedIndexes([...[]]);
    setControlsState(
      {isLoading: {
        ascButton: sortingDirection === 'Ascending',
        descButton: sortingDirection === 'Descending',
        arrButton: false,
      }, 
      disabled: {sortingButtons: true, arrButton: true, radioButtons: true}})

    if (sortingType === 'selectionSort') {
      selectionSortFunc(sortingDirection);
    } else {
      bubbleSortFunc(sortingDirection);
    }
  }

  const createArrayButtonClickHandler = () => {
    
    setArrayToSort(randomArrFunc());
    setControlsState({...controlsState, disabled: {radioButtons: false, sortingButtons: false, arrButton: false}})
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.controls_container}>
        <div className={styles.controls_wrapper}>
          <RadioInput label='Выбор' name='sortingType' value='selectionSort' onChange={radioOnChangeHandler} checked={sortingType === 'selectionSort'} disabled={controlsState.disabled.radioButtons} />
          <RadioInput label='Пузырёк' name='sortingType' value='bubbleSort' onChange={radioOnChangeHandler} disabled={controlsState.disabled.radioButtons} />
        </div>
        <div className={styles.controls_wrapper}>
          <Button sorting={Direction.Ascending} text='По возрастанию' id='Ascending' onClick={directionButtonClickHandler} isLoader={controlsState.isLoading.ascButton} disabled={controlsState.disabled.sortingButtons} />
          <Button sorting={Direction.Descending} text='По убыванию' id='Descending' onClick={directionButtonClickHandler} isLoader={controlsState.isLoading.descButton} disabled={controlsState.disabled.sortingButtons} />
        </div>
        <Button text='Новый массив' onClick={createArrayButtonClickHandler} isLoader={controlsState.isLoading.arrButton} disabled={controlsState.disabled.arrButton} />  
      </div>




      <div className={styles.result_container}>
        {arrayToSort && arrayToSort.map((item, index) => (
          <Column key={index} index={item} state={columnStyle(index, modifiedIndexes, changingIndexes)} />
        ))}
      </div>

    </SolutionLayout>
  );
};
