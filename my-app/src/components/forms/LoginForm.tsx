import React, { useState } from 'react'

export function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    interface FormElements extends HTMLFormControlsCollection {
        usernameInput: HTMLInputElement
    }
    interface UsernameFormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const { email, password } = formData;

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
            <form className='form form--login'  onSubmit={onSubmit}>
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
                <button type="submit" className='btn btn--block'>Submit</button>
            </form>
       
    )
};
