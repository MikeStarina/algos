import React, { FormEvent, FormEventHandler, SyntheticEvent } from "react";
import { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { circleStyle } from "../utils/string-utils";
import { swap } from "../utils/string-utils";
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [lettersArray, setLettersArray] = useState<string[]>([]);
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);
  const [controlsState, setControlsState] = useState<{disabled: boolean; isLoading: boolean}>({
    disabled: true,
    isLoading: false,
  })

  const onChange = (event: FormEvent<HTMLInputElement>) => {

    event.preventDefault();
    
    if (event.currentTarget.validity.valid) {
      setControlsState({...controlsState, disabled: false});
      setInputValue(event.currentTarget.value);
      setModifiedIndexes([]);
      const arrayFromValue = event.currentTarget.value.split("");
      setLettersArray(arrayFromValue);
    }
   
  };

  const reverse = async (arr: string[]) => {
    setControlsState({ disabled: true, isLoading: true })
    await new Promise((resolve) => setTimeout(resolve, 1000));

    for (let i = 0; i <= Math.floor(lettersArray.length / 2); i++) {
      const headIndex = i;
      const tailIndex = lettersArray.length - 1 - i;
      setChangingIndexes([headIndex, tailIndex]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      swap(lettersArray, headIndex, tailIndex);
      setChangingIndexes([]);
      const updatedIndexes = modifiedIndexes;
      updatedIndexes.push(headIndex, tailIndex);
      setModifiedIndexes([...updatedIndexes]);
    }

    setLettersArray([...lettersArray]);
    setControlsState({ disabled: true, isLoading: false })
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputValue('');
    reverse(lettersArray);
    
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
              letter={item}
              state={circleStyle(index, modifiedIndexes, changingIndexes)}
            />
          ))}
      </div>
    </SolutionLayout>
  );
};
