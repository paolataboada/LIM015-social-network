export default () => {
  const modal = `
    <section id="modal">
      <a href="#/"> x </a>
      <h2>Registro de Usuario </h2>
      <form id="container-modal">
          <input type="text" id="nombre" placeholder="Nombre">
          <input type="text" id="usuario" placeholder="Nombre de usuario">
          <input type="email" id="e-mail" placeholder="Email">
          <input type="password" id="contraseña" placeholder="Contraseña">
          <input type="password" id="confirmarContraseña" placeholder="Confirmar contraseña">
          <button>Enviar</button>
      </form>
    </section> `;

  const divElement = document.createElement('div');
  //   divElement.setAttribute('id', 'fondoModal');
  divElement.innerHTML = modal;

  function verificar() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        // Email verification sent!
        // ...
      });
  }
  const containerModal = divElement.querySelector('#container-modal');
  containerModal.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = divElement.querySelector('#e-mail').value;
    const password = divElement.querySelector('#contraseña').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        containerModal.reset();
        console.log('sign up', userCredential);
        // Signed in
        // const user = userCredential.user;
        // ...
      })
      .then(() => {
        verificar();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        console.log(errorCode, errorMessage);
      });
  });

  return divElement;
};
