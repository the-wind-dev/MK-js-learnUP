import { $arenas } from './consts.js';

export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
};

export const getRandom = (num) => Math.ceil( Math.random() * num );

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
export const getTime = () => {
    const now = new Date();
   const time = `${formatTime( now.getHours() )}:${formatTime( now.getMinutes() )}:${formatTime( now.getSeconds()) }`;
   return time;
};

const formatTime = (time) => {
    if (time < 10) {
        time = `0${time}`;
    }
    return time;
};
