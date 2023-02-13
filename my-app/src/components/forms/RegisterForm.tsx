import React, { useEffect, useState } from 'react'
import './forms.css';
import './register.css';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { UsernameFormElement } from '../../models/models';
import { toast } from 'react-toastify';
import { Loader } from '../../ui/Loader'


export function RegisterForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isError = useAppSelector((state) => state.auth.isError);
    const isSuccess = useAppSelector((state) => state.auth.isSuccess);
    const message = useAppSelector((state) => state.auth.message);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());

    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const onSubmit = (evt: React.FormEvent<UsernameFormElement>) => {
        evt.preventDefault();
        if (password !== password2) {
            toast.error('Passwords do not match');
        } else {
            const userData = {
                email,
                password,
                name,
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Loader />
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
