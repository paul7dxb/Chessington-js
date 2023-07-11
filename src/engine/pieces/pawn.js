import Player from "../player"
import Square from "../square"
import Piece from "./piece"
import Board from "../board"

export default class Pawn extends Piece {
	constructor(player) {
		super(player)
	}

	getAvailableMoves(board) {
		const moves = []
		let direction = (this.player === Player.WHITE) ? 1 : -1;
        let startingPawnRow = (this.player === Player.WHITE) ? 1 : 6;

		let location = board.findPiece(this);

        //find the piece at one square away
        
        let squareInFront = Square.at(location.row + direction, location.col);
        let pieceInFront = board.getPiece(squareInFront);
        if (!pieceInFront){
            moves.push(Square.at(location.row + direction, location.col));

            if (location.row === startingPawnRow) {
                
                let nextSquareInFront = Square.at(location.row + 2* direction, location.col);
                let nextPieceInFront = board.getPiece(nextSquareInFront);
                if (!nextPieceInFront){
                    moves.push(Square.at(location.row + 2 * direction, location.col));
                }
            }

        }

	
		return moves
	}
}
