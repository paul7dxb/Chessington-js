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

        // Get the Pawn's current location
		let location = board.findPiece(this);

        //Get the square one space in front
        let squareInFront = Square.at(location.row + direction, location.col);
        // Check that square for pieces
        let pieceInFront = board.getPiece(squareInFront);

        if (!pieceInFront){
            // Square in front is a valid move
            moves.push(squareInFront);
            // If the Pawn is in the starting row it can move 2 squares
            if (location.row === startingPawnRow) {

                // Find the square two spaces away
                let nextSquareInFront = Square.at(location.row + 2 * direction, location.col);

                // Check the square for pieces
                let nextPieceInFront = board.getPiece(nextSquareInFront);
                if (!nextPieceInFront){
                    // Square two pieces in front is a valid move
                    moves.push(nextSquareInFront);
                }
            }
        }

		return moves
	}
}
