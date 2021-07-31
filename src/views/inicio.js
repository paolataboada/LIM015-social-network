export default () => {
  // document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const inicio = `
    <div id="barraMenu">
      <img src="img/btn-menu.png" alt="Botón de menú desplegable">
      <div>
        <h3> Health Social</h3>
        <img src="img/logo-blanco.png" alt="Logo Social Health Blanco">
      </div>
    </div>

    <div id="infoUsuario">
      <figure>
        <img src="img/foto-ejemplo.jpg" alt="Foto del usuario">
      </figure>
      <div>
        <h4>Alexandra Smith</h4>
        <p>Cooker keto</p>
      </div>
    </div>

    <div id="escribirPost">
      <textarea placeholder="¿Qué quieres compartir?"></textarea>
      <div>
        <img id="btnFile" src="img/agregar-img.png" alt="Botón para cargar imagen">
        <input id="subirFile" type="file" accept="image/jpeg" style="display:none">
        <button>Compartir</button>
      </div>
    </div>

    <div id="sectionPosts">
      <table>
        <tr>
          <th>Publicado por José Castro</th>
        </tr>
        <tr>
          <td>Ahora podemos ver una caja que tenía una anchura de 300 px y que por culpa de una palabra muy larga se deforma la caja o el texto aparece por...</td>
        </tr>
        <tr>
          <td>
            <img id="logoLike" src="img/megusta.png" alt="Botón me gusta">
            <img id="logoComent" src="img/comentario.png" alt="Botón comentar">
          </td>
        </tr>
      </table>
      <table>
        <tr>
          <th>Publicado por Mariana López</th>
        </tr>
        <tr>
          <td>The user-select property specifies whether the text of an element can be selected.

          In web browsers, if you double-click on some text it will be selected/highlighted. This property can be used to prevent this.</td>
        </tr>
        <tr>
          <td>
            <img id="logoLike" src="img/megusta.png" alt="Botón me gusta">
            <img id="logoComent" src="img/comentario.png" alt="Botón comentar">
          </td>
        </tr>
      </table>
    </div>
    `;
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerInicio');
  divElement.innerHTML = inicio;
  return divElement;
};
