import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { useState, useEffect } from 'react';
import Computer from './Minmax';
import './App.css';

function App() {
  const HUMAN_PIECE = "X";
  const COMPUTER_PIECE = "O";
  const computerPlayer = new Computer(HUMAN_PIECE, COMPUTER_PIECE);

  const [boardSize, setBoardSize] = useState(3);
  const [startTurn, setStartTurn] = useState(HUMAN_PIECE);
  const [turn, setTurn] = useState(startTurn);
  const [gameEnd, setGameEnd] = useState(false);
  const [gameMessage, setGameMessage] = useState("");
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
    resetGame();
  }, [startTurn, boardSize]);

  useEffect(() => {
    if (gameEnd) {
      setTurn(undefined);
      console.log("Game end!");
    } else if (turn === COMPUTER_PIECE) {
      computerMove();
    }
  }, [turn, gameEnd]);

  function resetGame() {
    setTurn(startTurn);
    setGameEnd(false);
    setBoard(Array.from(Array(boardSize), () => Array(boardSize).fill(undefined)));
  }

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
    setBoard(computerPlayer.move(board));
    checkIfEnd();
    if (!gameEnd) setTimeout(() => setTurn(HUMAN_PIECE), 1000);
  }

  function checkIfEnd() {
    checkHorizontalWin();
    checkVerticalWin();
    checkDiagonalWin();
    checkBoardFull();
  }

  function endingGame(player) {
    if (player === HUMAN_PIECE) {

    } else if (player === COMPUTER_PIECE) {

    } else {

    }
  }

  function checkHorizontalWin() {
    for (let row = 0; row < board[0].length; row++) {
      if (!board[row][0]) break;
      const player = board[row][0];
      let win = true;

      for (let col = 0; col < board.length; col++) {
        if (board[row][col] !== player) win = false;
      }
      
      if (win) {
        setGameEnd(true);
        endingGame(player);
      }
    }
  }

  function checkVerticalWin() {
    for (let col = 0; col < board.length; col++) {
      if (!board[0][col]) break;
      const player = board[0][col];
      let win = true;

      for (let row = 0; row < board[0].length; row++) {
        if (board[row][col] !== player) win = false;
      }

      if (win) {
        setGameEnd(true);
        endingGame(player);
      }
    }
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
    if (win) {
      setGameEnd(true);
      endingGame(player);
    }

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
    if (win) {
      setGameEnd(true);
      endingGame(player);
    }
  }

  function checkBoardFull() {
    for (let col = 0; col < board.length; col++) {
      for (let row = 0; row < board[0].length; row++) {
        if (!board[row][col]) return; // empty space
      }
    }
    setGameEnd(true);
    endingGame();
  }

  return (
    <div id="app">
      <div id="game-message">

      </div>
      <div id="header">
        <div className="game-setting">
          <InputLabel htmlFor="turn-select">Who starts</InputLabel>
          <FormControl>
            <Select
              id="turn-select"
              value={startTurn}
              onChange={event => setStartTurn(event.target.value)}
            >
              <MenuItem value={HUMAN_PIECE}>Human</MenuItem>
              <MenuItem value={COMPUTER_PIECE}>Computer</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="game-setting">
          <InputLabel htmlFor="size-select">Board size</InputLabel>
          <FormControl>
            <Select
                id="size-select"
                value={boardSize}
                onChange={event => setBoardSize(event.target.value)}
              >
                <MenuItem value={3}>3x3</MenuItem>
                <MenuItem value={4}>4x4</MenuItem>
                <MenuItem value={5}>5x5</MenuItem>
              </Select>
          </FormControl>
        </div>
      </div>
      <div id="game-container">
        <div id="grid-background-rows">
          {board.map((row, rowNumber) => {
            let rowClass = "background-row";
            if (rowNumber === 0) rowClass += " start-row";
            return <div className={rowClass} key={rowNumber}></div>
          })}
        </div>

        <div id="grid-background-cols">
          {board.map((col, colNumber) => {
            let colClass = "background-col";
            if (colNumber === 0) colClass += " start-col";
            return <div className={colClass} key={colNumber}></div>
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
