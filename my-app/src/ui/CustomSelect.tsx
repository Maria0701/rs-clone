import React, { useEffect, useState } from 'react'
import './customSelect.css';
interface IOptions {
    options: string[],
    switchItem: (value: string) => void,
    text: string,
}

export default function CustomSelect({options, switchItem, text}:IOptions) {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);

    const toggleOptions = () => {
        setIsOptionOpen(!isOptionOpen);
    };

    const linkClickHandler = (ind:number) => {
        switchItem(options[selectedOption]);
        setSelectedOption(ind);        
    };

    useEffect(() => {
        setIsOptionOpen(false);
        
    }, [selectedOption]);


    return (
        <div className="wrapper">
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
                    <li 
                        className='options__li'
                        tabIndex={0}
                        id=''
                        >{text}</li>
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
