import { useState, FC, useEffect } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useParams } from 'react-router';
import { Wrapper } from '../components/wrappers/Wrapper';
import { SvgElt } from '../ui/SvgElt';
import { exercisesAPI } from '../features/exercises/exercisesService';
import { Loader } from '../ui/Loader';
import Modal from '../ui/Modal';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getCompletedToday, resetUpload, setCompleted, updateCompleted } from '../features/getCompleted/completedSlice';

export const Exercise: FC = () => {
  const [modalState, setModalState] = useState(false);
  const [player, setPlayer] = useState<YouTubePlayer>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [pausedTimer, setPausedTimer] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user)
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isCompletedLoading = useAppSelector((state) => state.completed.isLoading);
  const isComletedError = useAppSelector((state) => state.completed.isError);
  const isCompletedSuccess = useAppSelector((state) => state.completed.isSuccess);
  const completedToday = useAppSelector((state) => state.completed.completedItem);

  const {
    data: exercise, 
    error, 
    isLoading, 
    isSuccess
  } = exercisesAPI.useGetOneExerciseQuery(id || '');

  useEffect(() => {
    dispatch(getCompletedToday({
      user_id: user?._id!,
      exercise_id: id!
    }))
  }, []);

  useEffect(() => {
    if (isCompletedSuccess) {
      handleClose();
      setCurrentTime(0);
      dispatch(resetUpload());

      dispatch(getCompletedToday({
        user_id: user?._id!,
        exercise_id: id!
      }))
    }

    if (isComletedError) {
      setCurrentTime(0);
      dispatch(resetUpload())
    }

    return () => {

    }
  }, [error, isSuccess, isComletedError, isCompletedSuccess])


  const onReady = (event: YouTubePlayer) => {
    setPlayer(event.target);
  };

  const onPlay = () => {
    player.playVideo();
    setPausedTimer(false)
    setStartTimer(true)
  };

  const onPause = () => {
    player.pauseVideo();
    setPausedTimer(true);
    setStartTimer(false)
  };

  const onStop = () => {
    player.stopVideo();
    setStartTimer(false);
    setModalState(true);
    
  };

  const tick = () => {
    if (pausedTimer) return;
    setCurrentTime(prev => prev + 1);
  };

  useEffect(() => {
    if (startTimer) {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }
  }, [currentTime, startTimer]);

  const saveHandler = () => {
    if (!Boolean(completedToday)) {
      dispatch(setCompleted({
        program_name:'',
        program_id: '',
        exercise_name: exercise?.name!,
        exercise_id: exercise?._id!,
        preview: exercise?.img!,
        time: currentTime,
        user_id: user?._id!
      }));
    }

    if (Boolean(completedToday)) {
      dispatch(updateCompleted({
        id: completedToday?._id!,
        time: completedToday?.time! + currentTime
      }))
    }
  }

  const options = {
    playerVars: {
      autoplay: 0,
      controls: 0,
      loop: 1,
      fs: 0,
      modestbranding: 1,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      enablejsapi: 1,
    },
  };

  const handleClose = () => {
    setModalState(false);
  }

  return (
    <Wrapper>
      {isLoading && <Loader />}
      {isSuccess &&
      <div className="exercise">
        <h1 className="h2">{exercise!.name}</h1>
        <div className="exercise__player">
          <YouTube
            videoId={exercise.url}
            onReady={onReady}
            opts={options}
          />
        </div>
        <div className="exercise__btns">
        <button onClick={onPause} className="btn btn--play" aria-label='Pause'>
            <SvgElt width={20} height={20} name={'pause'} /> 
          </button>
          <button onClick={onPlay} className="btn btn--play" aria-label='Start'>
            <SvgElt width={20} height={20} name={'play'} />             
          </button>       
          <button onClick={onStop} className="btn btn--play"  aria-label='Stop'>
          <SvgElt width={20} height={20} name={'stop'} /> 
          </button>
          <div>Timer: {currentTime}</div>
        </div>
      </div>}

      <Modal isOpen={modalState} closeHandler={handleClose}>
          <>
              {modalState && 
              <>
                <h2 className='h2'>Save the result?</h2>
                {isComletedError && <p>Something went wrong</p>}
                {isCompletedLoading && <Loader />}
                  <div className='btns'>
                    <button className='btn btn--yes' onClick={handleClose}>no</button>
                    <button className='btn btn--yes' onClick={saveHandler}>yes</button>
                  </div>
              </>}
          </>
      </Modal>  
    </Wrapper>
  );
};