/* eslint-disable max-len */
import {
  getDataUser,
  addPosts,
  onSnapshotPosts,
  updatePosts,
  deletePosts,
  getPost,
  countLikes,
} from './firebaseFunctions.js';

export default () => {
  document.querySelector('nav').style.display = 'none';
  document.querySelector('footer').style.display = 'none';
  const divElement = document.createElement('div');
  divElement.setAttribute('id', 'containerInicio');
  divElement.innerHTML = `
    <section id="barraMenu" class="barraMenu">
      <img src="img/logo-blanco.png" alt="Logo Social Health Blanco">
      <h2>Social Health</h2>
      <img id="btnSalir" class="btnSalir" src="img/cerrar-sesion.png" alt="Botón cerrar sesión">
    </section>
    <section id= "pantallaView">
      <section id="infoUsuario">
        <img class="portada" >
        <div id ="datosUser" class="datosUser">
          <figure class="contenedorFoto">
            <img id="userPhoto" class="userPhoto" src="" >
          </figure>
          <section id="nameDescription">
            <h4 id="userName" class="userName"></h4>
            <p id="userDescription" class="userDescription"></p>
          </section>
        </div>
        <img class="publicidad" src="img/publi.PNG">
        <img class="publicidad" src="img/publicidad2.PNG">
        <img class="publicidad" src="img/publicidad.jpg">
      </section>
      <section id= "bloquePosts">
        <section id="escribirPost">
          <textarea id="textToPost" class="textToPost" placeholder="¿Qué quieres compartir?"></textarea>
          <div id= "icons">
            <img id="btnFile" src="img/agregar-img.png" alt="Botón para cargar imagen" style="display:none">
            <input id="subirFile" type="file" accept="image/jpeg" style="display:none">
            <button id="shareButton">Compartir</button>
          </div>
        </section>
        <section id="sectionPosts">
          <table id="tablaPosts"></table>
        </section>
      </section>
    </section>`;

  // Templates de publicaciones
  function postTemplate(photoUser, nameUser, datePublication, postUser, IDdocumento, upLike, colorLike) {
    const tabla = divElement.querySelector('#tablaPosts');
    tabla.innerHTML += `
        <tbody class="cuerpoTabla">
          <tr>
            <th class="headPost">
              <div class="userWhoPost">
                <img class="userPhotoPost" src="${photoUser}" alt="Foto del usuario"><p>${nameUser}</p>
              </div> 
              <div class="editYdelete">  
                <img id="iconoEdit-${IDdocumento}" data-edit="${IDdocumento}" class="icono-conf iconoEdit" src="img/btn-edit.png" alt="icono de editar">
                <img id="iconoDelete" data-post="${IDdocumento}" class="icono-conf iconoDelete" src="img/btn-delete.png" alt="icono delete">
              </div>
            </th>
          </tr>
          <tr>
            <td id="textPost" class="textPost">
              <pre class="datePost">${datePublication}</pre>
              <textarea id="publicacion" class="publicacion" rows="5" readonly >${postUser}</textarea>
              <button id="Editar-${IDdocumento}" class="Editar Editar-${IDdocumento}" data-edicion="${IDdocumento}" style="display: none;">Editar</button>
            </td>
          </tr>
          <tr>
            <td id="picturePost" style="display: none;"></td>
          </tr>
          <tr>
            <td>
              <img id="like-${IDdocumento}" class="iconoLike ${colorLike}" data-like="${IDdocumento}" src="img/megusta.png" style="margin-right: 5px;" alt="Botón me gusta">
              <span style="margin-right: 10px; align-self: center;">${upLike}</span>
              <img id="logoComent" src="img/comentario.png" style="margin-right: 5px; display:none;" alt="Botón comentar">
              <span style="margin-right: 10px; align-self: center; display:none;">0</span>
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
        // console.log(doc.data());
        // user.uid = es el UID de usuario que aparece en authentication de firebase
        // doc.data().IdUserActive . IdUserActive es una propiedad que esta dentro del objeto doc y doc.data() muestra todos los documentos.
        if (user.uid === doc.data().IdUserActive) {
          const nombreUsuarioCorreo = doc.data().NameRegister;
          userName.textContent = nombreUsuarioCorreo;
          userPhoto.src = `${doc.data().PhotoRegister}`;
          userDescription.textContent = doc.data().EmailRegister;
        }
      });
    });

  // Evento Para agregar una imagen como post
  divElement.querySelector('#btnFile').addEventListener('click', () => {
    divElement.querySelector('#subirFile').click();
  });

  // Función para publicar post
  const shareButton = divElement.querySelector('#shareButton');
  shareButton.addEventListener('click', () => {
    const textToPost = divElement.querySelector('#textToPost');
    if (textToPost.value !== '') {
      // eslint-disable-next-line max-len
      console.log(userName.textContent, user.displayName);
      addPosts(user.displayName ? user.displayName : userName.textContent, textToPost, user, user.uid)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
        });
    }
    textToPost.value = '';
  });

  // Mostrar todos los posts de la colección
  const tabla = divElement.querySelector('#tablaPosts');
  onSnapshotPosts()
    .onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
      querySnapshot.forEach((doc) => {
        const fotoUsuario = doc.data().userPhotoPost;
        const nombreUsuario = doc.data().userWhoPublishes;
        console.log(nombreUsuario);
        const fechaPost = doc.data().publicationDate;
        const textoPost = doc.data().publishedText;
        const idUsuario = user.uid;
        const contadorLike = doc.data().likesPost;
        const idDocumento = doc.id;
        const btnHeart = (contadorLike.indexOf(idUsuario) !== -1) ? 'painted' : '';
        postTemplate(fotoUsuario, nombreUsuario, fechaPost, textoPost, idDocumento, contadorLike.length, btnHeart);

        // Funcionalidad para dar like
        const btnLike = divElement.querySelectorAll('.iconoLike');
        btnLike.forEach((like) => {
          like.addEventListener('click', (e) => { // console.log(e.target);
            const idPost = e.target.dataset.like;
            countLikes(e.target, idPost, idUsuario);
          });
        });

        // Funcionalidad para eliminar
        const btnDelete = divElement.querySelectorAll('.iconoDelete');
        btnDelete.forEach((boton) => {
          boton.addEventListener('click', (e) => {
            /* console.log(user.uid, doc.data().userIdent, idDocumento);
            if (user.uid === doc.data().userIdent) { */
            const confirmar = window.confirm('¿Estás seguro de que deseas borrar este post?');
            if (confirmar) {
              deletePosts(e.target.dataset.post);
              console.log(userName.textContent, nombreUsuario);
            }
            /* } else {
              console.log('no puedes editar, que pena');
            } */
          });
        });

        // const textoAeditar = divElement.querySelector('#publicacion').value;

        // Funcionalidad para editar posts
        const iconEdit = divElement.querySelectorAll('.iconoEdit');
        iconEdit.forEach((iconoEdit) => {
          iconoEdit.addEventListener('click', (e) => {
            // console.log(e.target, e.target.id, e.target.className);
            // const btnEditar = divElement.querySelectorAll('[data-Edit]');
            const btnEditar = divElement.querySelector(`.Editar-${idDocumento}`).dataset.edicion;
            // const btnEditar = divElement.querySelector(`.editar-${idDocumento}`);
            // const btnEditar = divElement.querySelectorAll('[data-edicion]');
            const botonEditar = e.target.dataset.edicion;
            // btnEditar.style.display = 'block';
            console.log(e.target.dataset.edit, botonEditar, btnEditar);
            const idPost = e.target.dataset.edit;
            // console.log(idPost);
            getPost(idPost)
              .then((docu) => {
                console.log('Document data:', docu.data());
                // divElement.querySelector('.publicacion').contentEditable = true;
                divElement.querySelectorAll('.publicacion').readOnly = false;
                const data = docu.data();
                divElement.querySelectorAll('.publicacion').value = data.publishedText;
              });
            // const postData = post.data();
            // console.log(post.publishedText);
            // btnEditar.addEventListener('click', () => {
            //   const nuevoTexto = divElement.querySelector('.publicacion').value;
            //   console.log(idPost, nuevoTexto);
            //   updatePosts(idPost, nuevoTexto)
            //     .then(() => {
            //       console.log('Document successfully updated!');
            //       divElement.querySelector('.publicacion').readOnly = true;
            //       divElement.querySelector('.Editar').style.display = 'none';
            //     });
            // });
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
