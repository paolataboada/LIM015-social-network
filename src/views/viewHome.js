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
        <img id="uploadImageButton" src="img/agregar-img.png" alt="Botón para cargar imagen">
        <input id="imageToPost" type="file" accept="image/jpeg" style="display:none">
        <button type="submit" id="shareButton">Compartir</button>
      </div>
    </div>
    <div id="sectionPosts">
      <table id="tablePost">
        <tbody>
          <tr>
            <th class="userPost">Publicado por Mariana López</th>
          </tr>
          <tr>
            <td class="textPost">The user-select property specifies whether the text of an element can be selected.
                In web browsers, if you double-click on some text it will be selected/highlighted. 
                This property can be used to prevent this
            </td>
          </tr>
          <tr>
            <td class="picturePost" style="display: none;"></td>
          </tr>
          <tr>
            <td>
              <img class="logoLike" src="img/megusta.png" alt="Botón me gusta">
              <img class="logoComent" src="img/comentario.png" alt="Botón comentar">
            </td>
          </tr>
        </tbody>
      </table>
    </div> `;

  // Obtener el perfil de un usuario
  const user = firebase.auth().currentUser;
  const userPhoto = divElement.querySelector('#userPhoto');
  const userName = divElement.querySelector('#userName');
  const userDescription = divElement.querySelector('#userDescription');
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const userId = user.uid;
    // console.log('Usuario en sesión: ', displayName, ', con ID: ', userId);
    userPhoto.src = `${photoURL}`;
    userName.textContent = `${displayName}`;
    userDescription.textContent = `${email}`;
    // Si no hay datos de usuario (Ingreso con correo)
    if (displayName === null) {
      // Obtener los datos de un usuario (CON DATOS DE REGISTRO FORM)
      firebase.firestore().collection('Registered_Users').get() // TODO: Cambiar por Consulta Directa
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // eslint-disable-next-line max-len
            // console.log(`${doc.id} => Nombre: ${doc.data().nameRegister}, Correo: ${doc.data().emailRegister}`);
            if (userId === `${doc.data().idUserRegister}`) {
              userPhoto.src = 'img/profile-default.png';
              userName.textContent = doc.data().nameRegister;
              userDescription.textContent = doc.data().emailRegister;
            } else {
              console.log('No existe el Doc');
            }
          });
        });
    }
  }

  // Abre input file al seleccionar el botón Subir Imagen
  const uploadImageButton = divElement.querySelector('#uploadImageButton');
  const imageToPost = divElement.querySelector('#imageToPost');
  const picturePost = divElement.querySelector('#picturePost');
  uploadImageButton.addEventListener('click', () => {
    imageToPost.click();
    imageToPost.addEventListener('change', (e) => {
      const targetFile = e.target.files[0];
      console.log(targetFile);
      // Create a storage reference from our storage service
      const storageRef = firebase.storage().ref(`post_image/${targetFile.name}`);
      storageRef.put(targetFile)
        .then((snapshot) => {
          console.log('Se subió un blob o un file!', snapshot);
          picturePost.textContent = `${targetFile.name}`;
          picturePost.style.display = 'block';
        });
    });
  });

  // Mostrar los datos de la colección "Post Guardados"
  firebase.firestore().collection('Saved_Posts').get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const tablePost = divElement.querySelector('#tablePost');
        // console.log(`${doc.id} => ${doc.data().userWhoPublishes}`);
        tablePost.innerHTML += `
          <tbody>
            <tr>
              <th class="userPost">Publicado por ${doc.data().userWhoPublishes}</th>
            </tr>
            <tr>
              <td class="textPost">${doc.data().publishedText}</td>
            </tr>
            <tr>
              <td>
                <img class="logoLike" src="img/megusta.png" alt="Botón me gusta">
                <img class="logoComent" src="img/comentario.png" alt="Botón comentar">
              </td>
            </tr>
          </tbody> `;
      });
    });

  // Función para publicar post
  const shareButton = divElement.querySelector('#shareButton');
  shareButton.addEventListener('click', () => {
    const textToPost = divElement.querySelector('#textToPost');
    if (textToPost.value !== '') {
      firebase.firestore().collection('Saved_Posts').add({
        userWhoPublishes: userName.textContent,
        publishedText: textToPost.value,
        publicationDate: new Date(),
      })
        .then((docRef) => {
          // console.log('ID del Doc SP: ', docRef.id);
          // Obtener los datos de la colección
          firebase.firestore().collection('Saved_Posts').get(docRef.id)
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                const tablePost = divElement.querySelector('#tablePost');
                // console.log(`${doc.id} => ${doc.data().userWhoPublishes}`);
                if (doc.id === `${docRef.id}`) {
                  textToPost.value = '';
                  tablePost.innerHTML += `
                    <tbody>
                      <tr>
                        <th class="userPost">Publicado por ${doc.data().userWhoPublishes}</th>
                      </tr>
                      <tr>
                        <td class="textPost">${doc.data().publishedText}</td>
                      </tr>
                      <tr>
                        <td>
                          <img class="logoLike" src="img/megusta.png" alt="Botón me gusta">
                          <img class="logoComent" src="img/comentario.png" alt="Botón comentar">
                        </td>
                      </tr>
                    </tbody> `;
                } else {
                  console.log('No existe Ref del Doc');
                }
              });
            });
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    }
  });

  // Funcion para cerrar sesión
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
