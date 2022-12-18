import React from "react";
import { selectionSort, bubbleSort } from "../utils/sort-page-utils";



describe('sorting functions correct', async () => {
    it('(Ascending) selection sort function correct', async () => {
        const setArrayToSort = (arr) => {};
        await expect(selectionSort('Ascending', [9,2,1,3], 4, setArrayToSort)).resolves.toEqual([1,2,3,9])
    })

    it('(Descending) selection sort function correct', async () => {
        const setArrayToSort = (arr) => {};
        await expect(selectionSort('Descending', [9,2,1,3], 4, setArrayToSort)).resolves.toEqual([9,3,2,1])
    })

    it('(Ascending) bubble sort function correct', async () => {
        const setArrayToSort = (arr) => {};
        await expect(bubbleSort('Descending', [9,2,1,3], 4, setArrayToSort)).resolves.toEqual([9,3,2,1])
    })
    
    it('(Descending) bubble sort function correct', async () => {
        const setArrayToSort = (arr) => {};
        await expect(bubbleSort('Descending', [9,2,1,3], 4, setArrayToSort)).resolves.toEqual([9,3,2,1])
    })
})
