import Piece from "./piece"
import Square from "../square"
import King from "./king"
import RayPiece from "./rayPiece"

export default class Rook extends RayPiece {
	constructor(player) {
		const directions = [
			{ row: 0, col: -1 },
			{ row: 0, col: 1 },
			{ row: 1, col: 0 },
			{ row: -1, col: 0 },
		]
		super(player, directions)
	}

}
