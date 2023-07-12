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
		let opposingPawnStartingRow = this.player === Player.WHITE ? 6 : 1
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

		// Check diagonal left for opposing piece
		if (location.col !== 0 ) {
			const potentialMove = Square.at(
				location.row + direction,
				location.col -1
			)
			const pieceInSquare = board.getPiece(potentialMove);

			// If there is a piece in the square and it belongs to opposing player
			if(pieceInSquare && (pieceInSquare.player !== this.player) && !(pieceInSquare instanceof King)){
				moves.push(potentialMove);
			}
		}
		// Check diagonal right for opposing piece
		if (location.col !== 7 ) {
			const potentialMove = Square.at(
				location.row + direction,
				location.col + 1
			)
			const pieceInSquare = board.getPiece(potentialMove);

			// If there is a piece in the square and it belongs to opposing player
			if(pieceInSquare && (pieceInSquare.player !== this.player) && !(pieceInSquare instanceof King)){
				moves.push(potentialMove);
			}
		}


		// Check enPassant left
		if(location.col > 0){
			// Check next to pawn
			const potentialPieceLocation = Square.at(
				location.row,
				location.col - 1 
			)
			let potentialPiece = board.getPiece(potentialPieceLocation);
			if(potentialPiece instanceof Pawn){
				// Confirm last move was by that pawn
				const lastMove = board.getLastMove();
				if(lastMove.pawnMove && lastMove.to.row === potentialPieceLocation.row && lastMove.to.col === potentialPieceLocation.col && lastMove.from.row === opposingPawnStartingRow){
					moves.push(Square.at(
						location.row + direction,
						location.col - 1 
					))
				}
			}
		}

		// Check enPassant right
		if(location.col < 7){
			// Check next to pawn
			const potentialPieceLocation = Square.at(
				location.row,
				location.col + 1 
			)
			let potentialPiece = board.getPiece(potentialPieceLocation);
			if(potentialPiece instanceof Pawn){
				// Confirm last move was by that pawn
				const lastMove = board.getLastMove();
				if(lastMove.pawnMove && lastMove.to.row === potentialPieceLocation.row && lastMove.to.col === potentialPieceLocation.col && lastMove.from.row === opposingPawnStartingRow){
					moves.push(Square.at(
						location.row + direction,
						location.col + 1 
					))
				}
			}
		}
        
		

		return moves
	}
}
