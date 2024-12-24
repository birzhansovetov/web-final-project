const playerForm = document.getElementById('playerForm');
const gameBoard = document.getElementById('gameBoard');
const winnerDisplay = document.getElementById('winnerDisplay');
const scoreBoard = document.getElementById('scoreBoard');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const player1ScoreDisplay = document.getElementById('player1Score');
const player2ScoreDisplay = document.getElementById('player2Score');

let players = [];
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

let scores = { X: 0, O: 0 };

function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.dataset.index = index;
        cellDiv.textContent = cell;

        if (cell === 'X') {
            cellDiv.classList.add('blue');
        } else if (cell === 'O') {
            cellDiv.classList.add('red');
        }

        cellDiv.addEventListener('click', handleMove);
        gameBoard.appendChild(cellDiv);
    });
    updateCurrentPlayer();
}

function handleMove(event) {
    const index = event.target.dataset.index;

    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        // Устанавливаем цвет в зависимости от текущего игрока
        if (currentPlayer === 'X') {
            event.target.classList.add('blue');
        } else {
            event.target.classList.add('red');
        }

        event.target.classList.add('taken');

        if (checkWinner()) {
            winnerDisplay.textContent = `Победил ${players[currentPlayer]} (${currentPlayer})!`;
            scores[currentPlayer]++;
            updateScore();
            gameOver = true;
        } else if (board.every(cell => cell !== '')) {
            winnerDisplay.textContent = 'Ничья!';
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateCurrentPlayer();
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function updateCurrentPlayer() {
    currentPlayerDisplay.textContent = `Ходит: ${players[currentPlayer]} (${currentPlayer})`;
}

function updateScore() {
    player1ScoreDisplay.textContent = `${players['X']} (X): ${scores['X']}`;
    player2ScoreDisplay.textContent = `${players['O']} (O): ${scores['O']}`;
}

playerForm.addEventListener('submit', event => {
    event.preventDefault();
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    players = { X: player1, O: player2 };
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    winnerDisplay.textContent = '';

    createBoard();
    currentPlayerDisplay.classList.remove('d-none');
    gameBoard.classList.remove('d-none');
    scoreBoard.classList.remove('d-none');
    updateScore();
});
