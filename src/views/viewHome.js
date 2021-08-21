import {
  getDataUser, addPosts, onSnapshotPosts, deletePosts,
} from './firebaseFunctions.js';

export default () => {
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
        <img id="userPhoto" src="img/foto-ejemplo.jpg" alt="Foto del usuario">
      </figure>
      <div>
        <h4 id="userName">Name User</h4>
        <p id="userDescription">Description User</p>
      </div>
    </div>
    <div id="escribirPost">
      <textarea id="textToPost" placeholder="¿Qué quieres compartir?"></textarea>
      <div>
        <img id="btnFile" src="img/agregar-img.png" alt="Botón para cargar imagen">
        <input id="subirFile" type="file" accept="image/jpeg" style="display:none">
        <button type= "submit" id="shareButton" >Compartir</button>
      </div>
    </div>
    <div id="sectionPosts">
      <table id="tablaPosts">
        <tbody>
          <tr>
            <th>
              <div id="userPost">
                <img class="userPhotoPost" src="img/foto-ejemplo.jpg" alt="Foto del usuario">
                <p>Publicado por Mariana López</p>
              </div> 
              <div id="icon">
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
            <td id="userImage" style="display: none;"></td>
          </tr>
          <tr>
            <td>
              <img id="logoLike" src="img/megusta.png" alt="Botón me gusta">
              <img id="logoComent" src="img/comentario.png" alt="Botón comentar">
            </td>
          </tr>
        </tbody>
      </table>
    </div>`;

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
        } else {
          console.log('Ese dato no existe en este documento');
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
          // Obtener los datos de la colección
          const tabla = divElement.querySelector('#tablaPosts');
          // firebase.firestore().collection('posts').get(docRef.id)
          onSnapshotPosts().doc(docRef.id)
          /* firebase.firestore().collection('postss').doc(docRef.id)
          .orderBy('publicationDate', 'desc') */
            .onSnapshot((doc) => {
              console.log('Current data: ', doc.data().id);
              if (doc.id === `${docRef.id}`) {
                tabla.innerHTML += `
                  <tbody>
                    <tr>
                      <th>
                        <div id="userPost">
                          <img class="userPhotoPost" src="${doc.data().userPhotoPost}" alt="Foto del usuario">
                          <p>${doc.data().userWhoPublishes}</p>
                        </div> 
                      <div>  
                        <img id="iconoEdit" class="icono-conf" src="img/btn-edit.png" alt="icono de editar">
                        <img id="#iconoDelete" class="icono-conf iconoDelete" src="img/btn-delete.png" alt="icono delete">
                      </div>
                      </th>
                    </tr>
                    <tr>
                      <td id="textPost" class="textPost">
                        <pre class="datePost">${doc.data().publicationDate}</pre>
                        ${doc.data().publishedText}
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
                `;
              } else {
                console.log('No existe referencia al documento');
              }
            });
          // Borrar posts
          const btnDelete = divElement.querySelectorAll('.iconoDelete');
          btnDelete.forEach((boton) => {
            boton.addEventListener('click', (e) => {
              console.log(e.target.dataset.post);
              deletePosts(e.target.dataset.post)
                .then(() => {
                  console.log('Document successfully deleted!');
                })
                .catch((error) => {
                  console.error('Error removing document: ', error);
                });
            });
          });
        });
    }
  });

  // Mostrar todos los posts de la colección
  const tabla = divElement.querySelector('#tablaPosts');
  onSnapshotPosts().orderBy('publicationDate', 'desc')
  // firebase.firestore().collection('postss').orderBy('publicationDate', 'desc')
    .onSnapshot((querySnapshot) => {
      tabla.innerHTML = '';
      querySnapshot.forEach((doc) => {
        tabla.innerHTML += `
          <tbody>
            <tr>
              <th>
                <div id="userPost">
                  <img class="userPhotoPost" src="${doc.data().userPhotoPost}" alt="Foto del usuario">
                  <p>${doc.data().userWhoPublishes}</p>
                </div>
                <div>
                  <img id="iconoEdit" class="icono-conf" src="img/btn-edit.png" alt="icono de editar">
                  <img id="#iconoDelete" data-post="${doc.id}" class="icono-conf iconoDelete" src="img/btn-delete.png" alt="icono delete">
                </div>
              </th>
            </tr>
            <tr>
              <td id="textPost" class="textPost">
                <pre class="datePost">${doc.data().publicationDate}</pre>
                ${doc.data().publishedText}
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
        `;
      });
      // Funcionalidad para eliminar
      const btnDelete = divElement.querySelectorAll('.iconoDelete');
      btnDelete.forEach((boton) => {
        boton.addEventListener('click', (e) => {
          console.log(e.target.dataset.post);
          deletePosts(e.target.dataset.post)
            .then(() => {
              console.log('Document successfully deleted!');
            })
            .catch((error) => {
              console.error('Error removing document: ', error);
            });
        });
      });
    });

  // Funcion para cerar sesión
  const btnSalir = divElement.querySelector('#btnSalir');
  btnSalir.addEventListener('click', () => {
    firebase.auth().signOut()
      .then(() => {
        // Sign-out successful.
        const confirmar = window.confirm('¿Estás seguro de que deseas salir?');
        if (confirmar) {
          window.location.hash = '#/';
          console.log('Se ha cerrado sesión');
        } else {
          window.location.hash = '#/inicio';
        }
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });
  return divElement;
};
