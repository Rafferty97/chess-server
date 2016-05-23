export const EMPTY = -1;
export const [ PAWN, RUCK, KNIGHT, BISHOP, QUEEN, KING ] = [0, 1, 2, 3, 4, 5];
export const [ WHITE, BLACK ] = [0, 6];
export const pieceType = (n) => (n == -1 ? -1 : n % 6);
export const pieceColour = (n) => (n - pieceType(n));
