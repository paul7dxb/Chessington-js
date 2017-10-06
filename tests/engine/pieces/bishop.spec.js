import 'chai/register-should';
import Bishop from '../../../src/engine/pieces/bishop';
import Pawn from '../../../src/engine/pieces/pawn';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Board from '../../../src/engine/board';

describe('Bishop', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move diagonally', () => {
        const bishop = new Bishop(Player.WHITE);
        board.setPiece(Square.at(2, 3), bishop);

        const moves = bishop.getAvailableMoves(board);

        const expectedMoves = [
            // Forwards diagonal
            Square.at(0, 1), Square.at(1, 2), Square.at(3, 4), Square.at(4, 5), Square.at(5, 6), Square.at(6, 7),
            // Backwards diagonal
            Square.at(0, 5), Square.at(1, 4), Square.at(3, 2), Square.at(4, 1), Square.at(5, 0)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const bishop = new Bishop(Player.WHITE);
        board.setPiece(Square.at(2, 3), bishop);

        const moves = bishop.getAvailableMoves(board);

        moves.should.have.length(11);
    });

    it('cannot move through friendly pieces', () => {
        const bishop = new Bishop(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), bishop);
        board.setPiece(Square.at(6, 6), friendlyPiece);

        const moves = bishop.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(7, 7));
    });

    it('cannot move through opposing pieces', () => {
        const bishop = new Bishop(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), bishop);
        board.setPiece(Square.at(6, 6), opposingPiece);

        const moves = bishop.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(7, 7));
    });
});
