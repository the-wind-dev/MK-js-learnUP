const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const LOGS = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
    player: 1,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'gun'],
    // attack: attack,
    changeHP,
    elHP,
    renderHP,
};
const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'sword', 'gun'],
    // attack: attack,
    changeHP,
    elHP,
    renderHP,
};

// function attack() {
//     console.log(`${this.name} Fight...`);
// }

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

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
}

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

function getRandom(num) {
    return Math.ceil( Math.random() * num );
}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lost';

    return $loseTitle;
}
function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' won';
    } else {
        $winTitle.innerText = 'draw';
    }
    
    return $winTitle;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
}

$arenas.appendChild( createPlayer(player1) );
$arenas.appendChild( createPlayer(player2) );

function enemyAttack() {
    const length = ATTACK.length;
    const hit = ATTACK[ getRandom(length - 1) ];
    const defence = ATTACK[ getRandom(length- 1) ];

    return {
        value: getRandom( HIT[hit] ),
        hit,
        defence,
    };
}

function playerAttack() {
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

function showResult() {
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
/**
 * создаем элемент и добаваляем его в чат
 * @param {string} text 
 */
function renderLogs(text) {
    el = `<p>${text}</p>`;
    $chat.insertAdjacentHTML('afterbegin', el);
}
/**
 * вывод текущего времени в формате чч:мм:сс
 * @returns {string}
 */
function getTime() {
    const now = new Date();
    time = time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return time;
}
/**
 * генерируем лог и сразу его отрисовываем
 * @param {string} type - тип сообщения
 * @param {object} [player1]
 * @param {object} [player2]
 * @param {number} [damage] 
 */
function generateLogs(type, player1, player2, damage) {
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



