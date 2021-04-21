import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import './App.css';
import { useState } from 'react';

function App() {
  const [size, setSize] = useState(3);
  const [board, setBoard] = useState(Array.from(Array(3), () => Array(3).fill(undefined)));

  const HUMAN_PIECE = "X";
  const COMPUTER_PIECE = "O";

  function getPositionClass(element) {
    if (element === "X") return "X-position";
    else if (element === "O") return "O-position";
    else return "empty-position";
  }

  function selectPosition(row, column) {
    let boardCopy = board.slice();
    boardCopy[row][column] = HUMAN_PIECE;
    setBoard(boardCopy);
  }

  return (
    <div id="app">
      <div id="header">

      </div>
      <div id="game-container">
        <Grid container direction="column">
          {console.log(board)}
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
