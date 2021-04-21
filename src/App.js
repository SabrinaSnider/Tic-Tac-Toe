import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './App.css';
import { useState, useEffect } from 'react';
import move from './algorithm';

function App() {
  const HUMAN_PIECE = "X";
  const COMPUTER_PIECE = "O";

  const [boardSize, setBoardSize] = useState(3);
  const [turn, setTurn] = useState(HUMAN_PIECE);
  const [gameEnd, setGameEnd] = useState(false);
  const [board, setBoard] = useState(
    Array.from(Array(boardSize), () => Array(boardSize).fill(undefined))
  );

  useEffect(() => {
    const gridBackgroundRows = document.getElementById("grid-background-rows");
    gridBackgroundRows.style.height = 5 * boardSize + "rem";
    gridBackgroundRows.style.width = 5 * boardSize + "rem";

    const gridBackgroundCols = document.getElementById("grid-background-cols");
    gridBackgroundCols.style.height = 5 * boardSize + "rem";
    gridBackgroundCols.style.width = 5 * boardSize + "rem";
  });

  useEffect(() => {
    if (gameEnd) {
      setTurn(undefined);
      console.log("Game end!");
    } else if (turn === COMPUTER_PIECE) {
      computerMove();
    }
  }, [turn, gameEnd]);

  function getPositionClass(element) {
    if (element === "X") return "X-position";
    else if (element === "O") return "O-position";
    else return "empty-position";
  }

  function humanMove(row, column) {
    setTurn(undefined);
    let boardCopy = board.slice();
    boardCopy[row][column] = HUMAN_PIECE;
    setBoard(boardCopy);
    
    checkIfEnd();
    if (!gameEnd) setTimeout(() => setTurn(COMPUTER_PIECE), 1000);
  }

  function computerMove() {
    let boardCopy = board.slice();
    boardCopy = move(boardCopy, HUMAN_PIECE, COMPUTER_PIECE)
    setBoard(boardCopy);

    checkIfEnd();
    if (!gameEnd) setTimeout(() => setTurn(HUMAN_PIECE), 1000);
  }

  function checkIfEnd() {
    if (checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin()) setGameEnd(true);
  }

  function checkHorizontalWin() {
    for (let row = 0; row < board[0].length; row++) {
      if (!board[row][0]) break;
      const player = board[row][0];
      let win = true;

      for (let col = 0; col < board.length; col++) {
        if (board[row][col] !== player) win = false;
      }
      
      if (win) return true;
    }
    return false;
  }

  function checkVerticalWin() {
    for (let col = 0; col < board.length; col++) {
      if (!board[0][col]) break;
      const player = board[0][col];
      let win = true;

      for (let row = 0; row < board[0].length; row++) {
        if (board[row][col] !== player) win = false;
      }

      if (win) return true;
    }
    return false;
  }

  function checkDiagonalWin() {
    // Diagonal starting from top left
    let win = true;
    let player = board[0][0];
    if (player) {
      for (let pos = 0; pos < board.length; pos++) {
        if (board[pos][pos] !== player) win = false;
      }
    } else {
      win = false;
    }
    if (win) return true;

    // Diagonal starting from top right
    win = true;
    player = board[0][board.length - 1];
    if (player) {
      for (let pos = 0; pos < board.length; pos++) {
        if (board[pos][board.length - pos - 1] !== player) win = false;
      }
    } else {
      win = false;
    }
    return win;
  }

  return (
    <div id="app">
      <div id="header">

      </div>
      <div id="game-container">
        <div id="grid-background-rows">
          {board.map((row, rowNumber) => {
            let rowClass = "background-row";
            if (rowNumber === 0) rowClass += " start-row";
            return <div class={rowClass}></div>
          })}
        </div>

        <div id="grid-background-cols">
          {board.map((col, colNumber) => {
            let colClass = "background-col";
            if (colNumber === 0) colClass += " start-col";
            return <div class={colClass}></div>
          })}
        </div>
        
        <Grid container direction="column" id="grid">
          {board.map((row, rowNumber) =>
            <Grid item key={rowNumber}>
              {row.map((element, colNumber) => 
                <Button
                  variant="outlined"
                  className={"grid-position " + getPositionClass(element)}
                  disabled={element === HUMAN_PIECE || element === COMPUTER_PIECE || turn !== HUMAN_PIECE}
                  onClick={() => humanMove(rowNumber, colNumber)}
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
