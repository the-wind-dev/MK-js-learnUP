// import { ATTACK, HIT } from "../consts/index.js";
import { getRandom, createReloadButton, createElement } from "../utils/index.js";
// import {generateLogs} from '../logs/index.js';

class Player {
    constructor(props) {
        this.playerID = props.playerID;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.selector = `player${this.playerID}`;
        this.rootSelector = props.rootSelector;        
    }

    changeHP = (damage) => {
        this.hp -= damage; 

        if ( this.hp <= 0 ) {  
            this.hp = 0;
        }
    }

    elHP = () =>  {
        return document.querySelector(`.${this.selector} .life`);
    }

    renderHP = () => {
        this.elHP().style.width = this.hp + '%';
    }

    createPlayer = () => {

        const $player = createElement('div', 'player' + this.playerID);
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
    
        $life.style.width = this.hp + "%";
        $name.innerText = this.name;
        $img.src = this.img;
    
        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);
    
        return $player;
    }
}



export const player1 = new Player( {
    playerID: 1,
    name: 'Subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    rootSelector: 'arenas',
    
});

export const player2 = new Player( {
    playerID: 2,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    rootSelector: 'arenas',
} );
