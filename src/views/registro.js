export default () => {
  // document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const registro = `
    <div id="logoPrincipal">
      <figure><img src ="img/logo-azul.png"></figure>
      <h2>Social Health </h2>
    </div>
    <div id="dataLogIn"> 
      <p>¡Bienvenid@ a Social Health!</p>
      <form id="signIn">
        <input type="email" placeholder="Email" id="emaila" autocomplete="off">
        <input type="password" placeholder="Contraseña" id="contraseñaa" autocomplete="off">
        <button type="submit">Ingresar</button>
      </form>
    </div>
    <div id="signUp">
      <p> O bien ingresa con: </p>
      <div id="logosRegister">
        <img src="img/Facebook.png">
        <img src="img/Google.png">
      </div>
      <p>No tienes una cuenta? <a id="btnRegistrar" href="#/modal">Regístrate</a></p>
    </div> `;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerRegistro');
  divElement.innerHTML = registro;
  return divElement;
};

/* const formSignIn = document.querySelector('#signIn');
formSignIn.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.querySelector('#emaila').value;
  const password = document.querySelector('#contraseñaa').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      containerModal.reset();
      console.log('sign up', userCredential);
      // Signed in
      const user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
    });
}); */
