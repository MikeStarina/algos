import React from "react";
import TestRenderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button.tsx';
import { Direction } from "../../../types/direction";



describe('Button render correct', () => {


        it('Plain button render correct', () => {
            const button = TestRenderer
            .create(<Button />)
            .toJSON();
            expect(button).toMatchSnapshot();
        }); 


        it('Button with text render correct', () => {
            const button = TestRenderer
            .create(<Button text='Текст' />)
            .toJSON();
            expect(button).toMatchSnapshot();
        }); 


        it('Disbaled button render correct', () => {
            const button = TestRenderer
            .create(<Button disabled />)
            .toJSON();
            expect(button).toMatchSnapshot();
        });

        it('Ascending button render correct', () => {
            const button = TestRenderer
            .create(<Button sorting={Direction.Ascending} />)
            .toJSON();
            expect(button).toMatchSnapshot();
        }); 

        it('Descending button render correct', () => {
            const button = TestRenderer
            .create(<Button sorting={Direction.Descending} />)
            .toJSON();
            expect(button).toMatchSnapshot();
        }); 

        it('Big button render correct', () => {
            const button = TestRenderer
            .create(<Button linkedList='big' />)
            .toJSON();
            expect(button).toMatchSnapshot();
        }); 

        it('Small button render correct', () => {
            const button = TestRenderer
            .create(<Button linkedList='small' />)
            .toJSON();
            expect(button).toMatchSnapshot();
        }); 

        it('Button w callback render correct', () => {
            window.alert = jest.fn();
    
            render(<Button text='Вызов колбека' onClick={() => { alert('Успешный вызов колбека') }} />)
    
            const button = screen.getByText("Вызов колбека");
            fireEvent.click(button);
    
            expect(window.alert).toHaveBeenCalledWith('Успешный вызов колбека');
        });

})