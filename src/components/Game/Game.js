import { useState } from 'react';

import { sample, range } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

export function Game() {
  const [guesses, setGuesses] = useState([]);
  return (
    <>
      <GuessesList guesses={guesses} />
      <Input guesses={guesses} setGuesses={setGuesses} />
    </>
  );
}

function Input({ guesses, setGuesses }) {
  const [word, setWord] = useState('');
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        if (word.length === 5) {
          const newGuesses = [...guesses];
          newGuesses.push(word);
          setGuesses(newGuesses);
          setWord('');
        }
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={word}
        maxLength={5}
        minLength={5}
        onChange={({ target }) => setWord(target.value.toUpperCase())}
        disabled={guesses.length === NUM_OF_GUESSES_ALLOWED}
        autoFocus
      />
    </form>
  );
}

function GuessesList({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((guess, index) => (
        <p key={index} className="guess">
          {guess.split('').map((letter, index) => (
            <span className="cell" key={index}>
              {letter}
            </span>
          ))}
        </p>
      ))}
      {range(guesses.length, NUM_OF_GUESSES_ALLOWED).map((row, index) => (
        <p key={index} className="guess">
          <span className="cell"></span>
          <span className="cell"></span>
          <span className="cell"></span>
          <span className="cell"></span>
          <span className="cell"></span>
        </p>
      ))}
    </div>
  );
}
