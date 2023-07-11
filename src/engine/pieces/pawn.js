import Player from '../player';
import Square from '../square';
import Piece from './piece';

export default class Pawn extends Piece {
    constructor(player) {
        super(player);
    }

    getAvailableMoves(board) {

        const moves = [];
        
        let location = board.findPiece(this)
        if (this.player === Player.WHITE) {
            moves.push(Square.at(location.row + 1, location.col));

            if(location.row === 1){
                moves.push(Square.at(location.row + 2, location.col));
            }
        } else {
            moves.push(Square.at(location.row - 1, location.col));
            if(location.row === 6){
                moves.push(Square.at(location.row -2, location.col));
            }
        }

        return moves;
    }
}
