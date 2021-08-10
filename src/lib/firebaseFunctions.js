export function promesaIngresar(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password);
}

export function iniciarSesionGoogle(provider) {
  firebase.auth()
    .signInWithPopup(provider);
}
export function validar() {
  firebase.auth().currentUser.sendEmailVerification();
}

export function registroConEmail(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function cerrarSesion() {
  firebase.auth().signOut();
}
