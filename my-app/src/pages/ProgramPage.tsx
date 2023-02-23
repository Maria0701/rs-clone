import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from "../components/wrappers/Wrapper";
import { exercisesAPI } from '../features/exercises/exercisesService';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getMe } from '../features/auth/authSlice';
import { Loader } from '../ui/Loader';



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
  }, [])
  

  return (
    <Wrapper>
        {isLoading && <Loader />}
        {exercisesLoading && <Loader />}
        {error && <p>Something went wrong</p>}
        {
          Boolean(userFull)  && <div className="program__items">
            {isSuccess && exercises!.map((training) =>
              <div className="program__item" key={training._id} onClick={() => navigate(`/exercise/${training._id}`)}>
                {training.name}
              </div>
            )}
          </div>
        }
    </Wrapper>
  )
};