import { useState } from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  return Input();
}

export default Game;
function Input() {
  const [word, setWord] = useState('');
  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        console.log(word);
        setWord('');
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
      />
    </form>
  );
}
