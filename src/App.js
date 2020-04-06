import React, { useEffect, useState } from 'react';
import './App.scss';
import Boggle from './boggle/boggle';
import Inputs from './components/Inputs';
import Timer from './components/Timer';
import Board from './components/Board';

const keys = {
    size: "SIZE",
    minutes: "MINUTES",
};

const initialMinutes = +localStorage.getItem(keys.minutes) || 3;
const initialSize = +localStorage.getItem(keys.size) || 4;
const initialBoard = new Boggle(initialSize);

var timeoutid;

export default function App() {

    const [playing, setPlaying] = useState(false);
    const [duration, setDuration] = useState(initialMinutes * 60 * 1000);
    const [boggle, setBoggle] = useState(initialBoard);

    const minutes = ~~(duration / 1000 / 60);
    const seconds = ~~((duration / 1000) % 60);

    const setMinutes = minutes => setDuration(((minutes * 60) + seconds) * 1000);
    const setSeconds = seconds => setDuration(((minutes * 60) + seconds) * 1000);

    useEffect(() => {
        if (playing) {
            if (duration >= 1000) timeoutid = setTimeout(() => setDuration(duration - 1000), 1000);
            else setDuration(0);
        }
    }, [duration, playing]);

    useEffect(() => {
        if (!playing) {
            clearTimeout(timeoutid);
            setBoggle(new Boggle(+localStorage.getItem(keys.size) || initialSize));
            setDuration((+localStorage.getItem(keys.minutes) || initialMinutes) * 60 * 1000);
        }
    }, [playing]);

    useEffect(() => {
        if (!playing) localStorage.setItem(keys.minutes, duration / 60 / 1000);
    }, [duration]);

    useEffect(() => {
        localStorage.setItem(keys.size, boggle.dimensions.x);
    }, [boggle]);

    return (
        <div className="App">
            {playing ? (
                <Timer
                    {...{
                        minutes,
                        seconds,
                    }}
                />
            ) : (
                    <Inputs
                        {...{
                            boggle,
                            setBoggle,
                            minutes,
                            setMinutes,
                            seconds,
                            setSeconds,
                            startGame: () => setPlaying(true),
                        }}
                    />
                )}
            <Board
                boggle={boggle}
                hideLetters={!playing}
            />
            <button
                className={`start-end ${playing ? 'end' : 'start'}`}
                onClick={() => setPlaying(playing => !playing)}
            >
                {playing ? 'End' : 'Start'}
            </button>
        </div>
    );
}
