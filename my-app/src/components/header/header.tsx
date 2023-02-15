import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout, reset } from '../../features/auth/authSlice';
import Logo from './Logo';
import './header.css';
import { SvgElt } from '../../ui/SvgElt';

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
            <Link className='logo' to='/'>
              <Logo />
            </Link>
            <div className='header__right'>
              {
                user ? (
                  <>
                  <button className='btn btn__login' onClick={onLogout}>
                    Logout
                    <SvgElt width={26} height={26} name={'log-out'} />
                  </button>
                  </>)
                : (<>
                  <Link to='/login' className='btn btn__login'>Логин <SvgElt width={30} height={30} name={'log-in'} /></Link>
                  <Link to='/register' className='btn btn__login'>Register</Link>
                  </>)
              }
            </div>
          </div>
      </header>
    );
};