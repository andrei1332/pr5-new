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

class Pokemon {
    name
    #elHP
    #elProgressbar
    #defaultHP
    #damageHP

    constructor(name, elHP, elProgressbar) {
        this.name = name
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

    #generateLog({ name }, damaged) {
        const logs = [
            `${this.name} вспомнил что-то важное, но неожиданно ${name}, не помня себя от испуга, ударил в предплечье врага. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} поперхнулся, и за это ${name} с испугу приложил прямой удар коленом в лоб врага. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} забылся, но в это время наглый ${name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} пришел в себя, но неожиданно ${name} случайно нанес мощнейший удар. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} поперхнулся, но в это время ${name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} удивился, а ${name} пошатнувшись влепил подлый удар. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} высморкался, но неожиданно ${name} провел дробящий удар. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} пошатнулся, и внезапно наглый ${name} беспричинно ударил в ногу противника -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} расстроился, как вдруг, неожиданно ${name} случайно влепил стопой в живот соперника. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
            `${this.name} пытался что-то сказать, но вдруг, неожиданно ${name} со скуки, разбил бровь сопернику. -${damaged}, [${this.#damageHP}/${this.#defaultHP}]`,
        ];

        return logs[random(logs.length) - 1]
    }

    changeHP(count, enemy) {
        if (!isGameFinished) {
            if (this.#damageHP < count) {
                this.#damageHP = 0;
                alert(`${this.name} wasted`)
                finishGame()
            } else {
                this.#damageHP -= count;
            }

            this.renderHP();
        }

        logsWrapper.innerHTML = logsWrapper.innerHTML.concat(`<p>${this.#generateLog(enemy, count)}</p>`)
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
    
    Pikachu.changeHP(random(...limits), Charmander);
    Charmander.changeHP(random(...limits), Pikachu);
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