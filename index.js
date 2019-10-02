const allCells = Array.from(document.getElementsByClassName('cell-value'));
let userFilledCells = [];
let computerFilledCells = [];
let winCombinationArray = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]
];

const playGame = cell => {
  const indexOfCell = [].indexOf.call(allCells, cell);
  if (cell.innerHTML.length < 1) {
    (function playUserTurn() {
      cell.innerHTML = '<p>x</p>';
      userFilledCells.push(indexOfCell);
      userFilledCells = [...new Set(userFilledCells)].sort();
      winCombinationArray.forEach(winCombination => {
        if (winCombination.every(val => userFilledCells.includes(val))){
          alert('you win!');
          window.location.reload();
          winCombinationArray = [];
        }
      });
    })();

    (function playComputerTurn() {
      const allCellIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const filledCellIndexes = [...computerFilledCells, ...userFilledCells];
        const emptyCellIndexes = allCellIndexes.filter(cell => !filledCellIndexes.includes(cell));
        const randomEmptyCellIndex = emptyCellIndexes[
          Math.floor(Math.random() * emptyCellIndexes.length) + 0
        ];
        allCells[randomEmptyCellIndex].innerHTML = '<p>o</p>';
        computerFilledCells.push(randomEmptyCellIndex);
        winCombinationArray.forEach(winCombination => {
          if (winCombination.every(val => computerFilledCells.includes(val))){
            alert('you lose!');
            window.location.reload();
          }
        });
    })();
  }
};

allCells.map(cell => cell.addEventListener('click', () => playGame(cell)));
