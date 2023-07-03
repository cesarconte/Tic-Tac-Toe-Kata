const game = {
  currentPlayer: "X",
  board: ["", "", "", "", "", "", "", "", ""],
  winningCombinations: [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
  ],
  isGameOver: false,
  totalMoves: 0,

  switchTurn() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.checkGameOver(); 
  },

  makeMove(index) {
    if (this.isGameOver || this.board[index] !== "") {
      return; 
    }

    this.board[index] = this.currentPlayer;
    this.totalMoves++;
    this.checkGameOver();

    if (this.isGameOver) {
      return; 
    }

    this.switchTurn();
  },

  checkGameOver() {
    for (let combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[a] !== "" &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.isGameOver = true;
        break; 
      }
    }
    if (!this.isGameOver && this.totalMoves === 9) {
      this.isGameOver = true;
    }
  },

  resetGame() {
    this.currentPlayer = "X";
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.isGameOver = false;
    this.totalMoves = 0;
  }
};

module.exports = game;
