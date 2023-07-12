import "chai/register-should"
import Board from "../../../src/engine/board"
import Square from "../../../src/engine/square"
import Player from "../../../src/engine/player"
import Queen from "../../../src/engine/pieces/queen"

describe("Queen", () => {
	let board;
    let queen;
	beforeEach(() => {
		board = new Board()
		queen = new Queen(Player.WHITE)
	})

	it("can move in all directions", () => {
		board.setPiece(Square.at(3, 4), queen)

		const moves = queen.getAvailableMoves(board)

		const expectedMoves = [
            // Falling diagonal
			Square.at(7, 0),
			Square.at(6, 1),
			Square.at(5, 2),
			Square.at(4, 3),
			Square.at(2, 5),
			Square.at(1, 6),
			Square.at(0, 7),
            // Rising diagonal
			Square.at(0, 1),
			Square.at(1, 2),
			Square.at(2, 3),
			Square.at(4, 5),
			Square.at(5, 6),
			Square.at(6, 7),
            // Horizontal
			Square.at(3,0),
			Square.at(3,1),
			Square.at(3,2),
			Square.at(3,3),
			Square.at(3,5),
			Square.at(3,6),
			Square.at(3,7),
            // Vertical
			Square.at(0,4),
			Square.at(1,4),
			Square.at(2,4),
			Square.at(4,4),
			Square.at(5,4),
			Square.at(6,4),
			Square.at(7,4),
		]

		moves.should.deep.include.members(expectedMoves)
	})

	it("cannot make any other moves", () => {
		board.setPiece(Square.at(3, 4), queen)
		const moves = queen.getAvailableMoves(board)
		moves.should.have.length(27)
	})
})
