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
let player = 'X';
let playerX = [];
let playerO = [];


function actionGame(evt) {
    if (evt.target.closest('.game__cell')) {
        addSymbol(evt);
    }
}

gameField.addEventListener('click', actionGame);

function addSymbol(evt) {
    let target = evt.target;
    let cellNumber = +target.getAttribute('cell-number');
    if (target.innerHTML === '') {
        target.innerHTML = player;

        (player === 'X') ? (playerX.push(cellNumber)) : (playerO.push(cellNumber));

    }
    playerTurn.innerHTML = player + '\'s\ turn';

    if (playerX.length < 3) {
        if (player === 'X') {
            player = 'O';
        } else {
            player = 'X';
        }

    } else {
        if (player === 'X') {
            checkIfWin(playerX, cellNumber);
            player = 'O';
        } else {
            checkIfWin(playerO, cellNumber);
            player = 'X';
        }
    }

}


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
                    }
                }
            }
        }
    }
}



