import Piece from "./piece"
import Square from "../square"


export default class Rook extends Piece {
	constructor(player) {
		super(player)
	}

	getAvailableMoves(board) {
		let moves = []

		let location = board.findPiece(this)

		// Add moves in row
		for (let i = 0; i < 8; i++) {
			if (location.col !== i) {
				moves.push(Square.at(location.row, i))
			}
		}

		// Add moves in column
		for (let i = 0; i < 8; i++) {
			if (location.row !== i) {
				moves.push(Square.at(i, location.col))
			}
		}

		return moves
	}
}
