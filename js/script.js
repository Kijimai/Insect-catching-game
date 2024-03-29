const screens = document.querySelectorAll('.screen')
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')
const backgroundImg = document.querySelector('.backgroundImg')
const IMAGE_NO_DRAG = document.querySelectorAll('img')

let seconds = 0
let score = 0
let selected_insect = {}

// Disable dragging on all image elements
IMAGE_NO_DRAG.ondragstart = function() { return false; };

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_insect_btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img')
    const src = img.getAttribute('src')
    const alt = img.getAttribute('alt')
    selected_insect = { src, alt }
    if(selected_insect.alt === 'goobbue') {
      changeMessage()
      playMusic()
    }
    screens[1].classList.add('up')
    setTimeout(createInsect, 1000) 
    startGame()
  })
})

function startGame() {
  setInterval(increaseTime, 1000)
}

function increaseTime(){
  let m = Math.floor(seconds / 60)
  let s = seconds % 60
  m = m < 10 ? `0${m}` : m 
  s = s < 10 ? `0${s}` : s 
  timeEl.innerHTML = `Time: ${m}:${s}`
  seconds++
}
function createInsect() {
  const insect = document.createElement('div')
  insect.classList.add('insect')
  const { x, y } = getRandomLocation()
  insect.style.top = `${y}px`
  insect.style.left = `${x}px`
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" draggable="false">`

  insect.addEventListener('click', catchInsect)

  game_container.appendChild(insect)
}



function getRandomLocation() {
  const width = window.innerWidth
  const height = window.innerHeight
  
  const x = Math.random() * (width - 200) + 100
  const y = Math.random() * (height - 200) + 100
  return { x, y }
}

function catchInsect() {
  increaseScore()
  this.classList.add('caught')
  setTimeout(() => this.remove(), 2000)
  addInsects()
}

function addInsects() {
  setTimeout(createInsect, 500)
  setTimeout(createInsect, 1500)
}

function increaseScore() {
  score++
  if(score > 19) {
    message.classList.add('visible')
    if(selected_insect.alt === 'goobbue') {
      backgroundImg.classList.add('showImage')
    }
  }
  scoreEl.innerHTML = `Score: ${score}`
}

function changeMessage() {
  message.innerHTML = `
  YOU CAN'T STOP THE GOOBBUE DOMINATION <br>
  GOOBBUE WILL RULE THE WORLD!
  `
}

function playMusic() {
  const music = new Audio('../sounds/Chocobo-kazoo.mp3')
  music.volume = .5
  music.play()
  music.loop = true
}