import { animateOnce, changeBalance, setBalanceField } from './functions.js'

if (!localStorage.getItem('balance_less')) {
    localStorage.setItem('balance_less', 1500)
}

if (!localStorage.getItem('time_less')) {
    localStorage.setItem('time_less', 0)
}

if (!localStorage.getItem('loupe_less')) {
    localStorage.setItem('loupe_less', 0)
}

setBalanceField()
updateShop()

let balance = document.querySelector('.balance')

for (let button of document.querySelectorAll('.button')) {
    button.onclick = () => {
        if (Number(balance.innerHTML) < 550) {
            animateOnce('.balance')
            return
        } else {
            changeBalance(-550)
            localStorage.setItem(button.dataset.good + '_less', Number(localStorage.getItem(button.dataset.good + '_less')) + 1)
            updateShop()
        }
    }
}

function updateShop() {
    for (let bonus of ['time', 'loupe']) {
        let currentAmount = Number(localStorage.getItem(bonus + '_less'))
        document.querySelector('.button[data-good=' + bonus + ']').style.backgroundImage = currentAmount ? 'url("../png/green_dot.png")' : 'url("../png/red_dot.png")'
        document.querySelector('.amount[data-good=' + bonus + ']').innerHTML = currentAmount
    }
}

document.querySelector('body').classList.remove('hidden')