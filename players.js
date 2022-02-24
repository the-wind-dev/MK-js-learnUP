import { ATTACK, HIT, $formFight, $fightButton, $arenas } from "./consts.js";
import { getRandom, createReloadButton, createElement } from "./utils.js";
import {generateLogs} from './log.js';

export const player1 = {
    player: 1,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'gun'],
    changeHP,
    elHP,
    renderHP,
};

export const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'sword', 'gun'],
    changeHP,
    elHP,
    renderHP,
};

function changeHP(damage) {
    this.hp -= damage;  
    if (this.hp <= 0 ) {  
        this.hp = 0;
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

export function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' won';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
}

export function enemyAttack() {
    const length = ATTACK.length;
    const hit = ATTACK[ getRandom(length - 1) ];
    const defence = ATTACK[ getRandom(length- 1) ];

    return {
        value: getRandom( HIT[hit] ),
        hit,
        defence,
    };
}

export function playerAttack() {
    const attack = {};

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = getRandom( HIT[item.value] );
            attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
            attack.defence = item.value;
        }

        item.checked = false;
    }
    return attack;
}

export function showResult() {
    if (player1.hp === 0 || player2.hp === 0) {
        $fightButton.disabled = true;
        createReloadButton();
        }
    
    if (player1.hp === 0 && player1.hp < player2.hp ) {
        $arenas.appendChild( playerWin(player2.name) );
        generateLogs('end', player2, player1);

    } else if (player2.hp === 0 && player2.hp < player1.hp ) {
        $arenas.appendChild( playerWin(player1.name) );
        generateLogs('end', player1, player2);

    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild( playerWin() );
        generateLogs('draw');
    }
}