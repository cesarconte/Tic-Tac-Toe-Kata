const game = require("../tictactoe");

describe("Tic Tac Toe", () => {
  beforeEach(() => {
    game.resetGame();
  });

  it("should switch turns correctly", () => {
    expect(game.currentPlayer).toBe("X");
    game.switchTurn();
    expect(game.currentPlayer).toBe("O");
    game.switchTurn();
    expect(game.currentPlayer).toBe("X");
  });

  it("should make a move correctly", () => {
    game.makeMove(0);
    expect(game.board[0]).toBe("X");
    expect(game.currentPlayer).toBe("O");
    expect(game.totalMoves).toBe(1);
  });

  it("should not allow a move in an occupied cell", () => {
    game.makeMove(0);
    game.makeMove(0);
    expect(game.board[0]).toBe("X");
    expect(game.currentPlayer).toBe("O");
    expect(game.totalMoves).toBe(1);
  });

  it("should check for a win in a row", () => {
    game.makeMove(0); // X
    game.makeMove(3); // O
    game.makeMove(1); // X
    game.makeMove(4); // O
    game.makeMove(2); // X (should win)
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("X"); // Turn should not switch
  });

  it("should check for a win in a column", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.makeMove(3); // X
    game.makeMove(4); // O
    game.makeMove(6); // X (should win)
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("X"); // Turn should not switch
  });

  it("should check for a win in a diagonal", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.makeMove(4); // X
    game.makeMove(5); // O
    game.makeMove(8); // X (should win)
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("X"); // Turn should not switch
  });

  it("should detect a draw", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.makeMove(2); // X
    game.makeMove(4); // O
    game.makeMove(3); // X
    game.makeMove(5); // O
    game.makeMove(7); // X
    game.makeMove(6); // O
    game.makeMove(8); // X (should be a draw)
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("X"); // Turn should not switch
  });

  it("should reset the game correctly", () => {
    game.makeMove(0);
    game.makeMove(1);
    game.makeMove(4);
    game.makeMove(5);
    game.resetGame();
    expect(game.currentPlayer).toBe("X");
    expect(game.board).toEqual(["", "", "", "", "", "", "", "", ""]);
    expect(game.isGameOver).toBe(false);
    expect(game.totalMoves).toBe(0);
  });
  it("should not allow moves after the game is over", () => {
    game.makeMove(0); // X
    game.makeMove(3); // O
    game.makeMove(1); // X
    game.makeMove(4); // O
    game.makeMove(2); // X (should win)
    // The game is over, X has won
    game.makeMove(5); // This move should not be allowed
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("X"); // Turn should not switch
    expect(game.totalMoves).toBe(5); // Total moves should not increase
    expect(game.board[5]).toBe(""); // Cell should remain empty
  });

  it("should not allow moves in an invalid index", () => {
    game.makeMove(0); // X
    game.makeMove(3); // O
    game.makeMove(1); // X
    // Invalid index, outside the board range
    game.makeMove(9);
    expect(game.isGameOver).toBe(false); // Game should continue
    expect(game.currentPlayer).toBe("O"); // Turn should switch to O
    expect(game.totalMoves).toBe(3); // Total moves should increase
    expect(game.board[9]).toBe(undefined); // Invalid index should not affect the board
  });

  it("should allow making moves after resetting the game", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.resetGame();
    game.makeMove(2); // X
    game.makeMove(3); // O
    expect(game.isGameOver).toBe(false); // Game should continue
    expect(game.currentPlayer).toBe("X"); // Turn should switch to X
    expect(game.totalMoves).toBe(2); // Total moves should reset to 2
    expect(game.board[0]).toBe(""); // Cell from previous game should be empty
    expect(game.board[1]).toBe(""); // Cell from previous game should be empty
    expect(game.board[2]).toBe("X"); // New move should be correctly made
    expect(game.board[3]).toBe("O"); // New move should be correctly made
  });

  it("should not allow a move after the game is won", () => {
    game.makeMove(0); // X
    game.makeMove(3); // O
    game.makeMove(1); // X
    game.makeMove(4); // O
    game.makeMove(2); // X (game is won)

    expect(game.currentPlayer).toBe("X");
    expect(game.totalMoves).toBe(5);

    // Intentar hacer un movimiento adicional después de que el juego se haya ganado
    game.makeMove(5);

    expect(game.currentPlayer).toBe("X");
    expect(game.totalMoves).toBe(5);
  });

  it("should not allow a move after the game is drawn", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.makeMove(2); // X
    game.makeMove(4); // O
    game.makeMove(3); // X
    game.makeMove(5); // O
    game.makeMove(7); // X
    game.makeMove(6); // O
    game.makeMove(8); // X (should be a draw)
    // El juego ha terminado, el resultado es un empate
    game.makeMove(9); // Este movimiento no debería ser permitido
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("X"); // El turno no debería cambiar
    expect(game.totalMoves).toBe(9); // El número total de movimientos no debería aumentar
    expect(game.board[9]).toBeUndefined(); // El índice inválido no debería afectar al tablero
  });

  it("should not allow a move in an invalid index", () => {
    game.makeMove(0); // X
    game.makeMove(3); // O
    game.makeMove(1); // X
    // Invalid index, outside the board range
    game.makeMove(9);
    expect(game.isGameOver).toBe(false); // Game should continue
    expect(game.currentPlayer).toBe("O"); // Turn should switch to O
    expect(game.totalMoves).toBe(3); // Total moves should increase
    expect(game.board[9]).toBeUndefined(); // Invalid index should not affect the board
  });

  it("should allow making moves after resetting the game", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.resetGame();
    game.makeMove(2); // X
    game.makeMove(3); // O
    expect(game.isGameOver).toBe(false); // Game should continue
    expect(game.currentPlayer).toBe("X"); // Turn should switch to X
    expect(game.totalMoves).toBe(2); // Total moves should reset to 2
    expect(game.board[0]).toBe(""); // Cell from previous game should be empty
    expect(game.board[1]).toBe(""); // Cell from previous game should be empty
    expect(game.board[2]).toBe("X"); // New move should be correctly made
    expect(game.board[3]).toBe("O"); // New move should be correctly made
  });

  it("should correctly handle multiple game instances", () => {
    const game1 = Object.assign({}, game);
    const game2 = Object.assign({}, game);

    // Game 1 moves
    game1.makeMove(0); // X
    game1.makeMove(1); // O
    game1.makeMove(4); // X
    game1.makeMove(5); // O
    game1.makeMove(8); // X (should win)

    // Game 2 moves
    game2.makeMove(0); // X
    game2.makeMove(1); // O
    game2.makeMove(2); // X
    game2.makeMove(4); // O
    game2.makeMove(3); // X
    game2.makeMove(5); // O
    game2.makeMove(7); // X
    game2.makeMove(6); // O
    game2.makeMove(8); // X (should be a draw)

    expect(game1.isGameOver).toBe(true);
    expect(game1.currentPlayer).toBe("X");
    expect(game2.isGameOver).toBe(true);
    expect(game2.currentPlayer).toBe("X");
  });


  it("should handle edge cases correctly", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.makeMove(2); // X
    game.makeMove(4); // O
    game.makeMove(3); // X
    game.makeMove(5); // O
    game.makeMove(7); // X
    game.makeMove(6); // O
    game.makeMove(8); // X (should be a draw)

    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("X");
    expect(game.totalMoves).toBe(9);
    expect(game.board).toEqual(["X", "O", "X", "X", "O", "O", "O", "X", "X"]);

    game.makeMove(2); // This move should not be allowed
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("X");
    expect(game.totalMoves).toBe(9);
    expect(game.board).toEqual(["X", "O", "X", "X", "O", "O", "O", "X", "X"]);
  });

  it("should handle invalid moves gracefully", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.makeMove(2); // X
    game.makeMove(4); // O
    game.makeMove(3); // X
    game.makeMove(5); // O

    // Invalid move: cell already occupied
    game.makeMove(5);
    expect(game.isGameOver).toBe(false);
    expect(game.currentPlayer).toBe("X");
    expect(game.totalMoves).toBe(6);
    expect(game.board).toEqual(["X", "O", "X", "X", "O", "O", "", "", ""]);

    // Invalid move: index out of range
    game.makeMove(10);
    expect(game.isGameOver).toBe(false);
    expect(game.currentPlayer).toBe("X");
    expect(game.totalMoves).toBe(6);
    expect(game.board).toEqual(["X", "O", "X", "X", "O", "O", "", "", ""]);
  });
});

