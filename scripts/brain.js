import { randInt, shuffle } from './functions.js'

let level = Number(localStorage.getItem('level_less'))

let field = document.querySelector('.field')
let bar = document.querySelector('.bar')
let searchField = document.querySelector('.big_button')
let outcomeCont = document.querySelector('.outcome_cont')
let pauseCont = document.querySelector('.pause_cont')
let retry = document.querySelector('.retry')
let nextLevel = document.querySelector('.outcome_cont .next')

let game
let pause = false
let timeLeft
let currentNum

let numData = [
    { location: [17 / 320, 26 / 220], size: 70 },
    { location: [55 / 320, 132 / 220], size: 70 },
    { location: [115 / 320, 16 / 220], size: 50 },
    { location: [244 / 320, 93 / 220], size: 50 },
    { location: [126 / 320, 154 / 220], size: 30 },
    { location: [14 / 320, 105 / 220], size: 60 },
    { location: [215 / 320, 25 / 220], size: 70 },
    { location: [76 / 320, 89 / 220], size: 45 },
    { location: [97 / 320, 49 / 220], size: 40 },
    { location: [117 / 320, 85 / 220], size: 65 },
    { location: [141 / 320, 54 / 220], size: 30 },
    { location: [220 / 320, 113 / 220], size: 80 },
    { location: [182 / 320, 76 / 220], size: 50 },
    { location: [168 / 320, 36 / 220], size: 40 },
    { location: [156 / 320, 141 / 220], size: 60 }
]

if (level < 3) {
    field.style.backgroundImage = 'url(../png/level_' + level + '.png'
} else {
    field.style.backgroundImage = 'url(../png/level_' + (level - 2) + '.png'
    field.style.color = 'purple'
    field.querySelector('.level_3').classList.remove('hidden')
}

document.querySelector('.level').innerHTML += level

updateShop()

let nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15])
for (let i = 0; i < 15; i++) {
    let num = document.createElement('div')
    num.classList.add('num', 'block')

    let inner = nums[i]
    num.innerHTML = inner

    num.style.left = numData[i].location[0] * 100 + '%'
    num.style.top = numData[i].location[1] * 100 + '%'

    num.style.width = (numData[i].size / 320) * 100 + '%'
    num.style.height = (numData[i].size / 220) * 100 + '%'

    if (inner != 6 && inner != 9) {
        num.style.transform = 'rotate(' + randInt(1, 359) + 'deg)'
    }

    num.onclick = () => {
        if (num.innerHTML == currentNum && timeLeft) {
            if (currentNum == 15) {
                gameOver(true)
                return
            }

            if (!pause) {
                currentNum += 1
                searchField.innerHTML = currentNum
                focus()
            }
        }
    }

    field.appendChild(num)
}

startGame()

function startGame() {
    timeLeft = 45
    currentNum = 1
    searchField.innerHTML = currentNum

    focus()

    game = setInterval(() => {
        if (!timeLeft) {
            clearInterval(game)
            gameOver(false)
        }

        if (!pause) {
            timeLeft -= 1
            bar.style.width = (timeLeft / 45) * 90 + '%'
        }
    }, 1000);
}

retry.onclick = () => {
    outcomeCont.style.left = '-50%'
    startGame()
}

document.querySelector('.pause').onclick = () => {
    if (!timeLeft) { return }
    pause = true
    pauseCont.style.left = '50%'
}

document.querySelector('.pause_cont .next').onclick = () => {
    pause = false
    pauseCont.style.left = '-50%'
}

document.querySelector('.time').onclick = () => {
    if (!Number(localStorage.getItem('time_less')) || timeLeft > 35) { return }

    timeLeft += 10
    localStorage.setItem('time_less', Number(localStorage.getItem('time_less')) - 1)
    updateShop()
}

document.querySelector('.loupe').onclick = () => {
    if (!Number(localStorage.getItem('loupe_less'))) { return }

    for (let num of document.querySelectorAll('.num')) {
        if (num.innerHTML == currentNum) {
            num.style.backgroundImage = 'url(../png/green_back.png)'
            setTimeout(() => {
                num.style.backgroundImage = 'none'
            }, 500);
        }
    }

    localStorage.setItem('loupe_less', Number(localStorage.getItem('loupe_less')) - 1)
    updateShop()
}

function gameOver(outcome) {
    if (outcome) {
        clearInterval(game)
        localStorage.setItem('level_' + level + '_less', 3)
        if (level != 4) {
            localStorage.setItem('level_less', level + 1)
        }

        outcomeCont.querySelector('.outcome').innerHTML = 'WIN!'
        document.querySelector('.stars').classList.remove('hidden')
        nextLevel.innerHTML = 'Next'
        nextLevel.parentElement.href = './brain.html'
    } else {
        outcomeCont.querySelector('.outcome').innerHTML = 'No way!'
        document.querySelector('.stars').classList.add('hidden')
        nextLevel.innerHTML = 'Main'
        nextLevel.parentElement.href = './main.html'
    }

    outcomeCont.style.left = '50%'
    bar.style.width = '90%'
}

function updateShop() {
    for (let bonus of ['time', 'loupe']) {
        let currentAmount = Number(localStorage.getItem(bonus + '_less'))
        document.querySelector('.' + bonus).style.backgroundImage = currentAmount ? 'url("../png/green_dot.png")' : 'url("../png/red_dot.png")'
        document.querySelector('.' + bonus + ' .amount').innerHTML = currentAmount
    }
}

function focus() {
    for (let num of document.querySelectorAll('.num')) {
        num.style.zIndex = num.innerHTML == currentNum ? 3 : 1
    }
}