import Piece from "./piece"
import Square from "../square"
import King from "./king"


export default class RayPiece extends Piece {
	constructor(player) {
		super(player);
	}

	getAvailableMoves(board) {
		let moves = []

		let location = board.findPiece(this)

        const rayPieceDirections = this.directions;

		// find how far piece can go in each direction
		for (let rayPieceDirection of rayPieceDirections){
			for( let i = 1; i < 8; i++ ){
				const potentialSquare = Square.at(location.row + rayPieceDirection.row * i, location.col + rayPieceDirection.col * i);
				if(potentialSquare.row >= 0 && potentialSquare.row <= 7 && potentialSquare.col >= 0 && potentialSquare.col <= 7){
					const piece = board.getPiece(potentialSquare);
					if(!piece){
						moves.push(potentialSquare);
						continue;
					}
					if(piece.player !== this.player && !(piece instanceof King)){
						moves.push(potentialSquare);
					}
					// Reached another piece so can't go further
					break;
				}
				else {
					// Off the board so stop moving
					break;
				}
			}	
		}

		
		return moves
	}
}
