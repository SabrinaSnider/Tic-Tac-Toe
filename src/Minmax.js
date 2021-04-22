class Computer {
  constructor(HUMAN_PIECE = "X", COMPUTER_PIECE = "O", MAX_DEPTH = 3) {
    this.MAX_DEPTH = MAX_DEPTH;
    this.HUMAN_PIECE = HUMAN_PIECE;
    this.COMPUTER_PIECE = COMPUTER_PIECE;
    this.move_scores = new Map();
  }

  move(board) {
    if (this.potentialMoves(board).length === 0) return board; // already finished

    let boardCopy = board.slice();
    const bestScore = this.minmax(boardCopy);
    const bestMove = this.move_scores.get(bestScore)[0];
    boardCopy[bestMove[0]][bestMove[1]] = this.COMPUTER_PIECE;

    console.log(this.move_scores, "best move is", bestMove);
    return boardCopy;
  }

  minmax(board, player = this.COMPUTER_PIECE, depth = 0) {
    if (depth === 0) this.move_scores.clear(); // reset for new moves
    
    const moves = this.potentialMoves(board);
    let best = undefined;
    if (moves.length === 0 || depth === this.MAX_DEPTH) return this.evaluate(board); // Base cases

    moves.forEach(move => {
      board[move[0]][move[1]] = player; // temporarily make move

      const nextPlayer = player === this.COMPUTER_PIECE ? this.HUMAN_PIECE : this.COMPUTER_PIECE;
      let theoreticalResult = this.minmax(board, nextPlayer, depth + 1);
  
      if (best === undefined ||
        (player === this.COMPUTER_PIECE && theoreticalResult > best) ||
        (player === this.HUMAN_PIECE && theoreticalResult < best)) {
          best = theoreticalResult;
      }

      if (depth === 0 && this.move_scores.has(theoreticalResult)) {
        this.move_scores.get(theoreticalResult).push(move);
      } else if (depth === 0) {
        this.move_scores.set(theoreticalResult, new Array(move));
      }

      board[move[0]][move[1]] = undefined; // undo temporary move
    })
    return best;
  }

  potentialMoves(board) {
    let moves = [];
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[0].length; col++) {
        if (!board[row][col]) moves.push([row, col])
      }
    }
    return moves;
  }

  evaluate(board) {
    let score = 0;
    let pieces;
  
    // Horizontal
    for (let row = 0; row < board[0].length; row++) {
      pieces = [];
      for (let col = 0; col < board.length; col++) pieces.push(board[row][col]);
      score += this.evaluateLine(pieces);
    }
  
    // Vertical
    for (let col = 0; col < board.length; col++) {
      pieces = [];
      for (let row = 0; row < board[0].length; row++) pieces.push(board[row][col]);
      score += this.evaluateLine(pieces);
    }
  
    // Diagonal
    pieces = [];
    for (let pos = 0; pos < board.length; pos++) pieces.push(board[pos][pos]);
    score += this.evaluateLine(pieces);
    
    pieces = [];
    for (let pos = 0; pos < board.length; pos++) pieces.push(board[pos][board.length - pos - 1]);
    score += this.evaluateLine(pieces);
  
    return score;
  }
  
  evaluateLine(pieces) {
    let humanCount = 0, computerCount = 0;
  
    pieces.forEach(piece => {
      if (piece === this.COMPUTER_PIECE) computerCount++; else if (piece === this.HUMAN_PIECE) humanCount++;
    });
  
    if (humanCount === 0 && computerCount === 0) return 0;
    else if (humanCount === 0) return 10 ** (computerCount - 1);
    else if (computerCount === 0) return -1 * (11 ** (humanCount - 1));
    else return 0;
  }
}

export default Computer;
