import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from "../components/wrappers/Wrapper";
import { exercisesAPI } from '../features/exercises/exercisesService';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getMe } from '../features/auth/authSlice';
import { Loader } from '../ui/Loader';
import ExerciseTemplate from '../components/exercise/ExerciseTemplate';



export const ProgramPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const userFull = useAppSelector((state) => state.auth.me);
  const isLoading = useAppSelector((state) => state.auth.isLoading)
  const {data: exercises, error, isLoading: exercisesLoading, isSuccess} = exercisesAPI.useFetchAllExercisesQuery(userFull?.program_id || '');

  useEffect(() => {
    if (!userFull) {
      dispatch(getMe())
    }
  
    return () => {

    }
  }, []);

  const moveToPage = (id: string) => {
    navigate(`/exercise/${id}`)
  }
  

  return (
    <Wrapper>
      <div className='program-page'>
        {isLoading && <Loader />}
        {exercisesLoading && <Loader />}
        {error && <p>Something went wrong</p>}
        {
          Boolean(userFull)  && <div className="program__items">
            {isSuccess && exercises!.map((training) =>
              <ExerciseTemplate exercise={training} key={training._id} moveToPage={moveToPage} />
            )}
          </div>
        }
      </div>
    </Wrapper>
  )
};