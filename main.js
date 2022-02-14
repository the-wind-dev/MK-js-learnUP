const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Subzero',
    hp: 121,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'gun'],
    attack: function() {
        console.log(`${this.name} Fight...`);
    }
};
const player2 = {
    player: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'sword', 'gun'],
    attack: function() {
        console.log(`${this.name} Fight...`);
    }
};

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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$randomButton.addEventListener('click', function() {
    console.log('It happened!!!');
    changeHP(player1);
    changeHP(player2);
});

function changeHP(playerObj) {
    const $playerLife = document.querySelector('.player' + playerObj.player + ' .life');
    playerObj.hp -= 20;
    $playerLife.style.width = playerObj.hp + '%';

    if (playerObj.hp < 0 ) {
        $arenas.appendChild(playerLose(playerObj.name));
    }
}

function playerLose(name) {
    const $loseTitle = createElement('div', 'loseTitle');
    $loseTitle.innerText = name + ' lose';

    return $loseTitle;
}