import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { stackCircleStyle } from "../utils/stack-utils";
import { Queue } from "./queue-class/queue-class";

const queueItem = new Queue<string>(6);


type TControlsState = {
  disabled: {delBttn: boolean; addBttn: boolean; clearBttn: boolean}
  loading: {delBttn: boolean; addBttn: boolean; clearBttn: boolean}
}




export const QueuePage: React.FC = () => {

  const [ value, setValue ] = useState<string>('');
  const [ queue, setQueue ] = useState<string[]>(['','','','','','']);
  const [ head, setHead ] = useState<number>(-1);
  const [ tail, setTail ] = useState<number>(-1);
  const [ modifiedIndex, setModifiedIndex ] = useState<number>(-1);
  const [controlsState, setControlsState] = useState<TControlsState>({
    disabled: {
      delBttn: true,
      addBttn: true,
      clearBttn: true,
    },
    loading: {delBttn: false, addBttn: false, clearBttn: false}
  })
 

  const enqueue = async (value: string) => {
    queueItem.enqueue(value);
    
   
    if (tail < 5) {
      
      const newTail = tail + 1;
      let newQueue = queue;
      newQueue[newTail] = value;
      if (head === -1) setHead(0);
      setTail(newTail);
      setQueue([...newQueue]);
      
      setModifiedIndex(newTail);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setModifiedIndex(-1);
      
    }
    setControlsState({disabled: {delBttn: false, addBttn: true, clearBttn: false}, loading: {delBttn: false, addBttn: false, clearBttn: false}})
  }

  const dequeue= async () => {
    
    setModifiedIndex(head);
    setControlsState({...controlsState, loading: {delBttn: true, addBttn: false, clearBttn: false}})
    await new Promise(resolve => setTimeout(resolve, 1000));
    setModifiedIndex(-1);
    setControlsState({...controlsState, loading: {delBttn: false, addBttn: false, clearBttn: false}})
    let newQueue = queue;
    newQueue[head] = '';
    if(head !== tail) {
      setHead(head + 1);
    } else {
      setHead(-1)
      setTail(-1)
      setControlsState({...controlsState, disabled: 
        {
          delBttn: true,
          addBttn: true,
          clearBttn: true,
        }})
    }
    
    
    
   
   
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.currentTarget.validity.valid && tail !== 5) {
      setValue(event.currentTarget.value);
      setControlsState({...controlsState, disabled: 
      {
        delBttn: true,
        addBttn: false,
        clearBttn: true,
      }})
    }
    if (!queueItem.isEmpty()) {
      setControlsState({...controlsState, disabled: 
        {
          delBttn: false,
          addBttn: false,
          clearBttn: false,
        }})
    }
   
    
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
   
    event.preventDefault();
    if (value) {
      enqueue(value)
      setControlsState({loading: {addBttn: true, delBttn: false, clearBttn: false}, disabled: 
        {
          delBttn: false,
          addBttn: true,
          clearBttn: false,
        }})
    };
    
    
    setValue('');
  }

  const deleteButtonOnClickHandler = () => {
    dequeue();
    queueItem.dequeue()
  }

  const resetButtonClickHandler = () => {
    queueItem.clear();
    setQueue(['','','','','','']);
    setHead(-1)
    setTail(-1)
    setControlsState({...controlsState, disabled: 
      {
        delBttn: true,
        addBttn: true,
        clearBttn: true,
      }})
  }

  return (
    <SolutionLayout title="Очередь">
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
          />
        </div>
      </form>

      <div className={styles.result_container}>
        {queue.map((item, index) => (
              <Circle
                key={index}
                letter={item}
                index={index}
                head={head === index ? 'head' : ''}
                tail={tail === index ? 'tail': ''}
                state={stackCircleStyle(index, modifiedIndex)}
              />
        ))}
      </div>
    </SolutionLayout>
  );
};
