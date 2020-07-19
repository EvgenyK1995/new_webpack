import './index.styl'

export default function drawPopUp() {
  let popUp = document.createElement('div');
  let text = document.createTextNode('Здесь какой-то текстик');
  popUp.appendChild(text);
  popUp.setAttribute('class', 'popUp');
  document.getElementById('main').appendChild(popUp);
}