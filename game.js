import { ATTACK, HIT } from "../consts/index.js";
import { getRandom, createReloadButton, createElement } from "../utils/index.js";
import {generateLogs} from '../logs/index.js';
import { player1, player2 } from './players/index.js';


export class Game {
    // constructor(props) {
    //     this.root = props.root;
    // }

    start = () => {

        const $formFight = document.querySelector('.control');
        const $arenas = document.querySelector('.arenas');

        generateLogs('start', player1, player2);

        $formFight.addEventListener('submit',  (event) => {
            event.preventDefault();

            this.fight(player1, player2, $formFight);
            
            if (player1.hp == 0 || player2.hp ==0) {
                this.showResult(player1, player2, $arenas); 
            }
            
        });
        player1.createPlayer();
        player2.createPlayer();  
    }
    
    /**
     * @param {object} player1 - you
     * @param {object} player2 - your enemy
     * @param {HTMLElement} $formFight - form для информации о действиях игрока
     */
    fight = (player1, player2, $formFight) => {

        const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = this.enemyAttack();
        const {hit: hitPlayer, defence: defencePlayer, value: valuePlayer} = this.playerAttack($formFight);
        
        if (hitEnemy !== defencePlayer) {
            player1.changeHP(valueEnemy);
            player1.renderHP();
            generateLogs('hit', player2, player1, valueEnemy);
        } else {
            generateLogs('defence', player2, player1, valueEnemy);
        }

        if (hitPlayer !== defenceEnemy) {
            player2.changeHP(valuePlayer);
            player2.renderHP();
            generateLogs('hit', player1, player2, valuePlayer);
        } else {
            generateLogs('defence', player1, player2, valuePlayer);
        }
    }

    /**
     * создание действия противника: удар (+урон), защита
     * @returns {object}
     */
    enemyAttack = () => {
        const length = ATTACK.length; 
        const hit = ATTACK[ getRandom(length) - 1 ];
        const defence = ATTACK[ getRandom(length) - 1 ];

        return {
            value: getRandom( HIT[hit] ),
            hit,
            defence,
        };
    }

    /**
     * создание действий игрока: удар (+урон), защита
     * @param {HTMLElement} - form, из которой берутся удар, защита
     * @param {}
     * @returns {object}
     */
    playerAttack = ($formFight) => {
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

    /**
     * создание надписи "[PlayerName?] won"
     * @param {string} [name]
     * @returns {HTMLElement}
     */
    playerWin = (name) => {
        const $winTitle = createElement('div', 'winTitle');
        if (name) {
            $winTitle.innerText = name + ' won';
        } else {
            $winTitle.innerText = 'draw';
        }
        
        return $winTitle;
    }

    /**
     * рендер результата боя (с логом)
     * @param {object} player 
     * @param {object} enemy
     * @param {HTMLElement} $arenas
     */
    showResult = (player, enemy, $arenas) => {
        const $fightButton = document.querySelector('.button');

        if (player.hp === 0 || enemy.hp === 0) {
            $fightButton.disabled = true;
            createReloadButton($arenas);
            }
        
        if (player.hp === 0 && player.hp < enemy.hp ) {
            $arenas.appendChild( this.playerWin(enemy.name) );
            generateLogs('end', enemy, player);

        } else if (enemy.hp === 0 && enemy.hp < player.hp ) {
            $arenas.appendChild( this.playerWin(player.name) );
            generateLogs('end', player, enemy);

        } else if (player.hp === 0 && enemy.hp === 0) {
            $arenas.appendChild( this.playerWin() );
            generateLogs('draw');
        }
    }
}
