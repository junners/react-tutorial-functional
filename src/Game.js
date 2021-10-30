import React, {useState} from 'react';
import Board from './Board';

export default function Game() {
  const [history, setHistory] = useState([{
    squares : Array(9).fill(null)
  }]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const [current, setCurrent] = useState({squares: Array(9).fill(null)});
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    const squares = history[stepNumber].squares.slice();
    if ( calculateWinner(squares) || squares[i] ) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setCurrent({squares});
    setHistory([...history, {squares}]);
    setXIsNext(!xIsNext);
    setStepNumber(history.length);
    setWinner(calculateWinner(squares));
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
    setCurrent(history[step]);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${(xIsNext ? 'X' : 'O')}`;
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : `Go to game start`;
    return (
      <li key={move}>
        <button
          onClick={()=>jumpTo(move)} 
        >
          {desc}
        </button>
      </li>
    )
  });
  
  const onReset = () => {
    setHistory([{squares: Array(9).fill(null)}]);
    setXIsNext(true);
    setStepNumber(0);
    setCurrent({squares: Array(9).fill(null)});
    setWinner(null);
  };

  const reset = () => {
    return (
      <div className="game-info">
        <button onClick={() => onReset()}>Restart Game</button>
      </div>
    );
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          sendToParent={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
      {winner && reset()}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ],
  ];
  for (let i = 0; i < lines.length; i++){
    const [ a, b, c ] = lines[i];
    if ( squares[ a ] && squares[a] === squares[ b ] && squares[ a ] && squares[ c ] ){
      return squares[ a ]; // x or o
    }
  }
  return null;
}