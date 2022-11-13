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
  const [lettersArray, setLettersArray] = useState<string[]>([]);
  const [isLoading, setButtonLoader] = useState<boolean>(false);
  const [modifiedIndexes, setModifiedIndexes] = useState<number[]>([]);
  const [changingIndexes, setChangingIndexes] = useState<number[]>([]);

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setModifiedIndexes([]);
    const arrayFromValue = event.currentTarget.value.split("");
    setLettersArray(arrayFromValue);
  };

  const reverse = async (arr: string[]) => {
    setButtonLoader(true);
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
    setButtonLoader(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    reverse(lettersArray);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.input_container} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          height={60}
          type="text"
          onChange={onChange}
          isLimitText={true}
          autoFocus
        />
        <Button
          height={60}
          type="submit"
          text="Развернуть"
          isLoader={isLoading}
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
