import {LOGS, $chat} from './consts.js';
import {getTime, getRandom} from './utils.js';

/**
 * создаем элемент и добаваляем его в чат
 * @param {string} text 
 */
 export function renderLogs(text) {
    const el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}

/**
 * генерируем лог и сразу его отрисовываем
 * @param {string} type - тип сообщения
 * @param {object} [player1]
 * @param {object} [player2]
 * @param {number} [damage] 
 */
export function generateLogs(type, player1, player2, damage) {
    let text = '';
    let log = '';
    switch (type) {
        case 'start':
            text = LOGS[type].replace('[time]', getTime() ).replace('[player1]', player1.name).replace('[player2]', player2.name);
            log = `[${getTime()}] ${text}`;
            renderLogs(log);
            break;

        case 'end':
            text = LOGS[type][ getRandom(LOGS[type].length - 1) ].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            log = `[${getTime()}] ${text}`;
            renderLogs(log);
            break;
        
        case 'hit':
            text = LOGS[type][ getRandom(LOGS[type].length - 1) ].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            log = `[${getTime()}] ${text} -${damage}hp [${player2.hp}/100]`;
            renderLogs(log);
            break;

        case 'defence':
            text = LOGS[type][ getRandom(LOGS[type].length - 1) ].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            log = `[${getTime()}] ${text} blocked damdge: ${damage}hp [${player2.hp}/100]`;
            renderLogs(log);            
            break;
        
        case 'draw':
            text = LOGS[type];
            log = `[${getTime()}] ${text}`;
            renderLogs(log);
            break;

        default:
            renderLogs( 'кто-то похитил данное сообщение' );
    }    
}