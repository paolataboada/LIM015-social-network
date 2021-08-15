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
        <h4 id="userName">A</h4>
        <p id="userDescription">Cooker keto</p>
      </div>
    </div>
    <div id="escribirPost">
      <textarea id="postTxt" placeholder="¿Qué quieres compartir?"></textarea>
      <div>
        <img id="btnFile" src="img/agregar-img.png" alt="Botón para cargar imagen">
        <input id="subirFile" type="file" accept="image/jpeg" style="display:none">
        <button type="submit" id="shareButton">Compartir</button>
      </div>
    </div>
    <div id="sectionPosts">
      <table>
        <tr>
          <th>Publicado por Mariana López</th>
        </tr>
        <tr>
          <td id="userPost">The user-select property specifies whether the text of an element can be selected.
              In web browsers, if you double-click on some text it will be selected/highlighted. 
              This property can be used to prevent this
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
      </table>
    </div>`;

  // Obtener el perfil de un usuario
  const user = firebase.auth().currentUser;
  const userPhoto = divElement.querySelector('#userPhoto');
  const userName = divElement.querySelector('#userName');
  const userDescription = divElement.querySelector('#userDescription');
  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    // const emailVerified = user.emailVerified;
    // const uid = user.uid;
    // console.log(displayName, email, photoURL, emailVerified, uid);
    userPhoto.src = `${photoURL}`;
    userName.textContent = `${displayName}`;
    userDescription.textContent = `${email}`;
  }

  // Abre input file al seleccionar el botón Subir Imagen
  const btnUploadImage = divElement.querySelector('#btnFile');
  const btnInputFile = divElement.querySelector('#subirFile');
  btnUploadImage.addEventListener('click', () => {
    btnInputFile.click();
    btnInputFile.addEventListener('change', (e) => {
      const imgFile = e.target.files[0];
      console.log(imgFile);
      // Create a storage reference from our storage service
      const storageRef = firebase.storage().ref(`post_image/${imgFile.name}`);
      storageRef.put(imgFile)
        .then((snapshot) => {
          console.log('Uploaded a blob or file!', snapshot);
        });
    });
  });

  // Función para publicar post
  const shareButton = divElement.querySelector('#shareButton');
  shareButton.addEventListener('click', () => {
    const postTxt = divElement.querySelector('#postTxt').value;
    const postImg = divElement.querySelector('#subirFile').value;
    const userPost = divElement.querySelector('#userPost');
    const userImage = divElement.querySelector('#userImage');
    firebase.firestore().collection('posts').add({
      publishedText: postTxt,
      publishedImage: postImg,
    })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    // Obtener los datos de la colección
    firebase.firestore().collection('users').get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} => ${doc.data()}`);
          // console.log(`${doc.data()} =>`, doc.data().country, doc.data().name);
          userPost.textContent = doc.data().publishedText;
          userImage.textContent = doc.data();
        });
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
