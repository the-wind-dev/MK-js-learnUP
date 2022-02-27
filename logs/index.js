import {LOGS} from '../consts/index.js';
import {getTime, getRandom} from '../utils/index.js';

const $chat = document.querySelector('.chat');

/**
 * создаем элемент и добаваляем его в чат ($chat)
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

function getTextLog(type, player1Name, player2Name) {
    switch(type) {
        case 'start':
            return LOGS[type]
                .replace('[time]', getTime() )
                .replace('[player1]', player1Name)
                .replace('[player2]', player2Name);

        case 'hit':
            return LOGS[type][ getRandom(LOGS[type].length - 1) - 1 ]
                .replace('[playerKick]', player1Name)
                .replace('[playerDefence]', player2Name);
        
        case 'defence':
            return LOGS[type][ getRandom(LOGS[type].length - 1) - 1 ]
                .replace('[playerKick]', player1Name)
                .replace('[playerDefence]', player2Name);

        case 'end':
            return LOGS[type][ getRandom(LOGS[type].length - 1) - 1 ]
            .replace('[playerWins]', player1Name)
            .replace('[playerLose]', player2Name);
            
        case 'draw':
            return LOGS[type];
        }
}

export function generateLogs(type, player1 = {}, player2 = {}, damage) {

    let text = getTextLog(type, player1.name, player2.name);
    switch (type) {
        case 'hit':
            text = `${getTime()} ${text} -${damage}hp [${player2.hp}/100]`;
            break;
        case 'defence':
            text = `${getTime()} ${text} blocked damdge: ${damage}hp`;
            break;
        case 'end':
        case 'draw':
            text = `${getTime()} ${text}`;
            break;
    }
    
    renderLogs(text);
}