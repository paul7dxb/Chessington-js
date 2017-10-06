import Player from "../player"
import Square from "../square"
import Piece from "./piece"
import King from "./king"

export default class Pawn extends Piece {
	constructor(player) {
		super(player)
	}

	getAvailableMoves(board) {
		const moves = []
		let direction = this.player === Player.WHITE ? 1 : -1
		let startingPawnRow = this.player === Player.WHITE ? 1 : 6
		let lastPawnRow = this.player === Player.WHITE ? 7 : 0

		// Get the Pawn's current location
		let location = board.findPiece(this)

		// Prevent movement at end of board
		if (location.row === lastPawnRow) {
			return []
		}

		//Get the square one space in front
		let squareInFront = Square.at(location.row + direction, location.col)
		// Check that square for pieces
		let pieceInFront = board.getPiece(squareInFront)

		if (!pieceInFront) {
			// Square in front is a valid move
			moves.push(squareInFront)
			// If the Pawn is in the starting row it can move 2 squares
			if (location.row === startingPawnRow) {
				// Find the square two spaces away
				let nextSquareInFront = Square.at(
					location.row + 2 * direction,
					location.col
				)

				// Check the square for pieces
				let nextPieceInFront = board.getPiece(nextSquareInFront)
				if (!nextPieceInFront) {
					// Square two pieces in front is a valid move
					moves.push(nextSquareInFront)
				}
			}
		}

		// Check diagonal for opposing piece

        // Diagonal left
		if (location.col !== 0) {
			const diagonalMoveLeft = Square.at(
				location.row + direction,
				location.col - 1
			)
            const pieceInDiagonalLeft = board.getPiece(diagonalMoveLeft);

            // If there is a piece in the square and it belongs to opposing player
            if(pieceInDiagonalLeft && (pieceInDiagonalLeft.player !== this.player) && !(pieceInDiagonalLeft instanceof King)){
                moves.push(diagonalMoveLeft);
            }
		}

        // Diagonal right
		if (location.col !== 7) {
			const diagonalMoveRight = Square.at(
				location.row + direction,
				location.col + 1
			)
            const pieceInDiagonalRight = board.getPiece(diagonalMoveRight);
            // Check not a King Piece
            // If there is a piece in the square and it belongs to opposing player
            if(pieceInDiagonalRight && (pieceInDiagonalRight.player !== this.player) && !(pieceInDiagonalRight instanceof King)){
                moves.push(diagonalMoveRight);
            }
		}

		return moves
	}
}
