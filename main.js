import {player1, player2, enemyAttack, playerAttack, showResult} from './players.js';
import {$arenas, $formFight} from './consts.js';
import {createElement} from './utils.js';
import {generateLogs} from './log.js';


function createPlayer (playerObj) {

    const $player = createElement('div', 'player' + playerObj.player);
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

    $life.style.width = playerObj.hp + "%";
    $name.innerText = playerObj.name;
    $img.src= playerObj.img;

    return $player;
}

$arenas.appendChild( createPlayer(player1) );
$arenas.appendChild( createPlayer(player2) );


$formFight.addEventListener('submit', function(event) {
    event.preventDefault();
    const enemy = enemyAttack();
    const player = playerAttack();

    if ( enemy.hit !== player.defence ) {
        player1.changeHP(enemy.value);
        player1.renderHP();
        generateLogs('hit', player2, player1, enemy.value);
    } else {
        generateLogs('defence', player2, player1, enemy.value);
    }

    if ( player.hit !== enemy.defence ) {
        player2.changeHP(player.value);
        player2.renderHP();
        generateLogs('hit', player1, player2, player.value);
    } else {
        generateLogs('defence', player1, player2, player.value);
    }

    showResult();
});

document.addEventListener('DOMContentLoaded', function() {
    generateLogs('start', player1, player2);
    console.log('start');
});



