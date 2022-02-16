import { Pokemon } from './pokemon.js'
import { random } from './tools.js'

const buttons = document.querySelectorAll('.button.action-button')
const logsWrapper = document.querySelector('#logs')

let isGameFinished = false

const initCounter = () => {
    const LIMIT = 6;
    let counter = 0

    return () => {
        counter = counter + 1 >= LIMIT ? LIMIT : counter + 1

        console.log(`[${counter}/${LIMIT}]`);

        return counter + 1 <= LIMIT
    }
}

const finishGame = () => {
    isGameFinished = true

    Array.from(buttons).forEach((button) => {
        button.disabled = true;
    })
}

const Pikachu = new Pokemon(
    'Pikachu',
    document.querySelector('#health-character'),
    document.querySelector('#progressbar-character')
)

const Charmander = new Pokemon(
    'Charmander',
    document.querySelector('#health-enemy'),
    document.querySelector('#progressbar-enemy')
)

const listenerHandler = (limits) => {
    if (!isGameFinished) {
        const pikachuLog = Pikachu.changeHP(random(...limits), Charmander);

        if (Pikachu.isDead) {
            finishGame()
        } else {
            const charmLog = Charmander.changeHP(random(...limits), Pikachu);
            logsWrapper.innerHTML = logsWrapper.innerHTML.concat(`<p>${pikachuLog}</p>`, `<p>${charmLog}</p>`)
        }

        if (Charmander.isDead) {
            finishGame()
        }
    }
}

Array.from(buttons).forEach((button) => {
    const limitsDamage = button.dataset.damage.split(', ')

    const inc = initCounter()

    button.addEventListener('click', () => {
        if (inc()) {
            listenerHandler(limitsDamage)
        }
    })
})

Pikachu.renderHP()
Charmander.renderHP()