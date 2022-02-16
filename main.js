const $btn = document.getElementById('btn-kick1');
const $btn1 = document.getElementById('btn-kick2');
let isGameFinished = false

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

const renderHP = (person) => {
    renderHPLife(person);
    renderProgressbarHP(person);
}

const renderHPLife = (person) => {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP + ' HP';
}

const renderProgressbarHP = (person) => {
    person.elProgressbar.style.width = person.damageHP + '%';
}

const changeHP = (count, person) => {
    if (!isGameFinished) {
        if (person.damageHP < count) {
            person.damageHP = 0;
            alert(`${person.name} wasted`)
            $btn.disabled = true;
            $btn1.disabled = true;
            isGameFinished = true
        } else {
            person.damageHP -= count;
        }

        renderHP(person);
    }
}

const random = (from, to) => {
    if(from > to) {
        throw Error('Wrong values')
    }

    return (
        !to
            ? Math.ceil(Math.random() * from)
            : Math.ceil(Math.random() * (to - from)) + from
    )
}

const listenerHandler = (...limits) => {
    changeHP(random(...limits), character);
    changeHP(random(...limits), enemy);
}

$btn.addEventListener('click', () => listenerHandler(20));

$btn1.addEventListener('click', () => listenerHandler(30, 40));

(() => {
    renderHP(character);
    renderHP(enemy);
})()