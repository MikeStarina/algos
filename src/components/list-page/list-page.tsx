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

type TControlsState = {
 
    addHead: { isLoading: boolean; disabled: boolean };
    addTail: { isLoading: boolean; disabled: boolean };
    delHead: { isLoading: boolean; disabled: boolean };
    delTail: { isLoading: boolean; disabled: boolean };
    addIndex: { isLoading: boolean; disabled: boolean };
    delIndex: { isLoading: boolean; disabled: boolean };
  
}

const initialControlState: TControlsState = {
  addHead: { isLoading: false, disabled: true},
  addTail: {isLoading: false, disabled: true},
  delHead: {isLoading: false, disabled: false},
  delTail: {isLoading: false, disabled: false},
  addIndex: {isLoading: false, disabled: true},
  delIndex: {isLoading: false, disabled: true},
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
  const [ index, setIndex ] = useState<string>('');
  const [ displayedList, setDisplayedList] = useState<IListArr[]>(initialDisplayedList);
  const [ controlsState, setControlsState ] = useState<TControlsState>(initialControlState)

  
  

  const valueInputOnChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity.valid) {
      setValue(event.currentTarget.value);
      setControlsState({
        ...controlsState, 
        addHead: {isLoading: false, disabled: false},
        addTail: {isLoading: false, disabled: false},

      })
    }
    
  };

  const indexInputOnChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    
    if (event.currentTarget.validity.valid) {
      setIndex(event.currentTarget.value)
      setControlsState({
        ...controlsState, 
        addIndex: {isLoading: false, disabled: false},
        delIndex: {isLoading: false, disabled: false},
      })
    }
  }


  const addToHeadClickHandler = async () => { //done
    if (value) list.prepend(value);
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
    setControlsState({
      ...controlsState, 
      addHead: {isLoading: true, disabled: true},
      addTail: {isLoading: false, disabled: true},

    })
    await new Promise(resolve => setTimeout(resolve, 1000));

    newDisplayedList[0] = {
      value: value,
      state: ElementStates.Default,
      shiftElement: null
    }
    setDisplayedList([...newDisplayedList]);
    setControlsState({
      ...controlsState, 
      addHead: {isLoading: false, disabled: true},
      addTail: {isLoading: false, disabled: true},

    })
    setValue('');
    setIndex('');
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
    setControlsState({
      ...controlsState, 
      addHead: {isLoading: false, disabled: true},
      addTail: {isLoading: true, disabled: true},

    })
    await new Promise(resolve => setTimeout(resolve, 1000));

    
    newDisplayedList[newDisplayedList.length - 1] = {
      value: value,
      state: ElementStates.Default,
      shiftElement: null
    }
    setControlsState({
      ...controlsState, 
      addHead: {isLoading: false, disabled: true},
      addTail: {isLoading: false, disabled: true},

    })
    setDisplayedList([...newDisplayedList]);
    setValue('');
    setIndex('');
  }




  const deleteHeadButtonClickHandler = async () => {  //done
    list.deleteHead();
    setControlsState({
      ...controlsState, 
      delHead: {isLoading: true, disabled: true},
      delTail: {isLoading: false, disabled: true},
      delIndex: {isLoading: false, disabled: true}
    })
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
    setControlsState({...controlsState, delHead: {isLoading: false, disabled: false}})
    if (newDisplayedList.length === 0) {
      setControlsState({
        ...controlsState, 
        delHead: {isLoading: false, disabled: true},
        delTail: {isLoading: false, disabled: true},
        delIndex: {isLoading: false, disabled: true}
      })
    }
  }

  const deleteTailButtonClickHandler = async () => { //done
    list.deleteTail();
    setControlsState({
      ...controlsState, 
      delHead: {isLoading: false, disabled: false},
      delTail: {isLoading: true, disabled: false},
      delIndex: {isLoading: false, disabled: false}
    })
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
    setControlsState({...controlsState, delTail: {isLoading: false, disabled: false}})
    if (newDisplayedList.length === 0) {
      setControlsState({
        ...controlsState, 
        delHead: {isLoading: false, disabled: true},
        delTail: {isLoading: false, disabled: true},
        delIndex: {isLoading: false, disabled: true}
      })
    }
  }


  const addByIndexButtonClickHandler = async () => {
    setControlsState({...controlsState, addIndex: {isLoading: true, disabled: false}})
    if (value && parseInt(index) && parseInt(index) < displayedList.length) {
      list.addByIndex(value, parseInt(index));
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
      newDisplayedList.splice(parseInt(index), 0, newElement);         
      setDisplayedList([...newDisplayedList]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      newDisplayedList[parseInt(index)] = {
        value: value,
        state: ElementStates.Default,
        shiftElement: null,
      }
      setDisplayedList([...newDisplayedList]);
      
      
    }
    setControlsState({...controlsState, addIndex: {isLoading: false, disabled: true}, delIndex: {isLoading: false, disabled: true}})
    setValue('');
      setIndex('');
  }

  const deleteByIndexButtonClickHandler = async () => {
    setControlsState({...controlsState, addIndex: {isLoading: false, disabled: true}, delIndex: {isLoading: true, disabled: true}})
    if (index) {
      list.deleteByIndex(parseInt(index));
      const newDisplayedList = displayedList;
      newDisplayedList[parseInt(index)].shiftElement = {
          value: newDisplayedList[parseInt(index)].value,
          state: ElementStates.Changing,
          position: 'removeAction',
      }
      newDisplayedList[parseInt(index)] = {
        ...newDisplayedList[parseInt(index)],
        value: '',
        state: ElementStates.Changing
      }
      setDisplayedList([...newDisplayedList]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      newDisplayedList.splice(parseInt(index), 1);
      setDisplayedList([...newDisplayedList]);
      
      if (newDisplayedList.length === 0) {
        setControlsState({
          ...controlsState, 
          delHead: {isLoading: false, disabled: true},
          delTail: {isLoading: false, disabled: true},
          delIndex: {isLoading: false, disabled: true}
        })
      }
    }
    setControlsState({...controlsState, addIndex: {isLoading: false, disabled: true}, delIndex: {isLoading: false, disabled: true}})
    setValue('');
    setIndex('');
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
               
                placeholder="введите значение"
                onChange={valueInputOnChangeHandler}
                value={value}
                
              />
            </div>
            <Button          
              type="button"
              text="Добавить в head"
              onClick={addToHeadClickHandler}
              linkedList={'small'}
              isLoader={controlsState.addHead.isLoading}
              disabled={controlsState.addHead.disabled}
            />
            <Button          
              type="button"
              text="Добавить в tail"
              onClick={addToTailClickHandler}
              linkedList={'small'}
              isLoader={controlsState.addTail.isLoading}
              disabled={controlsState.addTail.disabled}
            />
      
            <Button          
                type="button"
                text="Удалить из head"
                onClick={deleteHeadButtonClickHandler}
                linkedList={'small'}
                isLoader={controlsState.delHead.isLoading}
                disabled={controlsState.delHead.disabled}
            />
            <Button          
                type="button"
                text="Удалить из tail"
                onClick={deleteTailButtonClickHandler}
                linkedList={'small'}
                isLoader={controlsState.delTail.isLoading}
                disabled={controlsState.delTail.disabled}
            />
        </fieldset>
        <fieldset className={styles.fieldset}>
            <div className={styles.input_container}>
              <Input   
                type="text"          
                placeholder='введите индекс'
                onChange={indexInputOnChangeHandler}
                value={index}
              />
            </div>
            <Button          
              type="button"
              text="Добавить по индексу"
              onClick={addByIndexButtonClickHandler}
              linkedList={'big'}
              isLoader={controlsState.addIndex.isLoading}
              disabled={controlsState.addIndex.disabled}
            />
            <Button          
              type="button"
              text="Удалить по индексу"
              onClick={deleteByIndexButtonClickHandler}
              linkedList={'big'}
              isLoader={controlsState.delIndex.isLoading}
              disabled={controlsState.delIndex.disabled}
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
