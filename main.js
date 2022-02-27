import {player1, player2, showResult, fight} from './players/index.js';
import {generateLogs} from './logs/index.js';

const init = () => {
    const $formFight = document.querySelector('.control');
    const $arenas = document.querySelector('.arenas');

    generateLogs('start', player1, player2);

    $formFight.addEventListener('submit', function (event) {
        event.preventDefault();

        fight(player1, player2, $formFight);
        
        if (player1.hp == 0 || player2.hp ==0) {
            showResult(player1, player2, $arenas); 
        }
        
    });
    player1.createPlayer();
    player2.createPlayer();  
    
};

init();