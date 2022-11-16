import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './stack-page.module.css';
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { stackCircleStyle } from "../utils/stack-utils";
import { Stack } from "./stack-class/stack-class";

const stackItem = new Stack<string>()

type TControlsState = {
  disabled: {delBttn: boolean; addBttn: boolean; clearBttn: boolean}
  loading: {delBttn: boolean; addBttn: boolean; clearBttn: boolean}
}

export const StackPage: React.FC = () => {

  const [ value, setValue ] = useState<string>('');
  const [ stack, setStack ] = useState<string[]>([]);
  const [ modifiedIndex, setModifiedIndex ] = useState<number>(-1);
  const [ controlsState, setControlsState ] = useState<TControlsState>({
    disabled: {
      delBttn: true,
      addBttn: true,
      clearBttn: true,
    },
    loading: {delBttn: false, addBttn: false, clearBttn: false}
    
  })

  


  const addToStackFunc = async (value: string) => {
    stackItem.push(value);
    const newStack = stack;
    newStack.push(value);
    setStack([...newStack]);
    setControlsState({loading: {addBttn: true, clearBttn: false, delBttn: false}, disabled: {addBttn: true, delBttn: false, clearBttn: false}})
    setModifiedIndex(getStackSize(stack) - 1);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setModifiedIndex(-1);
    setControlsState({loading: {addBttn: false, clearBttn: false, delBttn: false}, disabled: {addBttn: true, delBttn: false, clearBttn: false}})
  }

  const removeFromStack = async () => {
    stackItem.pop();
    setModifiedIndex(stack.length - 1);
    setControlsState({...controlsState, loading: {addBttn: false, clearBttn: false, delBttn: true}})
    await new Promise(resolve => setTimeout(resolve, 1000));
    setModifiedIndex(-1);
    
    const newStack = stack;
    newStack.pop();
    setStack([...newStack]);
    setControlsState({...controlsState, loading: {addBttn: false, clearBttn: false, delBttn: false}})
  }

  const getStackSize = (stack: string[]) => {
    return stackItem.getSize();
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.validity.valid) {
      setValue(event.currentTarget.value);
      setControlsState({...controlsState, disabled: {addBttn: false, delBttn: true, clearBttn: true}})
    }
    if (stack.length > 0) {
      setControlsState({...controlsState, disabled: {addBttn: false, delBttn: false, clearBttn: false}})
    }
    
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (value) addToStackFunc(value);
    
    setValue('');
    
  }

  const deleteButtonOnClickHandler = () => {

    stackItem.pop();
    removeFromStack();
   
    if (stack.length === 0) {
      setControlsState({...controlsState, disabled: {addBttn: true, delBttn: true, clearBttn: true}})
    }
    
  }

  const resetButtonClickHandler = () => {
    setStack([...[]]);
    stackItem.clear();
    setControlsState({...controlsState, disabled: {addBttn: true, delBttn: true, clearBttn: true}})
    setValue('');
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
          value={value}
        />
        <Button          
          type="submit"
          text="Добавить"
          disabled={controlsState.disabled.addBttn}
          isLoader={controlsState.loading.addBttn}
        />
        <Button          
          type="button"
          text="Удалить"
          onClick={deleteButtonOnClickHandler}
          disabled={controlsState.disabled.delBttn}
          isLoader={controlsState.loading.delBttn}
        />
        <div className={styles.button_container}>
          <Button          
            type="button"
            text="Очистить"
            onClick={resetButtonClickHandler}
            disabled={controlsState.disabled.clearBttn}
            isLoader={controlsState.loading.clearBttn}
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
                head={index === stack.length - 1 ? 'top' : ''}
                state={stackCircleStyle(index, modifiedIndex)}
              />
        ))}
      </div>
    </SolutionLayout>
  );
};
