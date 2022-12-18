import React from "react";
import { Circle } from "./circle.tsx";
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { parseConfigFileTextToJson } from "typescript";
import { ElementStates } from "../../../types/element-states";




describe('Circle component render correct', () => {


    it('Plain Circle render correct', () => {
        const circle = TestRenderer
        .create(<Circle />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Circle w letter render correct', () => {
        const circle = TestRenderer
        .create(<Circle letter={'A'} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Circle w react-elm head prop render correct', () => {
        const circle = TestRenderer
        .create(<Circle head={<Circle />} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Circle w tail prop render correct', () => {
        const circle = TestRenderer
        .create(<Circle tail={'tail'} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Circle w react-elm tail prop render correct', () => {
        const circle = TestRenderer
        .create(<Circle tail={<Circle />} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Circle w react-elm tail prop render correct', () => {
        const circle = TestRenderer
        .create(<Circle tail={<Circle />} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Circle w index prop render correct', () => {
        const circle = TestRenderer
        .create(<Circle index={0} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Small circle render correct', () => {
        const circle = TestRenderer
        .create(<Circle isSmall={true} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Default state Circle render correct', () => {
        const circle = TestRenderer
        .create(<Circle state={ElementStates.Default} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Changing state Circle render correct', () => {
        const circle = TestRenderer
        .create(<Circle state={ElementStates.Changing} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

    it('Modified state Circle render correct', () => {
        const circle = TestRenderer
        .create(<Circle state={ElementStates.Modified} />)
        .toJSON();

        expect(circle).toMatchSnapshot();
    })

})