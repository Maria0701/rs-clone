import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { ProgramsIndex } from './pages/ProgramIndex';
import { ProgramPage } from './pages/ProgramPage';
import { Exercise } from './pages/Exercise';
import { PersonalPage } from './pages/PersonalPage';
import { Calendar } from './pages/Calendar';
import { Register } from './pages/Register';
import Questioner from './pages/Questioner';
import { RequireAuth } from './RequioreAuth';
import { Layout } from './Layout';

function App() {
  return (   
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />

        <Route element={<RequireAuth allowedRoles={[0]}/>}>          
          <Route path='/questioner' element={<Questioner />} />
          <Route path='/' element={<ProgramsIndex />} />
          <Route path='/programs-index' element={<ProgramsIndex />} />
          <Route path='/program' element={<ProgramPage />} />
          <Route path='/exercise/:id' element={<Exercise />} />
          <Route path='/personal' element={<PersonalPage />} />
          <Route path='/calendar' element={<Calendar />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
