import {player1, player2, showResult, createPlayer, fight} from './players.js';
import {generateLogs} from './log.js';

const init = () => {
    const $formFight = document.querySelector('.control');
    const $arenas = document.querySelector('.arenas');

    $formFight.addEventListener('submit', function (event) {
        event.preventDefault();

        fight(player1, player2, $formFight);
        
        if (player1.hp == 0 || player2.hp ==0) {
            showResult(player1, player2, $arenas); 
        }
        
    });
    
    $arenas.appendChild( createPlayer(player1) );
    $arenas.appendChild( createPlayer(player2) );
    
    generateLogs('start', player1.name, player2.name);
};

init();