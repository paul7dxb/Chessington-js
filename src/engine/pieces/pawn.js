import Player from "../player"
import Square from "../square"
import Piece from "./piece"

export default class Pawn extends Piece {
	constructor(player) {
		super(player)
	}

	getAvailableMoves(board) {
		const moves = []
		let direction = (this.player === Player.WHITE) ? 1 : -1;
        let startingPawnRow = (this.player === Player.WHITE) ? 1 : 6;

		let location = board.findPiece(this);

		moves.push(Square.at(location.row + direction, location.col));

		if (location.row === startingPawnRow) {
			moves.push(Square.at(location.row + 2 * direction, location.col));
		}

		return moves
	}
}
