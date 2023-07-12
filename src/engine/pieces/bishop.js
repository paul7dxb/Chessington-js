// import Piece from './piece';
import RayPiece from "./rayPiece"

export default class Bishop extends RayPiece {
	constructor(player) {
		const directions = [
			{ row: -1, col: -1 },
			{ row: 1, col: 1 },
			{ row: 1, col: -1 },
			{ row: -1, col: 1 },
		]
		super(player, directions)
	}
}
