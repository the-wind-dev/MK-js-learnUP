import { createReloadButton, createElement } from "./utils/index.js";
import {generateLogs} from './logs/index.js';
import { Player } from './players/index.js';


export class Game {
    
    /* а зачем тут вообще async await?
     */
    //получение всего массива игроков
    // getPlayers = async () => {
    //     const res = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players')
    //             .then( response => response.json());
    //     return res;
    // }
    //получение случайного игрока 
    getRandomPlayer = async () => {
        const res = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
                .then( response => response.json());
        return res;
    }

    start = async () => {

        let p1;
        let p2;
        //id 12 без gif  на сервере, если id=12, то перевыбор
        do {
            p1 = await this.getRandomPlayer();
            console.log('repeat');
        } while ( p1.id == 12 );
        do {
            p2 = await this.getRandomPlayer();
            console.log('repeat');
        } while ( p2.id == 12 );
        
        const player1 = new Player({
            ...p1,
            playerID: 1,
            rootSelector: 'arenas',
        });
        const player2 = new Player({
            ...p2,
            playerID: 2,
            rootSelector: 'arenas',
        });

        const $formFight = document.querySelector('.control');
        const $arenas = document.querySelector('.arenas');

        generateLogs('start', player1, player2);

        $formFight.addEventListener('submit', async (event) => {
            event.preventDefault();

            await this.fight(player1, player2, $formFight);


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
    fight = async (player1, player2, $formFight) => {
        const fightInfo = await this.getFightInfo($formFight);
        console.log(fightInfo);
        const {player1: {hit: hitPlayer, defence: defencePlayer, value: valuePlayer},
               player2: {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy}
              } = fightInfo; 
        console.log(hitPlayer, defencePlayer, valuePlayer);
        console.log(hitEnemy, defenceEnemy, valueEnemy);
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
 
    getFightInfo = async ($formFight) => {
        const {hit: hitPlayer, defence: defencePlayer} = this.playerAttack($formFight);
        
        const fightInfo =  await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit: hitPlayer,
                defence: defencePlayer,
            })
        }).then( res => res.json());
        return fightInfo;
    }
    
    playerAttack = ($formFight) => {
        const attack = {};
        
        for (let item of $formFight) {
            if (item.checked && item.name === 'hit') {
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
