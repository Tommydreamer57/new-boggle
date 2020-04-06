import React from 'react';
import Boggle from '../boggle/boggle';

const min = 3;
const max = 6;

export default function Inputs({
    setBoggle,
    boggle: {
        dimensions: {
            x,
            y,
        } = {},
    } = {},
    minutes,
    setMinutes,
    seconds,
    setSeconds,
}) {
    return (
        <div className={`Inputs ${x}-x-${y}`}>
            <label>
                <span>Board Size</span>
                <input
                    type='number'
                    min={min}
                    max={max}
                    value={Math.abs(x)}
                    onChange={({ target: { value } }) => Math.abs(value) <= max && setBoggle(new Boggle(Math.abs(+value)))}
                />
            </label>
            <label>
                <span>Duration</span>
                <span>
                    <input
                        type='number'
                        value={minutes}
                        onChange={({ target: { value } }) => setMinutes(Math.abs(value))}
                    />
                    <span>:</span>
                    <input
                        type='number'
                        value={seconds}
                        onChange={({ target: { value } }) => setSeconds(Math.abs(value))}
                    />
                </span>
            </label>
        </div>
    );
}
