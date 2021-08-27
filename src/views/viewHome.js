/* eslint-disable max-len */
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
          <div class= "icons" style="justify-content: flex-end;">
            <img id="btnFile" class="btnFile" src="img/agregar-img.png" alt="Botón para cargar imagen" style="display:none">
            <input id="subirFile" type="file" accept="image/jpeg" style="display:none">
            <button type="submit" id="shareButton">Compartir</button>
          </div>
        </section>
        <section id="sectionPosts">
          <table id="tablaPosts"></table>
        </section>
      </section>
    </section>`;

  // Templates de publicaciones
  function postTemplate(photoUser, nameUser, datePublication, postUser, IDdocumento, upLike) {
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
              <img id="like-${IDdocumento}" class="iconoLike" data-like="${IDdocumento}" src="img/megusta.png" style="margin-right: 5px;" alt="Botón me gusta">
              <span style="margin-right: 10px; align-self: center;">${upLike}</span>
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
    .then((querySnapshot) => {
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
      // eslint-disable-next-line max-len
      addPosts(user.displayName ? user.displayName : userName.textContent, textToPost, user, user.uid)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        });
    }
    textToPost.value = '';
  });

  // Mostrar todos los posts de la colección
  const tabla = divElement.querySelector('#tablaPosts');
  onSnapshotPosts().orderBy('publicationDate', 'desc')
    .onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const fotoUsuario = doc.data().userPhotoPost;
        const nombreUsuario = doc.data().userWhoPublishes;
        const fechaPost = doc.data().publicationDate;
        const textoPost = doc.data().publishedText;
        const idUsuario = user.uid;
        const contadorLike = doc.data().likesPost;
        const idDocumento = doc.id;
        postTemplate(fotoUsuario, nombreUsuario, fechaPost, textoPost, idDocumento, contadorLike.length);

        firebase.firestore().collection('posts').doc(doc.id).update({
          idDocumento: doc.id,
        });

        // Funcionalidad para dar like
        const btnLike = divElement.querySelectorAll('.iconoLike');
        btnLike.forEach((like) => {
          like.addEventListener('click', (e) => {
            /* const button = document.getElementById('button');
            function myFunction() {
              const element = document.getElementById('myDIV');
              element.classList.toggle('mystyle');
            }
            button.addEventListener('click', myFunction); */

            /* console.log(e.target); */
            if (e.target.classList.contains('painted')) {
              // e.target.style.background = 'none';
              /* e.target.classList.remove('painted'); */
              firebase.firestore().collection('posts').doc(e.target.dataset.like).update({
                likesPost: firebase.firestore.FieldValue.arrayRemove(idUsuario),
              });
              /* const varrr = document.getElementById(`${e.target.id}`);
              varrr.classList.remove('painted'); */
            } else {
              // console.log(e.target.id);
              // e.target.classList.toggle('painted');
              // e.target.style.background = '#c74c4c';
              firebase.firestore().collection('posts').doc(e.target.dataset.like).update({
                likesPost: firebase.firestore.FieldValue.arrayUnion(idUsuario),
              });
              /* const varrr = document.getElementById(`${e.target.id}`);
              varrr.classList.add('painted'); */
            }
          });
        }); // FIN

        // Funcionalidad para eliminar
        const btnDelete = divElement.querySelectorAll('.iconoDelete');
        btnDelete.forEach((boton) => {
          boton.addEventListener('click', (e) => {
            const confirmar = window.confirm('¿Estás seguro de que deseas borrar este post?');
            if (confirmar) {
              deletePosts(e.target.dataset.post);
              console.log(userName.textContent, nombreUsuario);
            }
          });
        });
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
