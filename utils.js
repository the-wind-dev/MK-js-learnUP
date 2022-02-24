import { $arenas } from './consts.js';

export function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
}
// export default createElement;

export function getRandom(num) {
    return Math.ceil( Math.random() * num );
}

export function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
}

/**
* вывод текущего времени в формате чч:мм:сс
* @returns {string}
*/
export function getTime() {
   const now = new Date();
   const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
   return time;
}