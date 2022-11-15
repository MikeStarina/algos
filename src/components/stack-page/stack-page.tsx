import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { stackCircleStyle } from "../utils/stack-utils";
import { Stack } from "./stack-class/stack-class";

const stackItem = new Stack<string>()

export const StackPage: React.FC = () => {

  const [ value, setValue ] = useState<string>('');
  const [ stack, setStack ] = useState<string[]>([]);
  const [ modifiedIndex, setModifiedIndex ] = useState<number>(-1);
  


  const addToStackFunc = async (value: string) => {
    stackItem.push(value);
    const newStack = stack;
    newStack.push(value);
    setStack([...newStack]);
    setModifiedIndex(getStackSize(stack) - 1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setModifiedIndex(-1);
  }

  const removeFromStack = async () => {
    stackItem.pop();
    setModifiedIndex(getStackSize(stack) - 1);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setModifiedIndex(-1);
    
    const newStack = stack;
    newStack.pop();
    setStack([...newStack]);
   
  }

  const getStackSize = (stack: string[]) => {
    return stackItem.getSize();
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.currentTarget.value);
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) addToStackFunc(value);
    
    event.currentTarget.reset();
    setValue('');
  }

  const deleteButtonOnClickHandler = () => {
    removeFromStack();
    
  }

  const resetButtonClickHandler = () => {
    setStack([...[]]);
    stackItem.clear();
  }

  return (
    <SolutionLayout title="Стек">
       <form className={styles.input_container} onSubmit={onSubmit}>
        <Input
          maxLength={4}      
          type="text"          
          isLimitText={true}
          autoFocus
          onChange={onChange}
        />
        <Button          
          type="submit"
          text="Добавить"
        />
        <Button          
          type="button"
          text="Удалить"
          onClick={deleteButtonOnClickHandler}
        />
        <div className={styles.button_container}>
          <Button          
            type="button"
            text="Очистить"
            onClick={resetButtonClickHandler}
          />
        </div>
      </form>

      <div className={styles.result_container}>
        {stack &&
            stack.map((item, index) => (
              <Circle
                key={index}
                letter={item}
                index={index}
                head={index === getStackSize(stack) - 1 ? 'top' : ''}
                state={stackCircleStyle(index, modifiedIndex)}
              />
        ))}
      </div>
    </SolutionLayout>
  );
};
