import { useState, FC } from 'react';
import YouTube from 'react-youtube';
import { useParams } from 'react-router';
import { ITraining, ITrainings } from '../models/models';

export const Exercise: FC<ITrainings> = ({ trainings }) => {
  const [player, setPlayer] = useState();
  const { id } = useParams();
  const training = trainings.find((item) => item.id === id) as ITraining;
  const youtubeID = training.url;

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const onPlay = () => {
    player.playVideo();
  };

  const onPause = () => {
    player.pauseVideo();
  };

  const onStop = () => {
    player.stopVideo();
  };

  const options = {
    height: "390",
    width: "640",
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'fs': 0,
      'modestbranding': 1,
      'disablekb': 1,
      'showinfo': 0,
      'rel': 0,
      'iv_load_policy': 3,
      'origin': 0,
      'enablejsapi': 1,
    },
  };

  return (
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
        <button onClick={onPlay} className="btn">
          Play
        </button>
        <button onClick={onPause} className="btn">
          Pause
        </button>
        <button onClick={onStop} className="btn">
          Stop
        </button>
      </div>
    </div>
  );
};