// Este es el punto de entrada de tu aplicacion
import { changeView } from './lib/router.js';

// Configuración de firebase para Social Health
const firebaseConfig = {
  apiKey: 'AIzaSyB8IDdhrhSpd9hXvAWU79ITlAxmaJcNurA',
  authDomain: 'proyect-social-network.firebaseapp.com',
  projectId: 'proyect-social-network',
  storageBucket: 'proyect-social-network.appspot.com',
  messagingSenderId: '149252870254',
  appId: '1:149252870254:web:dbafa1821ad07d8952d67f',
  measurementId: 'G-KCW1JG85PX',
};

// Initialización de Firebase en la webapp
firebase.initializeApp(firebaseConfig);

// Comandos de firebase: autenticación, firestore y analytics
firebase.auth();
firebase.firestore();
firebase.analytics();

// Cambio de vistas para el usuario actual
const init = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      changeView(window.location.hash);
    } else {
      window.location.hash = '#/';
    }
  });
  window.addEventListener('hashchange', () => changeView(window.location.hash));
};
window.addEventListener('load', init);
