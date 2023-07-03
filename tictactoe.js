// Definir el objeto juego
const game = {
  currentPlayer: "X",
  board: ["", "", "", "", "", "", "", "", ""],
  winningCombinations: [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
    [0, 4, 8], [2, 4, 6] // Diagonales
  ],
  isGameOver: false,
  totalMoves: 0,

  // Método para cambiar el turno de los jugadores
  switchTurn() {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    this.checkGameOver(); // Verificar si el juego ha terminado después de cambiar el turno
  },

  // Método para hacer un movimiento en una casilla
  makeMove(index) {
    if (this.isGameOver || this.board[index] !== "") {
      return; // Si el juego ha terminado o la casilla está ocupada, no se permite hacer más movimientos
    }

    this.board[index] = this.currentPlayer;
    this.totalMoves++;
    this.checkGameOver();

    if (this.isGameOver) {
      return; // Si el juego ha terminado, no se permite hacer más movimientos
    }

    this.switchTurn();
  },

  // Método para comprobar si el juego ha terminado
  checkGameOver() {
    for (let combination of this.winningCombinations) {
      const [a, b, c] = combination;
      if (
        this.board[a] !== "" &&
        this.board[a] === this.board[b] &&
        this.board[a] === this.board[c]
      ) {
        this.isGameOver = true;
        break; // Salir del bucle después de encontrar una combinación ganadora
      }
    }
    if (!this.isGameOver && this.totalMoves === 9) {
      this.isGameOver = true;
    }
  },

  // Método para reiniciar el juego
  resetGame() {
    this.currentPlayer = "X";
    this.board = ["", "", "", "", "", "", "", "", ""];
    this.isGameOver = false;
    this.totalMoves = 0;
  }
};

module.exports = game;
