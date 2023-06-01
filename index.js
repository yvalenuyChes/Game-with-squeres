const $start = document.querySelector('#start')
const $game = document.querySelector('#game')
const $time = document.querySelector('#time')
const $result = document.querySelector('#result')
const $timeHeader = document.querySelector('#time-header')
const $resultHeader = document.querySelector('#result-header')
const $input = document.querySelector('.input')

const colors = ['red', 'green', 'green', 'pink', 'yellow']
let score = 0
let isGameStarted = false

const setGameTimeButtons = document.querySelectorAll('.app__button')

$start.addEventListener('click', startGame)
$game.addEventListener('click', hendleBoxClick)

function startGame() {
   score = 0
   setGameTime()

   $game.style.backgroundColor = '#fff'
   $start.classList.add('hide')
   isGameStarted = true
   $input.classList.add('hide')

   const interval = setInterval(() => {
      const time = parseFloat($time.textContent)

      if (time <= 0) {
         clearInterval(interval)
         endGame()
      } else {
         $time.textContent = (time - 0.1).toFixed(1)
      }
   }, 100)

   renderBox()
}

function renderBox() {
   $game.innerHTML = ''
   let box = document.createElement('div')
   let boxSize = getRandom(30, 100)
   const gameSize = $game.getBoundingClientRect()
   const maxTop = gameSize.height - boxSize
   const maxLeft = gameSize.width - boxSize
   let randomColorIndex = getRandom(0, colors.length)

   box.style.cursor = 'pointer'
   box.style.height = box.style.width = boxSize + 'px'
   box.style.position = 'absolute'
   box.style.backgroundColor = colors[randomColorIndex]
   box.style.top = getRandom(0, maxTop) + 'px'
   box.style.left = getRandom(0, maxLeft) + 'px'
   box.setAttribute('data-box', 'true')

   $game.insertAdjacentElement('afterbegin', box)
}

function setGameTime() {
   let time = +$time.textContent
   $time.textContent = time.toFixed(1)
   $timeHeader.classList.remove('hide')
   $resultHeader.classList.add('hide')
}


setGameTimeButtons.forEach(button => {
   button.addEventListener('click',() => 
   {$time.textContent =`${button.dataset.value}`
    $resultHeader.classList.add('hide')
    $timeHeader.classList.remove('hide')
   }
   )
})


function hendleBoxClick(event) {
   if (!isGameStarted) {
      return
   }
   if (event.target.dataset.box) {
      score++
      renderBox()
   }

}

function getRandom(min, max) {
   return Math.floor((Math.random() * (max - min) + min))
}

function setGameScore() {
   $result.textContent = score.toString()
}

function endGame() {
   isGameStarted = false
   setGameScore()
   $input.classList.remove('hide')
   $start.classList.remove('hide')
   $game.innerHTML = ''
   $game.style.backgroundColor = '#ccc'
   $timeHeader.classList.add('hide')
   $resultHeader.classList.remove('hide')
}