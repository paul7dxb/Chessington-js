import Piece from "./piece"
import Square from "../square"

export default class Knight extends Piece {
	constructor(player) {
		super(player)
	}

	getAvailableMoves(board) {
		let moves = []
		let location = board.findPiece(this)

		const directions = [
			{ row: -1, col: 2 },
			{ row: -1, col: -2 },
			{ row: -2, col: -1 },
			{ row: -2, col: 1 },
			{ row: 1, col: 2 },
			{ row: 1, col: -2 },
			{ row: 2, col: 1 },
			{ row: 2, col: -1 },
		]

		for (let direction of directions) {
			const potentialSquare = Square.at(
				location.row + direction.row,
				location.col + direction.col
			)
			if (
				potentialSquare.row >= 0 &&
				potentialSquare.row <= 7 &&
				potentialSquare.col >= 0 &&
				potentialSquare.col <= 7
			) {
				const piece = board.getPiece(potentialSquare)
				if (!piece) {
					moves.push(potentialSquare)
					// }else if (piece.player !== this.player && !(piece instanceof King)) {
				} else if (piece.player !== this.player) {
					moves.push(potentialSquare)
				}
			}
		}
        return moves;
	}
}
