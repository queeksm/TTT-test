import { expect, test } from '@jest/globals';
import {
  writeInCellMOCK,
  drawResultMOCK, MOCKBoard, checkVictoryMOCK, playerMovementMOCK, playerUpdateMOCK,
} from '../scripts/mockFucntions';

const player1 = { name: 'Delta', token: 'X' };
const player2 = { name: 'Gamma', token: 'O' };
const board = MOCKBoard();
const currentPlayer = player1;

test('The function writes the token in a cell indicated by i,j coordinates', () => {
  expect(writeInCellMOCK(1, 2, 'X')).toBe('The value X was written in the cell [1, 2]');
});

test('The function shows the result on the DOM, this will show the victory text for the player1', () => {
  expect(drawResultMOCK('Victory', player1)).toBe('You win Delta');
});

test('The function shows the result on the DOM, this will show the victory text for the player2', () => {
  expect(drawResultMOCK('Victory', player2)).toBe('You win Gamma');
});

test('The function shows the result on the DOM, this will show the draw result', () => {
  expect(drawResultMOCK('Draw', player1)).toBe('Draw');
});

test('The function checks for the victory condition depending on the board state, this checks for a victory through the main diagonal', () => {
  board.updateBoard(0, 0, 'X');
  board.updateBoard(1, 1, 'X');
  board.updateBoard(2, 2, 'X');
  expect(checkVictoryMOCK(board)).toBe('Victory');
});

test('The function checks for the victory condition depending on the board state, this checks for a victory through the secondary diagonal', () => {
  board.cleanBoard();
  board.updateBoard(0, 2, 'X');
  board.updateBoard(1, 1, 'X');
  board.updateBoard(2, 0, 'X');
  expect(checkVictoryMOCK(board)).toBe('Victory');
});

test('The function checks for the victory condition depending on the board state, this checks for a victory through a vertical line', () => {
  board.cleanBoard();
  board.updateBoard(0, 0, 'X');
  board.updateBoard(0, 1, 'X');
  board.updateBoard(0, 2, 'X');
  expect(checkVictoryMOCK(board)).toBe('Victory');
});

test('The function checks for the victory condition depending on the board state, this checks for a victory through a horizontal line', () => {
  board.cleanBoard();
  board.updateBoard(0, 0, 'X');
  board.updateBoard(1, 0, 'X');
  board.updateBoard(2, 0, 'X');
  expect(checkVictoryMOCK(board)).toBe('Victory');
});

test('The function checks for the victory condition depending on the board state, the board is filled and no winner is decided, the function returns a draw', () => {
  board.cleanBoard();
  board.updateBoard(0, 0, 'X');
  board.updateBoard(0, 1, '0');
  board.updateBoard(0, 2, 'X');
  board.updateBoard(1, 0, '0');
  board.updateBoard(1, 1, '0');
  board.updateBoard(1, 2, 'X');
  board.updateBoard(2, 0, 'X');
  board.updateBoard(2, 1, 'X');
  board.updateBoard(2, 2, '0');
  expect(checkVictoryMOCK(board)).toBe('DRAW');
});

test('The function will update the player that is currently playing', () => {  
  expect(playerUpdateMOCK(currentPlayer, player1, player2)).toBe(player2);
});

test('The function will check if the movement of the player is valid', () => {
  board.cleanBoard();
  expect(playerMovementMOCK(1, 1, player1, true, board)).toBe('The player and the board were updated');
});

test('The function will check if the movement of the player is valid, this time the movement will be invalid', () => {
  board.cleanBoard();
  board.updateBoard(1, 1, '0');
  expect(playerMovementMOCK(1, 1, player1, true, board)).toBe('Invalid Movement, try again.');
});

test('The function will check if the movement of the player is valid, this time the movement will be valid and result on a game over', () => {
  board.cleanBoard();
  board.updateBoard(0, 0, 'X');
  board.updateBoard(1, 0, 'X');
  expect(playerMovementMOCK(2, 0, player1, true, board)).toBe('Game over');
});

test('The function will check if is the player turn,if not it will return an error', () => {
  expect(playerMovementMOCK(2, 0, player1, false, board)).toBe('not Flagged');
});