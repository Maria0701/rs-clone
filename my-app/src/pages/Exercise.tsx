import { useState, FC, useEffect } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useParams } from 'react-router';
import { ITraining, ITrainings } from '../models/models';
import { Wrapper } from '../components/wrappers/Wrapper';
import { SvgElt } from '../ui/SvgElt';

export const Exercise: FC<ITrainings> = ({ trainings }) => {
  const [player, setPlayer] = useState<YouTubePlayer>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [pausedTimer, setPausedTimer] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  const { id } = useParams();
  const training = trainings.find((item) => item.id === id) as ITraining;
  const youtubeID = training.url;

  const onReady = (event: YouTubePlayer) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration())
    setCurrentTime(duration)
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
    setCurrentTime(duration);
  };

  const tick = () => {
    if (pausedTimer) return;

    if (currentTime === 0) {
      setCurrentTime(duration);
      setStartTimer(false);
    } else {
      setCurrentTime(currentTime - 1);
    }
  };

  useEffect(() => {
    if (startTimer) {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    }
  }, [currentTime, startTimer]);

  const options = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 0,
      controls: 0,
      fs: 0,
      modestbranding: 1,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      iv_load_policy: 3,
      origin: 'https://localhost:3000',
      enablejsapi: 1,
    },
  };

  return (
    <Wrapper>
      <div className="exercise">
        <h3 className="exercise__title">{training.name}</h3>
        <div className="exercise__player">
          <YouTube
            videoId={youtubeID}
            onReady={onReady}
            opts={options}
          />
        </div>
        <div className="exercise__btns">
          <button onClick={onPlay} className="btn" aria-label='Start'>
            <SvgElt width={20} height={20} name={'play'} /> 
            
          </button>
          <button onClick={onPause} className="btn" aria-label='Pause'>
            <SvgElt width={20} height={20} name={'pause'} /> 
          </button>
          <button onClick={onStop} className="btn"  aria-label='Stop'>
          <SvgElt width={20} height={20} name={'stop'} /> 
          </button>
          <div>Timer: {currentTime}</div>
        </div>
      </div>
    </Wrapper>
  );
};