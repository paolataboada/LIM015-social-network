export default () => {
  const registro = `<div> 
     <img src ="img/logo-azul.png">
     <h2> Social Health </h2>
   </div>
   <div> 
     <p> ¡Bienvenid@ a Social Health! </p> 
     <input type="email" placeholder="E-mail"> 
     <input type="password" placeholder="Contraseña"> 
     <button >Ingresar</button> 
   </div>
   <div>
     <p> O bien ingresa con: </p>
     <div><img src="img/Facebook.png"> </div>
     <div><img src="img/Google.png"> </div>
     <p> No tienes una cuenta? <a href="#/">Regístrate</a></p>
   </div>`;

  const divElement = document.createElement('div');
  divElement.innerHTML = registro;

  return divElement;
}