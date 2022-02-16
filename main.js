import { Pokemon } from './pokemon.js'
import { pokemons } from './pokemons.js'
import { random } from './tools.js'

const logsWrapper = document.querySelector('#logs')
const control = document.querySelector('#control')

let isGameFinished = false

const initCounter = (limit) => {
    const LIMIT = limit;
    let counter = 0

    return () => {
        counter = counter + 1 >= LIMIT ? LIMIT : counter + 1

        console.log(`[${counter}/${LIMIT}]`);

        return counter + 1 <= LIMIT
    }
}


const pokemon1 = pokemons[random(0, pokemons.length - 1)]
const pokemon2 = pokemons[random(0, pokemons.length - 1)]

let Player1 = new Pokemon({
    ...pokemon1,
    selector: 'player1',
})

let Player2 = new Pokemon({
    ...pokemon2,
    selector: 'player2',
})

const listenerHandler = (limits) => {
    if (!isGameFinished) {
        const Player1Log = Player1.changeHP(random(...limits), Player2);

        if (Player1.isDead) {
            finishGame()
        } else {
            const charmLog = Player2.changeHP(random(...limits), Player1);
            logsWrapper.innerHTML = logsWrapper.innerHTML.concat(`<p>${Player1Log}</p>`, `<p>${charmLog}</p>`)
        }

        if (Player2.isDead) {
            finishGame()
        }
    }
}

const initPlayer1 = () => {
    control.innerHTML = ''

    Player1.attacks.forEach((item) => {
        const btn = document.createElement('button')
        btn.classList.add('button', 'action-button')
        btn.innerText = item.name

        const inc = initCounter(item.maxCount)

        btn.addEventListener('click', () => {
            if (inc()) {
                listenerHandler([item.minDamage, item.maxDamage])
            }
        })

        control.appendChild(btn)
    })
}

const finishGame = () => {
    // isGameFinished = true
    // const buttons = document.querySelectorAll('.button.action-button')

    // Array.from(buttons).forEach((button) => {
    //     button.disabled = true;
    // })

    const pokemon1 = pokemons[random(0, pokemons.length - 1)]
    const pokemon2 = pokemons[random(0, pokemons.length - 1)]

    Player1 = new Pokemon({
        ...pokemon1,
        selector: 'player1',
    })

    Player2 = new Pokemon({
        ...pokemon2,
        selector: 'player2',
    })

    initPlayer1()
}




initPlayer1()