import Piece from "./piece"
import Square from "../square"


export default class Rook extends Piece {
	constructor(player) {
		super(player)
	}

	getAvailableMoves(board) {
		let moves = []

		let location = board.findPiece(this)
		let rookDirections = [
			{row:0, col:-1 }, {row:0, col:1 }, {row:1, col:0 },{row:-1, col:0 }
		];

		// find how far piece can go in each direction
		
		for (let rookDirection of rookDirections){
			for( let i = 1; i < 8; i++ ){
				let potentialSquare = Square.at(location.row + rookDirection.row * i, location.col + rookDirection.col * i);
				if(potentialSquare.row >= 0 && potentialSquare.row <= 7 && potentialSquare.col >= 0 && potentialSquare.col <= 7){
					let piece = board.getPiece(potentialSquare);
					if(!piece){
						moves.push(potentialSquare);
						continue;
					}
					if(piece.player !== this.player){
						moves.push(potentialSquare);
					}
					break;
				}
				else {break}
			}	
			
		}

		
		return moves
	}
}
