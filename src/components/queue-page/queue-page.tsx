import React, { FormEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css';
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { stackCircleStyle } from "../utils/stack-utils";



export const QueuePage: React.FC = () => {

  const [ value, setValue ] = useState<string>('');
  const [ queue, setQueue ] = useState<string[]>(['','','','','','']);
  const [ head, setHead ] = useState<number>(-1);
  const [ tail, setTail ] = useState<number>(-1);
  const [ modifiedIndex, setModifiedIndex ] = useState<number>(-1);


  const enqueue = async (value: string) => {

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
  }

  const dequeue= async () => {

    setModifiedIndex(head);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setModifiedIndex(-1);

    let newQueue = queue;
    newQueue[head] = '';
    if(head !== tail) {
      setHead(head + 1);
    } else {
      setHead(-1)
      setTail(-1)
    }
    
    
    
   
   
  }

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.currentTarget.value);
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value) enqueue(value);
    
    event.currentTarget.reset();
    setValue('');
  }

  const deleteButtonOnClickHandler = () => {
    dequeue();
  }

  const resetButtonClickHandler = () => {
    setQueue(['','','','','','']);
    setHead(-1)
    setTail(-1)
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
