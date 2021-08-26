import { KeyboardEvent, useState } from 'react';
import './App.css';
import { message } from './message';

interface Letter {
  shape: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const LetterShape = ({ shape, text, x, y, width, height }: Letter) => (
  <span style={{
    position: 'absolute',
    top: y - 4,
    left: x + 1,
  }}>
    {text}
  </span>
)

const width = 10;
const height = 10;

// const isLetter = (key: string) => key.match(/^[a-zA-Z]$/);
const isLetter = (key: string) => key.length === 1;

const getLocalState = (): Letter[] => {
  const localStore = localStorage.getItem('letters');
  return localStore ? JSON.parse(localStore) : null;
}

function App() {
  const localState = getLocalState();
  const state = localState || message;
  const [letters, setLetters] = useState(state);
  const [isDefault, setIsDefault] = useState(!localState);
  const [shape, setShape] = useState('');
  ;


  const addLetter = (char: string) => {
    const { mouse } = window as any;
    const letter = {
      shape,
      width,
      height,
      x: mouse.x,
      y: mouse.y,
      text: char,
    };
    setShape('');
    if (isDefault) {
      setIsDefault(false);
      setLetters([letter]);
    } else {
      setLetters([...letters, letter]);
    }
  }

  const handleKey = (e: KeyboardEvent) => {
    const { key } = e;
    if (!isLetter(key)) return;
    addLetter(key);
    localStorage.setItem('letters', JSON.stringify(letters));
  }

  const inputStyle = {
    width: '100vw',
    height: '100vh',
    position: 'fixed' as any,
    visbility: 'hidden',
    outline: 'none',
    appearance: 'none' as any,
    border: 'none',
    color: 'transparent'
  }

  const buttonStyle = {
    position: 'fixed' as any,
    top: 0,
    right: 0,
    appearance: 'none' as any,
    border: 'none',
    backgroundColor: 'white' as any,
    color: 'rgba(255, 0, 0, .2)',
    outline: 'none',
  }

  const reset = () => {
    setIsDefault(true);
    setLetters(message);
    localStorage.setItem('letters', JSON.stringify([]));
    document.getElementById('board')?.focus();
  }

  return (
    <main>
      <input id="board" type="text" onKeyDown={handleKey} autoFocus style={inputStyle} />
      {letters.map((letter, i) => <LetterShape key={i} {...letter} />)}
      <button onClick={reset} style={buttonStyle}>x</button>
    </main>
  );
}

export default App;
