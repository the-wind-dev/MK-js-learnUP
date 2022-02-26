/**
 * Создание HTML элемента "tag" с классом "className"
 * @param {string} tag 
 * @param {string} className 
 * @returns {HTMLElement}
 */
export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }
    
    return $tag;
};
/**
 * возвращает рандомный номер от 1 до num
 * @param {number} num 
 * @returns {number}
 */
export const getRandom = (num) => Math.ceil( Math.random() * num );

/**
 * создание кнопки перезагрузки в $arenas
 * @param {HTMLElement} $arenas - элементы, в который помещается кнопка
 */
export const createReloadButton = ($arenas) => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $reloadButton = createElement('button', 'button');
    $reloadButton.innerText = 'Restart';

    $reloadButton.addEventListener('click', function () {
        window.location.reload();
    });

    $reloadWrap.appendChild($reloadButton);
    $arenas.appendChild($reloadWrap);
};

/**
* вывод текущего времени в формате чч:мм:сс
* @returns {string}
*/
export const getTime = () => {
    const now = new Date();
    const time = `${formatTime( now.getHours() )}:${formatTime( now.getMinutes() )}:${formatTime( now.getSeconds()) }`;
    return time;
};
/**
 * 1 => 01
 * 11=> 11
 * @param {number} time 
 * @returns {string}
 */
const formatTime = (time) => {
    if (time < 10) {
        time = `0${time}`;
    }
    return time;
};
