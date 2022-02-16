const buttons = document.querySelectorAll('.button.action-button')

let isGameFinished = false

const finishGame = () => {
    isGameFinished = true

    Array.from(buttons).forEach((button) => {
        button.disabled = true;
    })
}

class Pokemon {
    #name
    #elHP
    #elProgressbar
    #defaultHP
    #damageHP

    constructor(name, elHP, elProgressbar) {
        this.#name = name
        this.#elHP = elHP
        this.#elProgressbar = elProgressbar
        this.#defaultHP = 100
        this.#damageHP = 100
    }
    
    renderHP() {
        this.#renderHPLife();
        this.#renderProgressbarHP();
    }

    #renderHPLife() {
        this.#elHP.innerText = this.#damageHP + ' / ' + this.#defaultHP + ' HP';
    }

    #renderProgressbarHP() {
        this.#elProgressbar.style.width = this.#damageHP + '%';
    }

    changeHP(count) {
        console.log(count);

        if (!isGameFinished) {
            if (this.#damageHP < count) {
                this.#damageHP = 0;
                alert(`${this.#name} wasted`)
                finishGame()
            } else {
                this.#damageHP -= count;
            }

            this.renderHP();
        }
    }
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
    Pikachu.changeHP(random(...limits));
    Charmander.changeHP(random(...limits));
}

Array.from(buttons).forEach((button) => {
    const limitsDamage = button.dataset.damage.split(', ')

    button.addEventListener('click', () => listenerHandler(limitsDamage))
})

const random = (from, to) => {
    if (Number(from) > Number(to)) {
        throw Error('Wrong values')
    }

    return (
        !to
            ? Math.ceil(Math.random() * Number(from))
            : Math.ceil(Math.random() * (Number(to) - Number(from))) + Number(from)
    )
}

Pikachu.renderHP()
Charmander.renderHP()