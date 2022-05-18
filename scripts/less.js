import { animateOnce, changeBalance, randInt, setBalanceField } from "./functions.js";

let circle = document.querySelector('.circle')
let outerCircle = document.querySelector('.outer_circle')
let betAmount = document.querySelector('.bet_amount')
let header = document.querySelector('.header')
let card = document.querySelector('.card[data-card=player]')

setBalanceField()
let balance = document.querySelector('.balance')

let cf = {
    'equal': 121, 'less': 2.25, 'more': 2.25, 'even': 2.1, 'odd': 2.1
}

let outcome = randInt(21, 99)
let bankValue = randInt(21, 99)
let betOption = 'equal'
let active = true

document.querySelector('.card[data-card=bank]').innerHTML = bankValue

document.querySelector('.left').onclick = () => {
    if (!active) { return }
    circle.firstElementChild.src = '../png/arrow.png'
    circle.firstElementChild.alt = 'left'
    betOption = 'less'
}

document.querySelector('.right').onclick = () => {
    if (!active) { return }
    circle.firstElementChild.src = '../png/arrow.png'
    circle.firstElementChild.alt = 'sign'
    betOption = 'more'
}

document.querySelector('.equal').onclick = () => {
    if (!active) { return }
    circle.firstElementChild.src = '../png/equal.png'
    circle.firstElementChild.alt = 'sign'
    betOption = 'equal'
}

document.querySelector('.even').onclick = () => {
    if (!active) { return }
    circle.firstElementChild.src = '../png/even.png'
    circle.firstElementChild.alt = 'sign'
    betOption = 'even'
}

document.querySelector('.odd').onclick = () => {
    if (!active) { return }
    circle.firstElementChild.src = '../png/odd.png'
    circle.firstElementChild.alt = 'sign'
    betOption = 'odd'
}

document.querySelector('.minus').onclick = () => {
    if (Number(betAmount.innerHTML) == 1 || !active) { return }
    betAmount.innerHTML = Math.floor(Number(betAmount.innerHTML) / 2)
}

document.querySelector('.plus').onclick = () => {
    if (Number(betAmount.innerHTML) * 2 > Number(balance.innerHTML) || !active) { return }
    betAmount.innerHTML = Number(betAmount.innerHTML) * 2
}

document.querySelector('.min').onclick = () => {
    if (!active) { return }
    betAmount.innerHTML = 1
}

document.querySelector('.max').onclick = () => {
    if (!active) { return }
    betAmount.innerHTML = balance.innerHTML
}

betAmount.onclick = () => {
    if (!active || Number(balance.innerHTML) < Number(betAmount.innerHTML)) { return }
    active = false

    changeBalance(-Number(betAmount.innerHTML))

    let i = 0
    let animInterval = setInterval(() => {
        if (i == outcome + 1) {
            clearInterval(animInterval)
            setTimeout(() => {
                gameOver()
            }, 500);
        } else {
            card.innerHTML = i
            i++
        }
    }, 3500 / outcome);
}

function gameOver() {
    let prize = 0

    if (
        (betOption == 'equal' && outcome == bankValue) ||
        (betOption == 'more' && outcome > bankValue) ||
        (betOption == 'less' && outcome < bankValue) ||
        (betOption == 'even' && outcome % 2 == 0) ||
        (betOption == 'odd' && outcome % 2 == 1)
    ) {
        outerCircle.classList.replace('hidden', 'win')
        prize = Math.ceil(cf[betOption] * Number(betAmount.innerHTML))

        animateOnce('.balance')
        changeBalance(prize)
    } else {
        outerCircle.classList.replace('hidden', 'lost')
    }

    header.innerHTML = prize ? 'You have won ' + prize : 'No way! Try again right now'

    setTimeout(() => {
        outerCircle.classList.add('hidden')
    }, 1700);

    setTimeout(() => {
        active = true
        outerCircle.classList.remove('win', 'lost')
        header.innerHTML = 'Make a choice'
        card.innerHTML = '?'
        outcome = randInt(21, 99)
    }, 2200);

}