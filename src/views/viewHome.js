import { getDataUser, addPosts, getPosts } from './firebaseFunctions.js';

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
            <th id="userPost">Publicado por Mariana López</th>
          </tr>
          <tr>
            <td id="textPost" class="textPost">
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
  // divElement.querySelector('#btnCompartir').addEventListener('click', () => {
  //   const postTxt = divElement.querySelector('#post').value;
  //   const postImg = divElement.querySelector('#subirFile').value;
  //   const userPost = divElement.querySelector('#userPost');
  //   const userImage = divElement.querySelector('#userImage');
  //   firebase.firestore().collection('users').add({
  //     publicacion: postTxt,
  //     imagen: postImg,
  //   })
  //     .then((docRef) => {
  //       console.log('Document written with ID: ', docRef.id);
  //       userPost.textContent = postTxt;
  //       userImage.textContent = postImg;
  //       console.log(postTxt);
  //     })
  //     .catch((error) => {
  //       console.error('Error adding document: ', error);
  //     });
  // });

  // Función para publicar post
  const shareButton = divElement.querySelector('#shareButton');
  shareButton.addEventListener('click', () => {
    const textToPost = divElement.querySelector('#textToPost');
    // const userPost = divElement.querySelector('#userPost');
    // const textPost = divElement.querySelector('#textPost');
    /* const callingNameUser = getDataUser()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => { console.log(doc.data().NameRegister); });
      }); */
    if (textToPost.value !== '') {
      // addPosts(name, postText);
      addPosts(user.displayName ? user.displayName : userName.textContent, textToPost)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          // Obtener los datos de la colección
          const tabla = divElement.querySelector('#tablaPosts');
          // firebase.firestore().collection('posts').get(docRef.id)
          getPosts(docRef.id)
            .then((querySnapshot) => { // TODO: Mostrar 'User' en ingreso con correo al publicar
              // tabla.innerHTML = '';
              querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().userWhoPublishes}`);
                if (doc.id === `${docRef.id}`) {
                  tabla.innerHTML += `
                  <tbody>
                    <tr>
                      <th id="userPost">Publicado por ${doc.data().userWhoPublishes}</th>
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
            });
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
    textToPost.value = '';
  });

  // Mostrar todos los posts de la colección
  getPosts()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const tabla = divElement.querySelector('#tablaPosts');
        tabla.innerHTML += `
          <tbody>
            <tr>
              <th id="userPost">Publicado por ${doc.data().userWhoPublishes}</th>
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
