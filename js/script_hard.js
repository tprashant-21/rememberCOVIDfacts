
const cards = document.querySelectorAll('.covidInfo');
let turn = 0;
let match = 0;

let audioBtnCount = 1;


const audio1 = new Audio();
audio1.src = "sound/flipsound.mp3";

const audio2 = new Audio();
audio2.src = "sound/matchsound.wav";

const audio3 = new Audio(); 
audio3.src = "sound/backgroundmusic.mp3";
if (typeof audio3.loop == 'boolean')
{
    audio3.loop = true;
}
else
{
    audio3.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
        
    }, false);
}

function audio() {
  audioBtnCount++;
  if(audioBtnCount%2 === 0){
    audio3.pause();
  }
  else{
    audio3.play();
  }
  
}



let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  
  this.classList.add('flip');
  audio1.play();
  


  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function turnCount(){
  document.querySelector('.turncount').textContent = ++turn;
}

function totalMatch(){
  document.querySelector('.matchscore').textContent = ++match;
}


function checkForMatch() {
  let isMatch = firstCard.dataset.info === secondCard.dataset.info;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  totalMatch();


  resetBoard();
  audio2.play();
  if(cards.length/2 === match){
    window.location.href = "congratulations.html";
  }
  
  
}

function unflipCards() {
  lockBoard = true;
  turnCount();
  

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    audio1.play();
    

    resetBoard();
  }, 1000);
}

function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null, 
  secondCard = null;
}

(function shuffle() {
  cards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 30);
    card.style.order = randomPosition;
  });
})();


audio3.play();

cards.forEach(card => card.addEventListener('click', flipCard));
