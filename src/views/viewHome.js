export default () => {
  // Obtén el perfil de un usuario
  const user = firebase.auth().currentUser;
  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
    console.log(displayName, email, photoURL, emailVerified, uid);
    // Aparece null porque los datos no han sido guardados,
    // debemos guardar los datos en una colección de Cloud Firestore
    // Agregar funcionalidades de Firebase Storage (controller/controller-firestore.js)
  }

  document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerInicio');
  divElement.innerHTML = `
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
        <h4 id="nombreUsuario"></h4>
        <p>Cooker keto</p>
      </div>
    </div>
    <div id="escribirPost">
      <textarea id="post" placeholder="¿Qué quieres compartir?"></textarea>
      <div>
        <img id="btnFile" src="img/agregar-img.png" alt="Botón para cargar imagen">
        <input id="subirFile" type="file" accept="image/jpeg" style="display:none">
        <button type= "submit" id="btnCompartir" >Compartir</button>
      </div>
    </div>
    <div id="sectionPosts">
      <table>
        <tr>
          <th>Publicado por Mariana López</th>
        </tr>
        <tr>
          <td>The user-select property specifies whether the text of an element can be selected.

          In web browsers, if you double-click on some text it will be selected/highlighted. This property can be used to prevent this.</td>
        </tr>
        <tr>
          <td id="userImage"></td>
        </tr>
        <tr>
          <td>
            <img id="logoLike" src="img/megusta.png" alt="Botón me gusta">
            <img id="logoComent" src="img/comentario.png" alt="Botón comentar">
          </td>
        </tr>
      </table>
    </div>`;

  divElement.querySelector('#btnFile').addEventListener('click', () => {
    divElement.querySelector('#subirFile').click();
  });

  // Función para publicar post
  divElement.querySelector('#btnCompartir').addEventListener('click', () => {
    const postTxt = divElement.querySelector('#post').value;
    const postImg = divElement.querySelector('#subirFile').value;
    const userPost = divElement.querySelector('#userPost');
    const userImage = divElement.querySelector('#userImage');
    firebase.firestore().collection('users').add({
      publicacion: postTxt,
      imagen: postImg,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        userPost.textContent = postTxt;
        userImage.textContent = postImg;
        console.log(postTxt);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  });

  // Funcion para cerar sesión
  const btnSalir = divElement.querySelector('#btnSalir');
  btnSalir.addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        window.location.hash = '#/';
        console.log('Se ha cerrado sesión');
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });

  return divElement;
};
