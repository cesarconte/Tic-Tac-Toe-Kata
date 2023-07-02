const index = require("./index");

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
    expect(game.currentPlayer).toBe("O"); // Turn should not switch
  });

  it("should check for a win in a column", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.makeMove(3); // X
    game.makeMove(4); // O
    game.makeMove(6); // X (should win)
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("O"); // Turn should not switch
  });

  it("should check for a win in a diagonal", () => {
    game.makeMove(0); // X
    game.makeMove(1); // O
    game.makeMove(4); // X
    game.makeMove(5); // O
    game.makeMove(8); // X (should win)
    expect(game.isGameOver).toBe(true);
    expect(game.currentPlayer).toBe("O"); // Turn should not switch
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
    expect(game.currentPlayer).toBe("O"); // Turn should not switch
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
});