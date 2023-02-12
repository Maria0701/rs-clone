import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ProgramsIndex } from './pages/ProgramIndex';
import { ProgramPage } from './pages/ProgramPage';
import { Exercise } from './pages/Exercise';
import { PersonalPage } from './pages/PersonalPage';
import { Calendar } from './pages/Calendar';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="App">      
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/programs-index' element={<ProgramsIndex />} />
          <Route path='/program' element={<ProgramPage />} />
          <Route path='/exercise' element={<Exercise />} />
          <Route path='/personal' element={<PersonalPage />} />
          <Route path='/calendar' element={<Calendar />} />
        </Routes>
      <footer></footer>
    </div>
  );
}

export default App;
