document.addEventListener('DOMContentLoaded', () => gameHundler());

function gameHundler() {
  const gameContainer = document.querySelector('.container');
  const secretWord = ['f', 'l', 'a', 'm', 'e', 't', 'h', 'r', 'o', 'w'];
  let choosenCells = [];
  let choosenWord = [];
  let endGame = false;
  const lettersSymbols = [
    ['a', 'ㄱ'],
    ['b', 'ㄴ'],
    ['c', 'ㄷ'],
    ['d', 'ㅁ'],
    ['e', 'ㅅ'],
    ['f', 'ㅇ'],
    ['g', 'ㅆ'],
    ['h', 'ㅋ'],
    ['i', 'ㅌ'],
    ['i', 'ㅌ'],
    ['j', 'ㅐ'],
    ['k', 'ㅓ'],
    ['l', 'ㅕ'],
    ['m', 'ㅗ'],
    ['n', 'ㅜ'],
    ['o', 'ㅠ'],
    ['p', 'ㅟ'],
    ['q', 'ㅥ'],
    ['r', 'ㅨ'],
    ['s', 'ㅱ'],
    ['t', 'ㆁ'],
    ['u', 'ㅺ'],
    ['v', 'ㅿ'],
    ['w', 'ㆀ'],
    ['x', 'ㅸ'],
    ['y', 'ㆆ'],
    ['z', 'ㄾ']
  ];

  lettersSymbols.forEach((letterSymbol) =>
    gameContainer.append(createCell(letterSymbol[0], letterSymbol[1]))
  );

  function createCell(letter, symbol) {
    let cell = document.createElement('div');
    cell.classList.add('cell');
    cell.classList.add('not-choosen');
    cell.dataset.letter = letter;
    cell.textContent = symbol;
    cell.addEventListener('click', (evt) => guessWordHandler(evt));
    return cell;
  }

  function guessWordHandler(evt) {
    choosenCells.push(evt.target);
    let isRightSymbol = secretWord.includes(evt.target.dataset.letter);
    evt.target.classList.add('choosen');
    if (isRightSymbol) {
      choosenWord.push(evt.target.dataset.letter);
      playSucces();
    } else {
      playWrong();
      resetGame();
    }

    if (choosenWord.length === 10) {
      const choosenWordSort = choosenWord.sort();
      endGame = secretWord.sort().every(function (value, index) {
        return value === choosenWordSort[index];
      });
      if (endGame) {
        let cells = gameContainer.querySelectorAll('.cell');
        cells.forEach((cell) => {
          cell.classList.remove('not-choosen');
          cell.classList.remove('choosen');
          cell.classList.add('double');
          cell.textContent = `${cell.dataset.letter.toUpperCase()} ${
            cell.textContent
          }`;
        });
        showNotification('Goed Gedaan!', 6000);
      } else {
        showNotification('Nope, one more time', 1500);
        resetGame();
      }
    }
  }

  function resetGame() {
    choosenCells.forEach((cell) => cell.classList.remove('choosen'));
    choosenCells = [];
    choosenWord = [];
    endGame = false;
  }

  function showNotification(text, delay) {
    const notification = document.querySelector('.notification');
    notification.textContent = text;
    notification.style.visibility = 'visible';
    setTimeout(() => {
      notification.style.visibility = 'hidden';
    }, delay);
  }

  function playSucces() {
    const soundEffect = new Audio();
    soundEffect.autoplay = true;
    soundEffect.src =
      'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    soundEffect.src = './sounds/right.mp3';
  }

  function playWrong() {
    const soundEffect = new Audio();
    soundEffect.autoplay = true;
    soundEffect.src =
      'data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    soundEffect.src = './sounds/wrong.mp3';
  }
}
