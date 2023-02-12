import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className='header'>
          <div className="container">
            <Link to='/'>Логин</Link>
            <Link to='/register'>Register</Link>
            <Link to='/programs-index'>Главная</Link>
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