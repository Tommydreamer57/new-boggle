import React from 'react';

export default function Board({
    boggle: {
        board = [],
    } = {},
    hideLetters = false,
    finished,
}) {
    return (
        <div className={`Board ${finished ? 'finished' : ''}`}>
            {board.map((row, i) => (
                <div
                    key={i}
                    className="row"
                >
                    {row.map(({ value }, i) => (
                        <div
                            key={i}
                            className="letter-wrapper"
                        >
                            <div className="letter">
                                {hideLetters ? '?' : value}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
