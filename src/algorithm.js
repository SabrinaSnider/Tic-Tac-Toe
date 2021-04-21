/**
 * Heuristic board function
 * +1^count for each line only populated by computer
 * -1^count for each line only populated by human
 * 0 otherwise (empty lines or lines with both players)
 * 
 * Positions given in (row, column)
 * Board must be square
 */

const BOARD_HEIGHT = 3;
const MINMAX_DEPTH = 3;

function move(board, HUMAN_PIECE, COMPUTER_PIECE) {
  const result = minmax(MINMAX_DEPTH, COMPUTER_PIECE, board, HUMAN_PIECE, COMPUTER_PIECE);
  board[result.bestMove[0]][result.bestMove[1]] = COMPUTER_PIECE;
  return board;
}

function minmax(depth, player, board, HUMAN_PIECE, COMPUTER_PIECE) {
  const moves = potentialMoves(board);
  let result = {
    bestScore: undefined,
    bestMove: undefined
  }

  if (!moves || depth === 0) {
    result.bestScore = evaluate(board);
    return result;
  }

  moves.forEach(move => {
    board[move[0]][move[1]] = player;
    let currentMove = minmax(depth - 1, player === COMPUTER_PIECE ? HUMAN_PIECE : COMPUTER_PIECE, board);

    if (!result.bestScore ||
      (player === COMPUTER_PIECE && currentMove.bestScore > result.bestScore) ||
      (player === HUMAN_PIECE && currentMove.current < result.bestScore)) {
        result.bestScore = currentMove.bestScore;
        result.bestMove = move;
    }
    
    board[move[0]][move[1]] = undefined;
  })
  return result;
}

function potentialMoves(board) {
  let moves = [];
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    for (let col = 0; col < BOARD_HEIGHT; col++) {
      if (!board[row][col]) moves.push([row, col])
    }
  }
  return moves;
}

function evaluate(board, HUMAN_PIECE, COMPUTER_PIECE) {
  let score = 0;

  // Vertical
  for (let col = 0; col < BOARD_HEIGHT; col++) {
    positions = [];
    for (let row = 0; row < BOARD_HEIGHT; row++) positions.push([row, col]);
    score += evaluateLine(positions, board, HUMAN_PIECE, COMPUTER_PIECE);
  }

  // Horizontal
  for (let row = 0; row < BOARD_HEIGHT; row++) {
    positions = [];
    for (let col = 0; col < BOARD_HEIGHT; col++) positions.push([row, col]);
    score += evaluateLine(positions, board, HUMAN_PIECE, COMPUTER_PIECE);
  }

  // Diagonal
  positions = [];
  for (let pos = 0; pos < BOARD_HEIGHT; pos++) positions.push([pos, pos]);
  score += evaluateLine(positions, board, HUMAN_PIECE, COMPUTER_PIECE);
  
  positions = [];
  for (let pos = 0; pos < BOARD_HEIGHT; pos++) positions.push([pos, BOARD_HEIGHT - pos]);
  score += evaluateLine(positions, board, HUMAN_PIECE, COMPUTER_PIECE);

  return score;
}

function evaluateLine(positions, board, HUMAN_PIECE, COMPUTER_PIECE) {
  let humanCount = 0, computerCount = 0;

  positions.forEach(position => {
    const player = board[position[0]][position[1]];
    if (player === COMPUTER_PIECE) computerCount++; else if (player === HUMAN_PIECE) humanCount++;
  });
  
  if (humanCount == 0) return 1 ** computerCount;
  else if (computerCount == 0) return -1 * (1 ** humanCount);
  else return 0;
}


let board = Array.from(Array(3), () => Array(3).fill(undefined));
console.log(board);
board = move(board, "X", "O")
console.log(board);
// board[0][1] = "HUMAN";
// console.log(board);
// board = move(board)
// console.log(board);
// board[2][2] = "HUMAN";
// console.log(board);
// board = move(board)
// console.log(board);
// board[1][0] = "HUMAN";
// console.log(board);
// board = move(board)
// console.log(board);
