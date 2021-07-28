export default () => {
  document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const registro = `
    <div id="logoPrincipal">
      <figure><img src ="img/logo-azul.png"></figure>
      <h2>Social Health </h2>
    </div>
    <div id="dataLogIn"> 
      <p>¡Bienvenid@ a Social Health!</p> 
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Contraseña">
      <button>Ingresar</button> 
    </div>
    <div id="signUp">
      <p> O bien ingresa con: </p>
      <div id="logosRegister">
        <img src="img/Facebook.png">
        <img src="img/Google.png">
      </div>
      <p>No tienes una cuenta? <a href="#/modal">Regístrate</a></p>
    </div> `;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerRegistro');
  divElement.innerHTML = registro;
  return divElement;
};
const modalRegistro = () => {
  document.querySelector('#container-modal').innerHTML = `
    <div> 
      <h3> Registro de Usuario </h3>
    </div>
    <div>
      <input type="text" id="nombre" placeholder="Nombre">
    </div>
    <div>
      <input type="text" id="usuario" placeholder="Nombre de usuario">
    </div>
    <div>
      <input type="email" id="e-mail" placeholder="E-mail">
    </div>
    <div>
      <input type="password" id="constraseña" placeholder="Contraseña">
    </div>
    <div>
      <input ype="password" id="confirmarContraseña" placeholder="Confirmar contrseña">
    </div>`

}
document.getElementById('container-modal').addEventListener(click, ());