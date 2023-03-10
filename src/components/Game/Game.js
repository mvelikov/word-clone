import { useState } from 'react';

import { sample, range } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';

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
  const [success, setSuccess] = useState(false);
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
          if (word === answer) {
            setSuccess(true);
          }
        }
      }}
    >
      {!success && guesses.length < NUM_OF_GUESSES_ALLOWED && (
        <>
          <label htmlFor="guess-input">Enter guess:</label>
          <input
            id="guess-input"
            type="text"
            value={word}
            maxLength={5}
            minLength={5}
            onChange={({ target }) => setWord(target.value.toUpperCase())}
            autoFocus
          />
        </>
      )}
      {!success && guesses.length === NUM_OF_GUESSES_ALLOWED && (
        <UnsuccessfulBanner />
      )}
      {success && <SuccessfulBanner numberOfGuesses={guesses.length} />}
    </form>
  );
}

function GuessesList({ guesses }) {
  return (
    <div className="guess-results">
      {guesses.map((guess, index) => (
        <p key={index} className="guess">
          {checkGuess(guess, answer).map((segment, index) => (
            <span className={`${segment.status} cell`} key={index}>
              {segment.letter}
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

function SuccessfulBanner({ numberOfGuesses }) {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{' '}
        <strong>{numberOfGuesses} guesses</strong>.
      </p>
    </div>
  );
}

function UnsuccessfulBanner() {
  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
}
