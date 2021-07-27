export default () => {
  document.querySelector('nav').style.display = 'none';
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
      <img src="img/foto-ejemplo.jpg" alt="Foto del usuario">
      <div>
        <h4>Alexandra Smith</h4>
        <p>Cooker keto</p>
      </div>
    </div>

    <div id="escribirPost">
      <textarea placeholder="¿Qué quieres compartir?"></textarea>
      <div>
        <img src="img/agregar-img.png" alt="Botón para cargar imagen">
        <button>Compartir</button>
      </div>
    </div>

    <div>
      <table>
        <tr>
          <th>Publicado por José Castro</th>
        </tr>
        <tr>
          <td>...</td>
        </tr>
        <tr>
          <td>
            <img src="img/megusta.png" alt="Botón me gusta">
            <img src="img/comentario.png" alt="Botón comentar">
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
