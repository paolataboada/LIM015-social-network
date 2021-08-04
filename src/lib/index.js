// aqui exportaras las funciones que necesites

/* export const myFunction = () => {
  // aqui tu codigo
  console.log('Hola mundo!');
}; */
import { componentes } from '../views/index.js';

export const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '':
    case '#/': { return container.appendChild(componentes.Registrar()); }
    case '#/inicio': { return container.appendChild(componentes.Inicio()); }
    case '#/modal': { return container.appendChild(componentes.Modal()); }
    default:
      break;
  }
  return container;
};
