import React, { useState } from 'react'
import './forms.css';
import './register.css';

export function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    interface FormElements extends HTMLFormControlsCollection {
        usernameInput: HTMLInputElement
    }
    interface UsernameFormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const { name, email, password, password2 } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const onSubmit = (evt: React.FormEvent<UsernameFormElement>) => {
        evt.preventDefault();
    }
 
    return (        
            <form className='form form--register'  onSubmit={onSubmit}>
                <label className="form__label">
                    <input className='input form__input'
                        type="text"
                        value={name}
                        name="name"
                        placeholder='Please enter Your Name'
                        onChange={onChange}
                        />
                </label>
                <label className="form__label">
                    <input className='input form__input'
                        type="email"
                        value={email}
                        name="email"
                        placeholder='Please enter your email'
                        onChange={onChange}
                        />
                </label>
                <label className="form__label">
                    <input className='input form__input'
                        type="password"
                        value={password}
                        name="password"
                        placeholder='Please enter password'
                        onChange={onChange}
                        />
                </label>
                <label className="form__label">
                    <input className='input form__input'
                        type="password"
                        value={password2}
                        name="password2"
                        placeholder='Please reenter password'
                        onChange={onChange}
                        />
                </label>
                <button type="submit" className='btn btn--block'>Submit</button>
            </form>
       
    )
}
