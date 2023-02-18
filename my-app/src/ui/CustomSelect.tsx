import React, { useEffect, useState, useRef } from 'react'
import { useOnClickOutside } from '../app/hooks';
import './customSelect.css';
interface IOptions {
    options: string[],
    switchItem: (value: string) => void,
    text: string,
}

export default function CustomSelect({options, switchItem, text}:IOptions) {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const ref = useRef(null);

    useOnClickOutside(ref, () => setIsOptionOpen(false));

    const toggleOptions = () => {
        setIsOptionOpen(!isOptionOpen);
    };

    const linkClickHandler = (ind:number) => {       
        setSelectedOption(ind);               
    };

    useEffect(() => {
        setIsOptionOpen(false); 
        switchItem(options[selectedOption]);       
    }, [selectedOption]);


    return (
        <div className="wrapper" ref={ref}>
            <div className='wrapper-container'>
                <button
                    className='wrapper__btn' 
                    type='button'
                    aria-haspopup='listbox'
                    aria-expanded={isOptionOpen}
                    onClick={toggleOptions}>
                        {options[selectedOption]}
                </button>
                <ul 
                    className={`options ${isOptionOpen ? 'show' : ''}`}
                    role='listbox'
                    aria-activedescendant={options[selectedOption]}
                    tabIndex={-1}>
                    {
                        options.map((option, ind) => (
                            <li 
                                className='options__li'
                                tabIndex={0}
                                id={option}
                                aria-selected={selectedOption === ind} 
                                key={ind}
                                onClick={()=>linkClickHandler(ind)}                             
                                >{option}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
