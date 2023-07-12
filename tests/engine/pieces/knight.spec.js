import "chai/register-should"
import Pawn from "../../../src/engine/pieces/pawn"
import Knight from "../../../src/engine/pieces/knight"
import Board from "../../../src/engine/board"
import Square from "../../../src/engine/square"
import Player from "../../../src/engine/player"

describe("Knight", () => {
	let board;
    let knight;

	beforeEach(() => {
		board = new Board()
		knight = new Knight(Player.WHITE)
	})

	it("can make knights moves", () => {
		board.setPiece(Square.at(4, 4), knight)

		const moves = knight.getAvailableMoves(board)

		const expectedMoves = [
			Square.at(2, 5),
			Square.at(2, 3),
			Square.at(3, 6),
			Square.at(3, 2),
			Square.at(5, 6),
			Square.at(5, 2),
			Square.at(6, 5),
			Square.at(6, 3),
		]

		moves.should.deep.include.members(expectedMoves)
	})

	it("cannot make any other moves", () => {
		board.setPiece(Square.at(4, 4), knight)

		const moves = knight.getAvailableMoves(board)

		moves.should.have.length(8)
	})

	it("can jump over other pieces", () => {
		const firstPawn = new Pawn(Player.WHITE)
		const secondPawn = new Pawn(Player.BLACK)
		board.setPiece(Square.at(4, 4), knight)
		board.setPiece(Square.at(3, 4), firstPawn)
		board.setPiece(Square.at(3, 5), secondPawn)

		const moves = knight.getAvailableMoves(board)

		moves.should.deep.include(Square.at(2, 5))
	})

	it("cannot leave the board", () => {
		board.setPiece(Square.at(0, 0), knight)

		const moves = knight.getAvailableMoves(board)

		const expectedMoves = [Square.at(1, 2), Square.at(2, 1)]

		moves.should.deep.have.members(expectedMoves)
	})
	it("cannot take friendly piece", () => {
		board.setPiece(Square.at(4, 4), knight)
		const firstPawn = new Pawn(Player.WHITE)
		board.setPiece(Square.at(5, 6), firstPawn)

		const moves = knight.getAvailableMoves(board)

		const expectedMoves = [
			Square.at(2, 5),
			Square.at(2, 3),
			Square.at(3, 6),
			Square.at(3, 2),
			Square.at(5, 2),
			Square.at(6, 5),
			Square.at(6, 3),
		]

		moves.should.deep.include.members(expectedMoves)
		moves.should.have.length(7)
	})
})
