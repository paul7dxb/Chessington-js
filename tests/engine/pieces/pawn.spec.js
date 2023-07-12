import 'chai/register-should';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';

describe('Pawn', () => {

    let board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {
        
        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });


        it('Take opposing piece LHS', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Pawn(Player.BLACK);

            board.setPiece(Square.at(5, 3), opposingPiece);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('Take opposing piece RHS', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Pawn(Player.BLACK);

            board.setPiece(Square.at(5, 5), opposingPiece);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 5));
        });

        it('En Passant move available after opposing pawn makes double move LHS', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Pawn(Player.BLACK);

            board.setPiece(Square.at(6, 3), opposingPiece);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPlayerBlack();
            opposingPiece.moveTo(board, Square.at(4, 3));

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('En Passant move available after opposing pawn makes double move RHS', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Pawn(Player.BLACK);

            board.setPiece(Square.at(6, 5), opposingPiece);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPlayerBlack();
            opposingPiece.moveTo(board, Square.at(4, 5));

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 5));
        });

        it('Cannot En Passant if another move occurs', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Pawn(Player.BLACK);
            const opposingPieceExtraMove = new Pawn(Player.BLACK);

            board.setPiece(Square.at(6, 5), opposingPiece);
            board.setPiece(Square.at(6, 0), opposingPieceExtraMove);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPlayerBlack();
            opposingPiece.moveTo(board, Square.at(4, 5));
            board.setPlayerBlack();
            opposingPieceExtraMove.moveTo(board, Square.at(4, 0));

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.not.include(Square.at(5, 5));
        });


    });

    describe('black pawns', () => {

        let board;
        beforeEach(() => board = new Board(Player.BLACK));    
        
        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoves(board);
            
            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });
    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });

    
    it('Take opposing piece LHS', () => {
        const pawn = new Pawn(Player.BLACK);
        const opposingPiece = new Pawn(Player.WHITE);

        board.setPiece(Square.at(3, 3), opposingPiece);
        board.setPiece(Square.at(4, 4), pawn);

        const moves = pawn.getAvailableMoves(board);

        moves.should.deep.include(Square.at(3, 3));
    });

    it('Take opposing piece RHS', () => {
        const pawn = new Pawn(Player.BLACK);
        const opposingPiece = new Pawn(Player.WHITE);

        board.setPiece(Square.at(3, 5), opposingPiece);
        board.setPiece(Square.at(4, 4), pawn);

        const moves = pawn.getAvailableMoves(board);

        moves.should.deep.include(Square.at(3, 5));
    });

    it('En Passant move available after opposing pawn makes double move LHS', () => {
        const pawn = new Pawn(Player.BLACK);
        const opposingPiece = new Pawn(Player.WHITE);

        board.setPiece(Square.at(1, 3), opposingPiece);
        board.setPiece(Square.at(3, 4), pawn);
        opposingPiece.moveTo(board, Square.at(3, 3));

        const moves = pawn.getAvailableMoves(board);

        moves.should.deep.include(Square.at(2, 3));
    });

    it('En Passant move available after opposing pawn makes double move RHS', () => {
        const pawn = new Pawn(Player.BLACK);
        const opposingPiece = new Pawn(Player.WHITE);

        board.setPiece(Square.at(1, 5), opposingPiece);
        board.setPiece(Square.at(3, 4), pawn);
        opposingPiece.moveTo(board, Square.at(3, 5));

        const moves = pawn.getAvailableMoves(board);

        moves.should.deep.include(Square.at(2, 5));
    });

    it('Cannot En Passant if another move occurs', () => {
        const pawn = new Pawn(Player.BLACK);
        const opposingPiece = new Pawn(Player.WHITE);
        const opposingPieceExtraMove = new Pawn(Player.WHITE);

        board.setPiece(Square.at(1, 5), opposingPiece);
        board.setPiece(Square.at(1, 0), opposingPieceExtraMove);
        board.setPiece(Square.at(3, 4), pawn);
        opposingPiece.moveTo(board, Square.at(3, 5));
        board.setPlayerWhite();
        opposingPieceExtraMove.moveTo(board, Square.at(3, 0));

        const moves = pawn.getAvailableMoves(board);

        moves.should.deep.not.include(Square.at(2, 5));
    });


});
