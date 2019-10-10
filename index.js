const allCells = Array.from(document.getElementsByClassName('cell-value'));
const winStatus = document.getElementById('winStatus');
let userFilledCells = [];
let computerFilledCells = [];
let turn = 'user';
let gameOver = false;
let winCombinationArray = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]
];

const playGame = cell => {
  const indexOfCell = [].indexOf.call(allCells, cell);
  if (!gameOver && cell.innerHTML.length < 1) {
    (function playUserTurn() {
      cell.innerHTML = '<p>x</p>';
      userFilledCells.push(indexOfCell);
      userFilledCells = [...new Set(userFilledCells)].sort();
      winCombinationArray.forEach(winCombination => {
        if (winCombination.every(val => userFilledCells.includes(val))){
          gameOver = true;
          winStatus.style.display = 'block';
          winStatus.innerHTML = 'You win!';
        }
      });
    })();

    !gameOver && (function playComputerTurn() {
      const allCellIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const filledCellIndexes = [...computerFilledCells, ...userFilledCells];
      const emptyCellIndexes = allCellIndexes.filter(cell => !filledCellIndexes.includes(cell));
      const randomEmptyCellIndex = emptyCellIndexes[
        Math.floor(Math.random() * emptyCellIndexes.length) + 0
      ];
      let computerWinCell, userWinCell;

      if (emptyCellIndexes.length < 1) {
        gameOver = true;
        winStatus.style.display = 'block';
        winStatus.innerHTML = "It's a tie!";
      }

        computerFilledCells.length > 1 && winCombinationArray.some(winCombination => {
          const intersection = winCombination.filter(element => computerFilledCells.includes(element));
          intersection.length > 1 && winCombination.map(element => {
            if(!intersection.includes(element) && emptyCellIndexes.includes(element)) {
              computerWinCell = element;
            }
          });

          return (intersection.length > 1 && computerWinCell);
        })

        !computerWinCell && userFilledCells.length > 1 && winCombinationArray.some(winCombination => {
          const intersection = winCombination.filter(element => userFilledCells.includes(element));
          intersection.length > 1 && winCombination.map(element => {
            if(!intersection.includes(element) && emptyCellIndexes.includes(element)) {
              userWinCell = element;
            }
          });

          return (intersection.length > 1 && userWinCell);
        })

      // zero is falsy, hence the comparison to undefined
      const cellToBePlayed = (computerWinCell != undefined ? computerWinCell
        : userWinCell != undefined ? userWinCell
        : randomEmptyCellIndex);

      allCells[cellToBePlayed].innerHTML = '<p>o</p>';
      computerFilledCells.push(cellToBePlayed);
      winCombinationArray.forEach(winCombination => {
        if (winCombination.every(val => computerFilledCells.includes(val))){
          gameOver = true;
          winStatus.style.display = 'block';
          winStatus.innerHTML = 'You lose!';
        }
      });
    })();
  }
};

const replayButton = document.getElementById('replayButton');
const replayGame = () => {
  allCells.map(cell => cell.innerHTML = '');
  userFilledCells = [];
  computerFilledCells = [];
  winStatus.style.display = 'none';
  gameOver = false;
}

allCells.map(cell => cell.addEventListener('click', () => playGame(cell)));
replayButton.addEventListener('click', () => replayGame());
