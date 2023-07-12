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

        const diagonalMoves = [{row: direction, col:-1}, {row: direction, col:1}];  
        for (let diagonalMove of diagonalMoves )  {
            if (location.col !== 0 && location.col !== 7) {
                const potentialMove = Square.at(
                    location.row + direction,
                    location.col + diagonalMove.col 
                )
                const pieceInSquare = board.getPiece(potentialMove);
    
                // If there is a piece in the square and it belongs to opposing player
                if(pieceInSquare && (pieceInSquare.player !== this.player) && !(pieceInSquare instanceof King)){
                    moves.push(potentialMove);
                }
            }
        }     
        
		

		return moves
	}
}
