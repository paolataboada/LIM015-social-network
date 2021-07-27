// Este es el punto de entrada de tu aplicacion
// import { myFunction } from './lib/index.js';
import { changeView } from './lib/index.js';

const iniciar = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', iniciar);

// console.log(window.location.hash);
