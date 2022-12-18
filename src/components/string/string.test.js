import React from "react";
import { render, getByTestId, fireEvent } from '@testing-library/react';
import { reverseFunc } from "../utils/string-utils";
import { StringComponent } from "./string";
import { ElementStates } from "../../types/element-states";


const oddArr = [
    {
        value: 'A',
        itemState: ElementStates.Default,
    },
    {
        value: 'B',
        itemState: ElementStates.Default,
    },
    {
        value: 'C',
        itemState: ElementStates.Default,
    }
];

const resultOddArr = [
    {
        value: 'C',
        itemState: ElementStates.Modified,
    },
    {
        value: 'B',
        itemState: ElementStates.Modified,
    },
    {
        value: 'A',
        itemState: ElementStates.Modified,
    }
]

const evenArr = [
    {
        value: 'A',
        itemState: ElementStates.Default,
    },
    {
        value: 'B',
        itemState: ElementStates.Default,
    },
];

const resultEvenArr = [

    {
        value: 'B',
        itemState: ElementStates.Modified,
    },
    {
        value: 'A',
        itemState: ElementStates.Modified,
    }
]


jest.setTimeout(10000);
describe('string revers correct', async () => {
    
    

    it('(even) string revers correct', async () => {
        
        const setLettersArray = (arr) => {}; 
        await expect(reverseFunc(evenArr, setLettersArray)).resolves.toEqual(resultEvenArr);
    });

    it('(odd) string revers correct', async () => {
        const setLettersArray = (arr) => {}; 
        await expect(reverseFunc(oddArr, setLettersArray)).resolves.toEqual(resultOddArr);
    });

    it('single letter string revers correct', async () => {
        const setLettersArray = (arr) => {}; 
        await expect(reverseFunc([{value: 'A', itemState: ElementStates.Default}], setLettersArray)).resolves.toEqual([{value: 'A', itemState: ElementStates.Modified}])
    });
})