import React, { useState, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './list-page.module.css';
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { LinkedList } from './linked-list-class/linked-list-class';
import { Button } from "../ui/button/button";
import { ElementStates } from "../../types/element-states";


interface IListArr {
	value: string,
	state: ElementStates
	shiftElement: IShiftElement | null;
}

interface IShiftElement {
	value: string;
	state: ElementStates;
	position: 'addAction' | 'removeAction';
}

export const initialArr = ['0', '34', '8', '1'];
export const initialDisplayedList: IListArr[] = initialArr.map((item) => ({
	value: item,
	state: ElementStates.Default,
	shiftElement: null
}))

const list = new LinkedList<string>(initialArr);



export const ListPage: React.FC = () => {


  const [ value, setValue] = useState<string>('');
  const [ index, setIndex ] = useState<number>();
  
  console.log(list);
  const [ displayedList, setDisplayedList] = useState<IListArr[]>(initialDisplayedList);

  
  

  const valueInputOnChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  const indexInputOnChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    const inputValue = parseInt(event.currentTarget.value);
    if (inputValue) {setIndex(inputValue)}
  }


  const addToHeadClickHandler = async () => { //done
    if (value) list.prepend(value);
    console.log(list);
    let newDisplayedList = displayedList;
    newDisplayedList.unshift({
      value: '',
      state: ElementStates.Changing,
      shiftElement: {
        value: value,
        state: ElementStates.Changing,
        position: 'addAction',
      }
    })
    setDisplayedList([...newDisplayedList]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    newDisplayedList[0] = {
      value: value,
      state: ElementStates.Default,
      shiftElement: null
    }
    setDisplayedList([...newDisplayedList]);
  }

  const addToTailClickHandler = async () => { //done
    if (value) list.append(value);
    console.log(list);
    let newDisplayedList = displayedList;
    newDisplayedList.push({
      value: '',
      state: ElementStates.Changing,
      shiftElement: {
        value: value,
        state: ElementStates.Changing,
        position: 'addAction',
      }
    })
    setDisplayedList([...newDisplayedList]);
    await new Promise(resolve => setTimeout(resolve, 1000));

    
    newDisplayedList[newDisplayedList.length - 1] = {
      value: value,
      state: ElementStates.Default,
      shiftElement: null
    }
    setDisplayedList([...newDisplayedList]);
  }




  const deleteHeadButtonClickHandler = async () => {  //done
    list.deleteHead();
    const newDisplayedList = displayedList;
    newDisplayedList[0].shiftElement = {
      value: newDisplayedList[0].value,
      state: ElementStates.Changing,
      position: 'removeAction',
    }
    newDisplayedList[0].value = '';
    setDisplayedList([...newDisplayedList]);
    await new Promise(resolve => setTimeout(resolve, 1000));
    newDisplayedList.shift();
    setDisplayedList([...newDisplayedList]);
  }

  const deleteTailButtonClickHandler = async () => { //done
    list.deleteTail();
    const newDisplayedList = displayedList;
    const deleteIndex =  newDisplayedList.length - 1;
    newDisplayedList[deleteIndex].shiftElement = {
      value: newDisplayedList[deleteIndex].value,
      state: ElementStates.Changing,
      position: 'removeAction',
    }
    newDisplayedList[deleteIndex].value = '';
    setDisplayedList([...newDisplayedList]);
    await new Promise(resolve => setTimeout(resolve, 1000));
    newDisplayedList.pop();
    setDisplayedList([...newDisplayedList]);
  }


  const addByIndexButtonClickHandler = async () => {
    if (value && index) {
      list.addByIndex(value, index);
      const newDisplayedList = displayedList;
      const newElement: IListArr = {
        value: '', 
        state: ElementStates.Changing, 
        shiftElement: {
          value: value,
          state: ElementStates.Changing,
          position: 'addAction',
        }
      }
      newDisplayedList.splice(index, 0, newElement);         
      setDisplayedList([...newDisplayedList]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      newDisplayedList[index] = {
        value: value,
        state: ElementStates.Default,
        shiftElement: null,
      }
      setDisplayedList([...newDisplayedList]);
    }
  }

  const deleteByIndexButtonClickHandler = async () => {
    if (index) {
      list.deleteByIndex(index);
      const newDisplayedList = displayedList;
      newDisplayedList[index].shiftElement = {
          value: newDisplayedList[index].value,
          state: ElementStates.Changing,
          position: 'removeAction',
      }
      newDisplayedList[index] = {
        ...newDisplayedList[index],
        value: '',
        state: ElementStates.Changing
      }
      setDisplayedList([...newDisplayedList]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      newDisplayedList.splice(index, 1);
      setDisplayedList([...newDisplayedList]);
    }
  }


  return (
    <SolutionLayout title="Связный список">
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <div className={styles.input_container}>
            
              <Input
                maxLength={4}      
                type="text"          
                isLimitText={true}
                autoFocus
                placeholder="введите значение"
                onChange={valueInputOnChangeHandler}
              />
            </div>
            <Button          
              type="button"
              text="Добавить в head"
              onClick={addToHeadClickHandler}
              linkedList={'small'}
            />
            <Button          
              type="button"
              text="Добавить в tail"
              onClick={addToTailClickHandler}
              linkedList={'small'}
            />
      
            <Button          
                type="button"
                text="Удалить из head"
                onClick={deleteHeadButtonClickHandler}
                linkedList={'small'}
            />
            <Button          
                type="button"
                text="Удалить из tail"
                onClick={deleteTailButtonClickHandler}
                linkedList={'small'}
            />
        </fieldset>
        <fieldset className={styles.fieldset}>
            <div className={styles.input_container}>
              <Input   
                type="text"          
                placeholder='введите индекс'
                onChange={indexInputOnChangeHandler}
              />
            </div>
            <Button          
              type="button"
              text="Добавить по индексу"
              onClick={addByIndexButtonClickHandler}
              linkedList={'big'}
            />
            <Button          
              type="button"
              text="Удалить по индексу"
              onClick={deleteByIndexButtonClickHandler}
              linkedList={'big'}
            />
        </fieldset>
      </form>
      <div className={styles.result_container}>
        {displayedList.map((item, index) => (
              <Circle
                key={index}
                letter={item.value}
                index={index}
                head={item.shiftElement && item.shiftElement.position === 'addAction' ? (
                  <Circle isSmall letter={item.shiftElement.value} state={item.shiftElement.state} />
                  ) : index === 0 ? 'head' : ''}
                tail={item.shiftElement && item.shiftElement.position === 'removeAction'? (<Circle isSmall letter={item.shiftElement.value} state={item.shiftElement.state} />) 
                : index === displayedList.length - 1 ? 'tail' : ''}
                state={item.state}
              />
        ))}
      </div>

    </SolutionLayout>
  );
};
