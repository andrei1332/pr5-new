import { random } from './tools.js'

export class Pokemon {
    name
    isDead
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
        this.isDead = false
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
        if (!this.isDead) {
            if (this.#damageHP < count) {
                this.#damageHP = 0;
                alert(`${this.name} wasted`);
                this.isDead = true;
            } else {
                this.#damageHP -= count;
            }

            this.renderHP();

            return this.#generateLog(enemy, count)
        }
    }
}