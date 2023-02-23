import { useEffect, useState } from 'react'
import { IRegisterData } from '../models/models';

export const useAuth = () => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        if (localStorage.getItem('user')) setAuth(JSON.parse(localStorage.getItem('user') as string) || {});
    }, []);

    return auth as IRegisterData;
};