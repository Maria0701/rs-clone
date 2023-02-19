import { useEffect, useState, useRef } from 'react'
import { useOnClickOutside } from '../app/hooks';
import { IProgram } from '../models/models';
import './customSelect.css';
interface IOptions {
    options: IProgram[],
    switchItem: (value: string) => void,
    text: string,
}

export default function CustomSelect2({options, switchItem}:IOptions) {
    const [isOptionOpen, setIsOptionOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(0);
    const ref = useRef(null);

    const toggleOptions = () => {
        setIsOptionOpen(!isOptionOpen);        
    };
    
    useOnClickOutside(ref, () => setIsOptionOpen(false));
    
    const linkClickHandler = (ind:number) => {       
        setSelectedOption(ind);               
    };

    useEffect(() => {
        setIsOptionOpen(false); 
        switchItem(options[selectedOption]._id);       
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
                        {options[selectedOption].name}
                </button>
                <ul 
                    className={`options ${isOptionOpen ? 'show' : ''}`}
                    role='listbox'
                    aria-activedescendant={options[selectedOption].name}
                    tabIndex={-1}>
                    {
                        options.map((option, ind) => (
                            <li 
                                className='options__li'
                                tabIndex={0}
                                id={option._id}
                                aria-selected={selectedOption === ind} 
                                key={ind}
                                onClick={()=>linkClickHandler(ind)}                             
                                >{option.name}</li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
