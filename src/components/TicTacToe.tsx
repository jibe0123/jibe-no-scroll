import { useState } from 'react';

type Player = 'X' | 'O' | null;

export const TicTacToe = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const calculateWinner = (squares: Player[]): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every((square) => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-900/20 to-background/50 p-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">⭕ Morpion</h2>
        {!winner && (
          <p className="text-lg text-primary font-bold">
            Joueur: {isXNext ? 'X' : 'O'}
          </p>
        )}
        {winner && (
          <p className="text-xl font-bold text-primary">
            {winner === 'Draw' ? 'Match nul!' : `${winner} gagne!`}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 bg-background border-2 border-primary/50 rounded-lg flex items-center justify-center text-4xl font-bold hover:bg-secondary/50 transition-colors disabled:cursor-not-allowed"
            disabled={!!cell || !!winner}
          >
            {cell && (
              <span className={cell === 'X' ? 'text-blue-500' : 'text-red-500'}>
                {cell}
              </span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Nouvelle partie
      </button>
    </div>
  );
};
