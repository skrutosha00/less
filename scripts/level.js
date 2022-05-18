import { setBalanceField } from "./functions.js";

setBalanceField()

let cardCont = document.querySelector('.level_cont')

let last = 0
for (let i = 0; i < 4; i++) {

    if (!localStorage.getItem('level_' + (i + 1) + '_less')) {
        localStorage.setItem('level_' + (i + 1) + '_less', 0)
    }

    let card = document.createElement('div')
    card.classList.add('card', 'block')
    card.innerHTML = i + 1

    if (!Number(localStorage.getItem('level_' + (i + 1) + '_less'))) {
        if (last == i) {
            let link = document.createElement('a')
            link.href = './brain.html'

            let playButton = document.createElement('div')
            playButton.classList.add('button', 'block')
            playButton.innerHTML = 'PLAY'

            playButton.onclick = () => {
                localStorage.setItem('level_less', i + 1)
            }

            link.appendChild(playButton)
            card.appendChild(link)
        }
    } else {
        last += 1

        let link = document.createElement('a')
        link.classList.add('tick_link')
        link.href = './brain.html'

        let tick = document.createElement('img')
        tick.classList.add('tick')
        tick.src = '../png/tick.png'

        tick.onclick = () => {
            localStorage.setItem('level_less', i + 1)
        }

        let stars = document.createElement('div')
        stars.classList.add('stars')
        for (let j = 0; j < 3; j++) {
            let starPic = document.createElement('img')
            starPic.src = '../png/star.png'
            stars.appendChild(starPic)
        }

        link.appendChild(tick)
        card.appendChild(link)
        card.appendChild(stars)
    }

    cardCont.appendChild(card)
}