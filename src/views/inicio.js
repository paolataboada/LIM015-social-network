export default () => {
  const inicio = `<div> 
       <p> ¡Bienvenid@ a Social Health! </p> 
       <input type="email" placeholder="E-mail"> 
       <input type="password" placeholder="Contraseña"> 
       <button >Ingresar</button> 
     </div>`;
  const divElement = document.createElement('div');
  divElement.innerHTML = inicio;
  return divElement;
}