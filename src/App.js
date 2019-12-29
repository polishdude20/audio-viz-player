import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const playerInitialState = {
  isPlaying: false,
  currentSeconds: 0,
  totalSeconds: 100
};

const convertSecToTime = secs => {
  var h = Math.floor(secs / 3600);
  var m = Math.floor((secs % 3600) / 60);
  var s = Math.floor((secs % 3600) % 60);
  return `${h < 10 ? "0" : ""}${h}:${m < 10 ? "0" : ""}${m}:${
    s < 10 ? "0" : ""
  }${s}`;
};

const convertToSeconds = (e, totalSeconds) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const mouseXAbs = e.clientX;
  const mouseXRel = mouseXAbs - rect.x;
  const seekRatio = Math.min(Math.max(0, mouseXRel / rect.width), 1);

  const seconds = seekRatio * totalSeconds;
  console.log(seconds);
  return seconds;
};

const convertCurrentSecondsToSliderWidth = (currentSeconds, totalSeconds) => {
  return `${(100 * currentSeconds) / totalSeconds}%`;
};

const Player = props => {
  useEffect(() => {
    console.log(props.playerState);
  }, [props]);

  return (
    <div className="player">
      <canvas className="display" />
      <div className="controls">
        <button
          className="play"
          onClick={() =>
            props.playerState.isPlaying
              ? props.setPlayerState({ ...props.playerState, isPlaying: false })
              : props.setPlayerState({ ...props.playerState, isPlaying: true })
          }
        >
          {props.playerState.isPlaying ? "Pause" : "Play"}
        </button>
        <div
          className="timeline"
          onClick={event => {
            const seconds = convertToSeconds(
              event,
              props.playerState.totalSeconds
            );
            //Change this bottom part to props.seek(seconds);
            props.setPlayerState({
              ...props.playerState,
              currentSeconds: seconds
            });
          }}
        >
          <div className="progressLine">
            <div
              className="progressSliderWrapper"
              style={{
                width: convertCurrentSecondsToSliderWidth(
                  props.playerState.currentSeconds,
                  props.playerState.totalSeconds
                )
              }}
            >
              <div className="progressSlider"></div>
            </div>
          </div>
        </div>
        <h4 className="timeReadout">{`${convertSecToTime(
          props.playerState.currentSeconds
        )} / ${convertSecToTime(props.playerState.totalSeconds)}`}</h4>
      </div>
    </div>
  );
};

function App() {
  const [playerState, setPlayerState] = useState(playerInitialState);

  return (
    <div className="App">
      <Player playerState={playerState} setPlayerState={setPlayerState} />
    </div>
  );
}

export default App;
