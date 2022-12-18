import React, { FormEvent, FormEventHandler, SyntheticEvent } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { reverseFunc } from "../utils/string-utils";
import { ElementStates } from '../../types/element-states';
import { TLettersArray } from "../../types/string";
import styles from "./string.module.css";




export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [lettersArray, setLettersArray] = useState<TLettersArray[] | undefined>([]);
  const [controlsState, setControlsState] = useState<{disabled: boolean; isLoading: boolean}>({
    disabled: true,
    isLoading: false,
  })

  const onChange = (event: FormEvent<HTMLInputElement>) => {

    event.preventDefault();
    
    if (event.currentTarget.validity.valid) {
      setControlsState({...controlsState, disabled: false});
      setInputValue(event.currentTarget.value);
      const arrayFromValue: Array<TLettersArray> = event.currentTarget.value.split("")
      .map((item) => {
       
        const newItem = {
          value: item,
          itemState: ElementStates.Default,
        }

        return newItem;
      });
 
      setLettersArray(arrayFromValue);
    }
   
  };



  

  const reverse = async (lettersArray: TLettersArray[]) => {
    setControlsState({ disabled: true, isLoading: true })
    
    const newArr = await reverseFunc(lettersArray, setLettersArray);
    
    setLettersArray([...newArr]);    
    setControlsState({ disabled: true, isLoading: false })
  }; 

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputValue('');
    if (lettersArray) {
      reverse(lettersArray);
    }
   
    
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.input_container} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          value={inputValue}
          type="text"
          onChange={onChange}
          isLimitText={true}
          autoFocus
        />
        <Button
          disabled={controlsState.disabled}
          type="submit"
          text="Развернуть"
          isLoader={controlsState.isLoading}

        />
      </form>

      <div className={styles.result_container}>
        {lettersArray &&
          lettersArray.map((item, index) => (
            <Circle
              key={index}
              letter={item.value}
              state={item.itemState}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
