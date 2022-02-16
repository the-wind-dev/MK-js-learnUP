const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const HIT = {
    head: 30,
    body: 25,
    foot: 20,
};
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'gun'],
    attack: attack,
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
    attack: attack,
    changeHP: changeHP,
    elHP: elHP,
    renderHP: renderHP,
};

function attack() {
    console.log(`${this.name} Fight...`);
}

function changeHP(damage) {
    this.hp -= damage;  
    if (this.hp <= 0 ) {  
        this.hp = 0;
    }
}

function elHP() {
    const $playerLife = document.querySelector('.player' + this.player + ' .life');
    return $playerLife;
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

// $randomButton.addEventListener('click', function() {
//     console.log('It happened!!!');
    
//     player1.changeHP( getRandom(20) );
//     player1.renderHP();
    
//     player2.changeHP( getRandom(20) );
//     player2.renderHP();


//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true;
//         createReloadButton();
//     }

//     if (player1.hp === 0 && player1.hp < player2.hp ) {
//         $arenas.appendChild( playerWin(player2.name) );
//     } else if (player2.hp === 0 && player2.hp < player1.hp ) {
//         $arenas.appendChild( playerWin(player1.name) );
//     } else if (player1.hp === 0 && player2.hp === 0) {
//         $arenas.appendChild( playerWin() );
//     }
// });
function enemyAttack() {
    const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

    return {
        value: getRandom( HIT[hit] ),
        hit,
        defence,
    };
}

$formFight.addEventListener('submit', function(event) {
    event.preventDefault();
    const enemy = enemyAttack();

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

    console.log('####: you', attack);
    console.log('####: enemy', enemy);

    if ( enemy.hit !== attack.defence ) {
        player1.changeHP(enemy.value);
        player1.renderHP();
    }
    if ( attack.hit !== enemy.defence ) {
        player2.changeHP(attack.value);
        player2.renderHP();
    }

    if (player1.hp === 0 || player2.hp === 0) {
    $fightButton.disabled = true;
    createReloadButton();
    }

    if (player1.hp === 0 && player1.hp < player2.hp ) {
        $arenas.appendChild( playerWin(player2.name) );
    } else if (player2.hp === 0 && player2.hp < player1.hp ) {
        $arenas.appendChild( playerWin(player1.name) );
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild( playerWin() );
    }
});




