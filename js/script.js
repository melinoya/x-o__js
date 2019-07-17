'use strict';

const winningCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9]
];

let playerTurn = document.querySelector('.game__turn');
let gameField = document.querySelector('.game__field');
let restartButton = document.querySelector('.game__button');
let player = 'X';
let playerX = [];
let playerO = [];
let turnsCount = 0;


function actionGame(evt) {
    if (evt.target.closest('.game__cell')) {
        addSymbol(evt);
    }
}

function restartGame() {
    let cells = document.querySelectorAll('.game__cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    player = 'X';
    playerTurn.innerHTML = player + '\'s\ turn';
    playerX = [];
    playerO = [];
    turnsCount = 0;
    gameField.addEventListener('click', actionGame);
}

gameField.addEventListener('click', actionGame);
restartButton.addEventListener('click', restartGame);


// checking, if player won or if it's draw

function actionWithPlayers(checkingPlayer, cellNumberCheck, symbol) {
    if (!checkIfWin(checkingPlayer, cellNumberCheck)) {
        if (turnsCount === 9) {
            playerTurn.innerHTML = 'Draw!';
            gameField.removeEventListener('click', actionGame);
        } else {
            player = symbol;
            playerTurn.innerHTML = player + '\'s\ turn';
        }

    }
}


// main action function

function addSymbol(evt) {
    let target = evt.target;
    let cellNumber = +target.getAttribute('cell-number');

    if (target.innerHTML === '') {
        target.innerHTML = player;
        (player === 'X') ? (playerX.push(cellNumber)) : (playerO.push(cellNumber));
    }

    turnsCount++;


    if (playerX.length < 3) {
        if (player === 'X') {
            player = 'O';
        } else {
            player = 'X';
        }
        playerTurn.innerHTML = player + '\'s\ turn';

    } else {
        if (player === 'X') {
            actionWithPlayers(playerX, cellNumber, 'O');

        } else {
            actionWithPlayers(playerO, cellNumber, 'X');
        }

    }

}

// it's checking the possibility of winning

function checkIfWin(arr, number) {
    for (let i = 0; i < winningCombinations.length; i++) {
        let checkCombination = winningCombinations[i];
        let count = 0;

        if (checkCombination.includes(number)) {
            for (let j = 0; j < arr.length; j++) {
                if (checkCombination.includes(arr[j])) {
                    count++;
                    if (count == 3) {
                        gameField.removeEventListener('click', actionGame);
                        playerTurn.innerHTML = player + ' won!';
                        return true;
                    }
                }
            }
        }
    }
}




