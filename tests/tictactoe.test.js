const game = require("../tictactoe");

// Pruebas del juego con Jest
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

});