import { ATTACK, HIT } from "./consts.js";
import { getRandom, createReloadButton, createElement } from "./utils/index.js";
import {generateLogs} from './log.js';

export const player1 = {
    playerID: 1,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'gun'],
    changeHP,
    elHP,
    renderHP,
};

export const player2 = {
    playerID: 2,
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
    return document.querySelector('.player' + this.playerID + ' .life');
}

function renderHP() {
    this.elHP().style.width = this.hp + '%';
}

/**
 * создание и отрисовка player
 * @param {object} playerObj 
 * @returns {HTMLElement}
 */
export function createPlayer(playerObj) {
    const {playerID, name, hp, img} = playerObj;

    const $player = createElement('div', 'player' + playerID);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');

    const $img = createElement('img');

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    $life.style.width = hp + "%";
    $name.innerText = name;
    $img.src = img;

    return $player;
}

/**
 * @param {object} player1 - you
 * @param {object} player2 - your enemy
 * @param {HTMLElement} $formFight - form для создания действий игрока
 */

export function fight(player1, player2, $formFight) {
    const enemy = enemyAttack();
    const player = playerAttack($formFight);

    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1, enemy.value);
    }

    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    } else {
        generateLogs('defence', player1, player2, player.value);
    }
}



/**
 * создание действия противника: удар (+урон), защита
 * @returns {object}
 */
const enemyAttack = () => {
    const length = ATTACK.length;
    const hit = ATTACK[ getRandom(length - 1) ];
    const defence = ATTACK[ getRandom(length- 1) ];

    return {
        value: getRandom( HIT[hit] ),
        hit,
        defence,
    };
};

/**
 * создание действий игрока: удар (+урон), защита
 * @param {HTMLElement} - form, из которой берутся удар, защита
 * @param {}
 * @returns {object}
 */
const playerAttack = ($formFight) => {
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
};

/**
 * создание надписи "[PlayerName?] won"
 * @param {string} [name]
 * @returns {HTMLElement}
 */
const playerWin = (name) => {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' won';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
};
/**
 * рендер результата боя (с логом)
 * @param {object} player 
 * @param {object} enemy
 * @param {HTMLElement} $arenas
 */
export const showResult = (player, enemy, $arenas) => {
    const $fightButton = document.querySelector('.button');

    if (player.hp === 0 || enemy.hp === 0) {
        $fightButton.disabled = true;
        createReloadButton($arenas);
        }
    
    if (player.hp === 0 && player.hp < enemy.hp ) {
        $arenas.appendChild( playerWin(enemy.name) );
        generateLogs('end', enemy, player);

    } else if (enemy.hp === 0 && enemy.hp < player.hp ) {
        $arenas.appendChild( playerWin(player.name) );
        generateLogs('end', player, enemy);

    } else if (player.hp === 0 && enemy.hp === 0) {
        $arenas.appendChild( playerWin() );
        generateLogs('draw');
    }
};