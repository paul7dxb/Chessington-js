import 'chai/register-should';
import Rook from '../../../src/engine/pieces/rook';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';

describe('Rook', () => {

    let board;
    beforeEach(() => board = new Board());

    it('can move laterally', () => {
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(1, 2), rook);

        const moves = rook.getAvailableMoves(board);

        const expectedMoves = [
            // Horizontal
            Square.at(1, 0), Square.at(1, 1), Square.at(1, 3), Square.at(1, 4), Square.at(1, 5), Square.at(1, 6), Square.at(1, 7),
            // Vertical
            Square.at(0, 2), Square.at(2, 2), Square.at(3, 2), Square.at(4, 2), Square.at(5, 2), Square.at(6, 2), Square.at(7, 2)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const rook = new Rook(Player.WHITE);
        board.setPiece(Square.at(1, 2), rook);

        const moves = rook.getAvailableMoves(board);

        moves.should.have.length(14);
    });
});
