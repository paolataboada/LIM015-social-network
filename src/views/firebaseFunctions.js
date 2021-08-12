/* ------------------- FIREBASE PARA SOCIAL HEALTH --------------- */

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

/* --------- COMANDOS PARA AUTENTICACIÓN DE FIREBASE --------  */

/* ----REGISTRO O SIGN UP ----- */
// Crear nuevo usuario
export function createUser(email, pass) {
  const auth = firebase.auth();
  return auth.createUserWithEmailAndPassword(email, pass);
}
// Enviar correo de verificacion
export function sendEmail() {
  const auth = firebase.auth();
  return auth.currentUser.sendEmailVerification();
}

// Datos que ingresó el usuario
export const user = () => firebase.auth().currentUser;

/* ---------------- COMANDOS PARA CLOUD FIRESTORE -----------------  */

// const sendDataCurrentUser = (user) => {
//   const db = firebase.firestore();
//   let Photo;
//   let Name;
//   if (user.photoURL != null && user.displayName != null) {
//       Photo = user.photoURL;
//       Name = user.displayName;
//   } else {
//       Photo = 'img/default-avatar.png';
//       Name = 'User';
//   }
//   return db.collections
