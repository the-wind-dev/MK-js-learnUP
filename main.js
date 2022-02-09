const player1 = {
    name: 'Subzero',
    hp: 88,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knife', 'sword', 'gun'],
    attack: function() {
        console.log(`${this.name} Fight...`);
    }
};
const player2 = {
    name: 'Scorp',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knife', 'sword', 'gun'],
    attack: function() {
        console.log(`${this.name} Fight...`);
    }
};

function createPlayer (playerNumber, player) {
    const $player1 = document.createElement('div');
    $player1.classList.add(playerNumber);

    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $character = document.createElement('div');
    $character.classList.add('character');

    const $life = document.createElement('div');
    $life.classList.add('life');

    const $name = document.createElement('div');
    $name.classList.add('name');

    const $img = document.createElement('img');

    $player1.appendChild($progressbar);
    $player1.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    $life.style.width = "100%";
    $name.innerText = player.name;
    $img.src= player.img;


    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player1);
}
createPlayer('player1', player1);
createPlayer('player2', player2);