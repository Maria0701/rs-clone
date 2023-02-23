import { useState } from 'react'
import { toast } from 'react-toastify';
import { usePrevious } from '../app/hooks';
import { IUpdateData } from '../models/models';
import { SvgElt } from './SvgElt';

interface INputInterface {
    [index: string]: number | undefined;
}

interface IInput {
    text: string,
    input: string,
    current: string | number, 
    changeWeight: (data:IUpdateData) => void
}

const validateInputs = (input:string, value: number) => {
    let mistake;
    switch (input) {
        case 'weight2':
            if (value < 40 || value > 200) {
                mistake = 'The Weight should be higher, then 40 and lower then 150'
            };
            break;
        case 'height':
            if (value < 100 || value > 200) {
                mistake = 'The Height should be higher, then 100 and lower then 200'
            };
            break;
        case 'days':
            if (value < 1 || value > 7) {
                mistake = 'The number of days should be between1 and 7'
            };
            break;        
    }
    return mistake;
}

export default function Input({text, input, current, changeWeight}:IInput) {
    const [inputState, setInputState] = useState(false);
    const [inputValue, setInputValue] = useState(current);
    const prevValue = usePrevious(inputValue as number)

    const inputStateHandler = () => {
        setInputState((prevState) => !prevState);

        if (inputState) {
            const newObj:INputInterface = {};
            newObj[input as keyof IUpdateData] = inputValue as number;
            let mistakes = validateInputs(input, inputValue as number);

            if (!mistakes) {
                changeWeight(newObj)
            } else {
                toast.error(mistakes)
                setInputValue(prevValue as number)
            }
        }
    }

    const changeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(parseInt(e.target.value))
    }

    return (
        <div className="personal-wrapper__row">
            <span>{text}</span>
            <input className='input form__input'
                type="number"
                value={inputValue}
                name={input}
                placeholder='Please enter value'
                onChange={changeHandler}
                disabled={!inputState}
                />
            <button className='btn' onClick={inputStateHandler}>
                <SvgElt width={20} height={20} name={!inputState ? 'pencil' : 'tick'} />
            </button>
        </div>
    )
}
