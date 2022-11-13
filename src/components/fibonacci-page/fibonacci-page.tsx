import React, { FormEvent, SetStateAction, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from './fibonacci-page.module.css';

export const FibonacciPage: React.FC = () => {

  const [ value, setValue ] = useState<string>('');
  const [ result, setResult ] = useState<number[]>([]);
  const [ loader, setButtonLoader ] = useState<boolean>(false);

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    setValue(event.currentTarget.value);
  }

  const resultFunc = async (arr: number[]) => {
  
      await new Promise(resolve => setTimeout(resolve, 1000));

    for (let i = 0; i <= parseInt(value); i++) {

      await new Promise(resolve => setTimeout(resolve, 1000));
      if (i === 1 || i === 0) {
        arr.push(1);
      } else {
        const arrValue: number = arr[i - 2] + arr[i - 1];
        arr.push(arrValue);
      }

      setResult([...arr]);

    }

    setButtonLoader(false);
  
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setButtonLoader(true)

    let arr: number[] = [];
    resultFunc(arr);
   
   
    

  }


  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.input_container} onSubmit={onSubmit}>
        <Input
          max={19}
          height={60}
          type="number"
          placeholder="Введите число"
          isLimitText={true}
          onChange={onChange}
          autoFocus
        />
        <Button
          height={60}
          type="submit"
          text="Рассчитать"
          isLoader={loader}
        />
      </form>

      <div className={styles.result_container}>
        {result &&
          result.map((item, index) => (
            <Circle
              key={index}
              letter={item.toString()}
              index={index}
            />
          ))}
      </div>
     
    </SolutionLayout>
  );
};
