import {
  getDataUser,
  addPosts,
  onSnapshotPosts,
  deletePosts,
  /* updateLikes, */
} from './firebaseFunctions.js';

export default () => {
  document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerInicio');
  divElement.innerHTML = `
    <section id="barraMenu">
      <img src="img/logo-blanco.png" alt="Logo Social Health Blanco">
      <h3>Health Social</h3>
      <img id="btnSalir" src="img/cerrar-sesion.png" alt="Botón cerrar sesión">
    </section>
    <section id= "pantallaView">
      <section id="infoUsuario">
        <img class="portada" >
        <div id ="datosUser">
          <figure>
            <img id="userPhoto" class="userPhoto" src="img/foto-ejemplo.jpg" alt="Foto del usuario">
          </figure>
          <section id="nameDescription">
            <h4 id="userName" class="userName">Name User</h4>
            <p id="userDescription" class="userDescription">Description User</p>
          </section>
        </div>
      </section>
      <section id= "bloquePosts">
        <section id="escribirPost">
          <textarea id="textToPost" class="textToPost" placeholder="¿Qué quieres compartir?"></textarea>
          <div class= "icons">
            <img id="btnFile" class="btnFile" src="img/agregar-img.png" alt="Botón para cargar imagen">
            <input id="subirFile" type="file" accept="image/jpeg" style="display:none">
            <button type= "submit" id="shareButton" >Compartir</button>
          </div>
        </section>
        <section id="sectionPosts">
          <table id="tablaPosts">
            <tbody>
              <tr>
                <th>
                  <div id="userPost">
                    <img class="userPhotoPost" src="img/foto-ejemplo.jpg" alt="Foto del usuario">
                    <p>Publicado por Mariana López</p>
                  </div> 
                  <div>
                    <img id="iconoEdit" class="icono-conf" src="img/btn-edit.png" alt="icono de editar">
                    <img id="#iconoDelete" class="icono-conf iconoDelete" src="img/btn-delete.png" alt="icono delete">
                  </div>
                </th>
              </tr>
              <tr>
                <td id="textPost" class="textPost" >
                  <pre class="datePost">${new Date().toLocaleString('en-ES')}</pre>
                  The user-select property specifies whether the text of an element can be selected.
                  In web browsers, if you double-click on some text it will be selected/highlighted. This property can be used to prevent this.
                </td>
              </tr>
              <tr>
                <td id="picturePost" style="display: none;"></td>
              </tr>
              <tr>
                <td>
                  <img id="logoLike" src="img/megusta.png" alt="Botón me gusta">
                  <img id="logoComent" src="img/comentario.png" alt="Botón comentar">
                </td>
              </tr>
            </tbody>
          </table>
         </section>
        </section>
    </section>`;

  // Templates de publicaciones
  function postTemplate(photoUser, nameUser, datePublication, postUser, IDdocumento, likesCount) {
    const tabla = divElement.querySelector('#tablaPosts');
    tabla.innerHTML += `
        <tbody>
          <tr>
            <th>
              <div id="userPost">
                <img class="userPhotoPost" src="${photoUser}" alt="Foto del usuario">
                <p>${nameUser}</p>
              </div> 
            <div>  
                <img id="iconoEdit" class="icono-conf" src="img/btn-edit.png" alt="icono de editar">
                <img id="#iconoDelete" data-post="${IDdocumento}" class="icono-conf iconoDelete" src="img/btn-delete.png" alt="icono delete">
            </div>
            </th>
          </tr>
          <tr>
            <td id="textPost" class="textPost">
              <pre class="datePost">${datePublication}</pre>
              ${postUser}
            </td>
          </tr>
          <tr>
            <td id="picturePost" style="display: none;"></td>
          </tr>
          <tr>
            <td>
              <img id="logoLike" class="iconoLike" data-like="${IDdocumento}" src="img/megusta.png" style="margin-right: 5px;" alt="Botón me gusta">
              <span id="${IDdocumento}" style="margin-right: 10px; align-self: center;">${likesCount}</span>
              <img id="logoComent" src="img/comentario.png" style="margin-right: 5px;" alt="Botón comentar">
              <span style="margin-right: 10px; align-self: center;">0</span>
            </td>
          </tr>
        </tbody>
      `;
    return tabla;
  }

  // Obtener los datos de un usuario (CON DATOS DE REGISTRO CORREO y GMAIL)
  const user = firebase.auth().currentUser;
  const userPhoto = divElement.querySelector('#userPhoto');
  const userName = divElement.querySelector('#userName');
  const userDescription = divElement.querySelector('#userDescription');
  getDataUser()
    .then((querySnapshot) => { // TODO: Mostrar 'User' en ingreso con correo al publicar
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => name de registro: ${doc.data().NameRegister} ID: ${doc.data().IdUserActive}`);
        // console.log(`Id del usuario: ${user.uid}`);
        if (user.uid === doc.data().IdUserActive) {
          const nombreUsuarioCorreo = doc.data().NameRegister;
          userName.textContent = nombreUsuarioCorreo;
          userPhoto.src = `${doc.data().PhotoRegister}`;
          userDescription.textContent = doc.data().EmailRegister;
        }
      });
    });

  divElement.querySelector('#btnFile').addEventListener('click', () => {
    divElement.querySelector('#subirFile').click();
  });

  // Función para publicar post
  const shareButton = divElement.querySelector('#shareButton');
  shareButton.addEventListener('click', () => {
    const textToPost = divElement.querySelector('#textToPost');
    if (textToPost.value !== '') {
      // addPosts(name, postText);
      addPosts(user.displayName ? user.displayName : userName.textContent, textToPost, user)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        });
    }
    textToPost.value = '';
  });

  // Mostrar todos los posts de la colección
  const tabla = divElement.querySelector('#tablaPosts');
  onSnapshotPosts().orderBy('publicationDate', 'desc')
    // firebase.firestore().collection('postss').orderBy('publicationDate', 'desc')
    .onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const fotoUsuario = doc.data().userPhotoPost;
        const nombreUsuario = doc.data().userWhoPublishes;
        const fechaPost = doc.data().publicationDate;
        const textoPost = doc.data().publishedText;
        const likes = doc.data().likesPost;
        const idDocumento = doc.id;
        postTemplate(fotoUsuario, nombreUsuario, fechaPost, textoPost, idDocumento, likes);

        // Funcionalidad para eliminar
        const btnDelete = divElement.querySelectorAll('.iconoDelete');
        btnDelete.forEach((boton) => {
          boton.addEventListener('click', (e) => {
            const confirmar = window.confirm('¿Estás seguro de que deseas borrar este post?');
            if (confirmar) {
              // console.log(e.target.dataset.post);
              deletePosts(e.target.dataset.post);
              console.log(userName.textContent, nombreUsuario);
            }
          });
        });

        // Funcionalidad para dar like
        const btnLike = divElement.querySelectorAll('.iconoLike');
        btnLike.forEach((like) => {
          like.addEventListener('click', (e) => {
            const counter = [likes + 1];
            const reducer = (accumulator, curr) => accumulator + curr;
            /* console.log(counter);
            console.log(counter.reduce(reducer)); */
            const changeSpan = divElement.querySelector(`#${e.target.dataset.like}`);
            changeSpan.innerHTML = counter.reduce(reducer);
            e.target.style.background = '#c74c4c';
            updateLikes(e.target.dataset.like, counter.reduce(reducer));
          });
        }); // FIN
      });
    });

  // Funcion para cerrar sesión
  const btnSalir = divElement.querySelector('#btnSalir');
  btnSalir.addEventListener('click', () => {
    const confirmar = window.confirm('¿Estás seguro de que deseas salir?');
    if (confirmar === true) {
      firebase.auth().signOut();
      window.location.hash = '#/';
      console.log('Se ha cerrado sesión');
    }
  });
  return divElement;
};
