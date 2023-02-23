import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, reset } from '../../features/auth/authSlice';
import { UsernameFormElement } from '../../models/models';
import { Loader } from '../../ui/Loader';

export function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useAppSelector((state) => state.auth.user);
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const isError = useAppSelector((state) => state.auth.isError);
    const isSuccess = useAppSelector((state) => state.auth.isSuccess);
    const message = useAppSelector((state) => state.auth.message);
    const { email, password } = formData;
    const from = location?.state?.from?.pathname || '/';
    console.log(from);
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            navigate(from, {replace: true});           
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
        if (email === '' || password === '') {
            toast.error('Fill in fields');
        } else {
            const userData = {
                email,
                password,
            };
            dispatch(login(userData));
        }
    };

    if (isLoading) {
        return <Loader />
    }
 
    return (        
            <form className='form form--login'  onSubmit={onSubmit}>
               <ToastContainer />
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
