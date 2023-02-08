import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ProgramsIndex } from './pages/ProgramIndex';
import { ProgramPage } from './pages/ProgramPage';
import { Exercise } from './pages/Exercise';
import { PersonalPage } from './pages/PersonalPage';
import { Calendar } from './pages/Calendar';

function App() {
  return (
    <div className="App">
      <header>
        <Link to='/'>Логин</Link>
        <Link to='/programs-index'>Главная</Link>
        <Link to='/program'>Программа</Link>
        <Link to='/exercise'>Упражнение</Link>
        <Link to='/personal'>Страница пользователя</Link>
        <Link to='/calendar'>Календарь</Link>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/programs-index' element={<ProgramsIndex />} />
          <Route path='/program' element={<ProgramPage />} />
          <Route path='/exercise' element={<Exercise />} />
          <Route path='/personal' element={<PersonalPage />} />
          <Route path='/calendar' element={<Calendar />} />
        </Routes>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Counter />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className="App-link"
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="https://redux-toolkit.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className="App-link"
              href="https://react-redux.js.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
