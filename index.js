let scores = JSON.parse(localStorage.getItem('scores')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

let generating = false;
let intervalID;
function generator() {
  const generatorElement = document.querySelector('.js-auto-button');
  if (!generating && generatorElement.innerHTML === 'Auto Play') {
    generatorElement.innerHTML = 'Stop generating';
    intervalID = setInterval(() => {
      const playerMove = autoPlay();
      playGame(playerMove);
    }, 1000);
    generating = true;
  }
  else {
    generatorElement.innerHTML = 'Auto Play';
    clearInterval(intervalID);
    generating = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  }
  
  if(event.key === 'p'){
    playGame('Paper');
  }

  if(event.key === 's'){
    playGame('Scissors');
  }
});


function playGame(playerMove) {
  const computerMove = autoPlay();
  let result = '';
  if (playerMove === 'Rock') {

    if (computerMove === 'Rock') {
      result = 'Tie';
    }

    if (computerMove === 'Scissors') {
      result = 'You win';
    }

    if (computerMove === 'Paper') {
      result = 'You lose';
    }
  }

  if (playerMove === 'Paper') {

    if (computerMove === 'Rock') {
      result = 'You win'
    }

    if (computerMove === 'Scissors') {
      result = 'You lose'
    }

    if (computerMove === 'Paper') {
      result = 'Tie'
    }
  }

  if (playerMove === 'Scissors') {

    if (computerMove === 'Rock') {
      result = 'You lose';
    }

    if (computerMove === 'Scissors') {
      result = 'Tie';
    }

    if (computerMove === 'Paper') {
      result = 'You win'
    }
  }

  if (result === 'You win') {
    scores.wins++;
  }

  if (result === 'You lose') {
    scores.losses++;
  }

  if (result === 'Tie') {
    scores.ties++;
  }

  localStorage.setItem('scores', JSON.stringify(scores));
  updateElementScore();
  document.querySelector('.js-result').innerHTML = `<p class = "css-result">${result}</p>`;
  document.querySelector('.js-choice').innerHTML = `<div class = "button-container"><p class = "who-css">You</p><img src = 
"images/${playerMove}-emoji.png" class = "icon-result"> <p class = "who-css">Computer</p> <img src = "images/${computerMove}-emoji.png" class = "icon-result"></div>`;
}

function updateElementScore() {
  document.querySelector('.js-scores').innerHTML = `<p class = "report-css"> Wins: ${scores.wins}, Losses: ${scores.losses},Ties:  ${scores.ties}</p>`;
}

function autoPlay() {
  let randomNum = Math.random();
  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = 'Rock'
  }
  if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = 'Paper'
  }
  if (randomNum >= 2 / 3 && randomNum < 3 / 3) {
    computerMove = 'Scissors'
  }
  return computerMove;
}
