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
    case '#/': { return container.appendChild(componentes.Registro()); }
    case '#/inicio': { return container.appendChild(componentes.Inicio()); }
    default:
      break;
  }
  return container;
};
