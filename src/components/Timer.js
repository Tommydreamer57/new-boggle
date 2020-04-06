import React from 'react';

export default function Timer({
    minutes,
    seconds,
}) {
    return (
        <div className={`Timer ${!seconds && !minutes ? 'finished' : ''}`}>
            <span>
                {minutes}
            </span>
            <span>:</span>
            <span>
                {seconds < 10 ? '0' : ''}{seconds}
            </span>
        </div>
    );
}
