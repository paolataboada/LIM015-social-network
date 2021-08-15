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
// -------------------- LOGIN O INGRESAR -----------------------
// Iniciar sesión con correo
export function ingresarConEmail(email, pass) {
  const auth = firebase.auth();
  return auth.signInWithEmailAndPassword(email, pass);
}

// Iniciar sesión con Google
export function ingresarConGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}

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
export const user = firebase.auth().currentUser;

/* ---------------- COMANDOS PARA CLOUD FIRESTORE -----------------  */

export const sendDataUser = () => {
  const db = firebase.firestore();
  let photo;
  let name;
  if (photo == null && name == null) {
    photo = 'img/userPhoto-default.png';
    name = 'User';
  } else {
    photo = user.photoURL;
    console.log(photo);
    name = user.displayName;
    console.log(name);
  }
  return db.collection('users').doc(`${user.uid}`).set({
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
    country: 'Country',
    birthday: 'dd-mm-yyyy',
    description: 'Description',
  });
};

// Obteniendo la data
export function getData(userId) {
  console.log(userId);
  const db = firebase.firestore();
  return db.collection('users').doc(userId).get();
}
