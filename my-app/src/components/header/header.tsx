import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, reset } from '../../features/auth/authSlice';

export function Header() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

    return (
        <header className='header'>
          <div className="container">
            {
              user ? (
                <>
                <button className='btn' onClick = {onLogout}>Logout</button>
                </>)
              : (<>
                <Link to='/login'>Логин</Link>
                <Link to='/register'>Register</Link>
                </>)
            }
            
            <Link to='/'>Главная</Link>
            <Link to='/program'>Программа</Link>
            <Link to='/exercise'>Упражнение</Link>
            <Link to='/personal'>Страница пользователя</Link>
            <Link to='/calendar'>Календарь</Link>
            <ul>
              <li></li>
              <li></li>
            </ul>
          </div>
      </header>
    );
};