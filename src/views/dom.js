export const viewsDom = {
  templateLogin: `
    <div id="logoPrincipal">
      <figure><img src ="img/logo-azul.png"></figure>
      <h2>Social Health </h2>
    </div>
    <div id="dataLogIn"> 
      <p id="welcome">¡Bienvenid@ a Social Health!</p>
      <form id="signIn">
        <input type="email" placeholder="Email" id="emailIngresar">
        <p id="errorEmailLogIn">Cuenta no encontrada o incorrecta</p>
        <input type="password" placeholder="Contraseña" id="contraseñaIngresar">
        <p id="errorPassLogIn">Contraseña de logueo incorrecta</p>
        <button id="btnEntrar">Ingresar</button>
      </form>
    </div>
    <div id="signUp">
      <p> O bien ingresa con: </p>
      <div id="logosRegister">
        <img id="fb" src="img/Facebook.png">
        <img id="google" src="img/Google.png">
      </div>
      <p>No tienes una cuenta? <a id="btnRegistrar" href="#/modal">Regístrate</a></p>
    </div> `,

  templateSignup: `
    <section id="modal">
      <a href="#/"> x </a>
      <h2>Registro de Usuario </h2>
      <form id="container-modal">
          <input type="text" id="usuario" placeholder="Nombre de usuario" autocomplete="off">
          <p id="errorNameSignUp">Por favor ingrese su nombre</p>
          <input type="email" id="e-mail" placeholder="Email" autocomplete="off">
          <p id="errorEmailSignUp">Correo incorrecto</p>
          <input type="password" id="contraseña" placeholder="Contraseña" autocomplete="off">
          <p id="errorPassSignUp">Debe contener más de 6 caracteres</p>
          <input type="password" id="confirmarContraseña" placeholder="Confirmar contraseña" autocomplete="off">
          <p id="errorPassConfSignUp">Las contraseñas no coinciden</p>
          <button>Enviar</button>
      </form>
    </section> `,
  templateHome: `
    <div id="barraMenu">
      <img src="img/logo-blanco.png" alt="Logo Social Health Blanco">
      <h3>Health Social</h3>
      <img id="btnSalir" src="img/cerrar-sesion.png" alt="Botón cerrar sesión">
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
    </div>`,
};
