import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { ITrainings } from "../models/models"



export const ProgramPage: FC<ITrainings> = ({ trainings }) => {
  const navigate = useNavigate();

  return (
    <div className="program__items">
      {trainings.map((training) =>
        <div className="program__item" key={training.id} onClick={() => navigate(`/exercise/${training.id}`)}>
          {training.name}
        </div>
      )}
    </div>
  )
};