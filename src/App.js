import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './App.css';
import { useState } from 'react';
import move from './algorithm';

function App() {
  const HUMAN_PIECE = "X";
  const COMPUTER_PIECE = "O";

  const [boardHeight, setBoardHeight] = useState(3);
  const [turn, setTurn] = useState(HUMAN_PIECE);
  const [gameEnd, setGameEnd] = useState(false);
  const [board, setBoard] = useState(
    Array.from(Array(boardHeight), () => Array(boardHeight).fill(undefined))
  );

  function getPositionClass(element) {
    if (element === "X") return "X-position";
    else if (element === "O") return "O-position";
    else return "empty-position";
  }

  function selectPosition(row, column) {
    let boardCopy = board.slice();
    boardCopy[row][column] = HUMAN_PIECE;
    setBoard(boardCopy);
    
    checkIfEnd();
    console.log("game ended?", gameEnd)
    if (!gameEnd) setTimeout(() => computerMove(), 800);
  }

  function computerMove() {
    setTurn(COMPUTER_PIECE);

    let boardCopy = board.slice();
    boardCopy = move(boardCopy, HUMAN_PIECE, COMPUTER_PIECE)
    setBoard(boardCopy);

    checkIfEnd();
    console.log("game ended?", gameEnd)
    if (!gameEnd) setTurn(HUMAN_PIECE);
  }

  function checkIfEnd() {
    // Row
    for (let row = 0; row < board[0].length; row++) {
      if (!board[row][0]) break;
      const player = board[row][0];
      let win = true;

      for (let col = 0; col < board.length; col++) {
        if (board[row][col] !== player) win = false;
      }
      
      if (win) {
        setGameEnd(true);
        console.log("row win for", player, gameEnd)
        return;
      }
    }

    // Column
    for (let col = 0; col < board.length; col++) {
      if (!board[0][col]) break;
      const player = board[0][col];
      let win = true;

      for (let row = 0; row < board[0].length; row++) {
        if (board[row][col] !== player) win = false;
      }

      if (win) {
        setGameEnd(true);
        console.log("col win for", player, gameEnd)
        return;
      }
    }

    // Vertical
    
  }

  return (
    <div id="app">
      <div id="header">

      </div>
      <div id="game-container">
        <Grid container direction="column">
          {board.map((row, rowNumber) =>
            <Grid item key={rowNumber}>
              {row.map((element, colNumber) => 
                <Button
                  variant="outlined"
                  className={"grid-position " + getPositionClass(element)}
                  disabled={element === HUMAN_PIECE || element === COMPUTER_PIECE}
                  onClick={() => selectPosition(rowNumber, colNumber)}
                  key={colNumber}
                >
                  {element}
                </Button>
              )}
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
}

export default App;
