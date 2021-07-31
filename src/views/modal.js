export default () => {
  const modal = `
    <section id="fondoModal">
        <section id="modal">
        <h2>Registro de Usuario </h2>
        <form id="container-modal">
            <input type="text" id="nombre" placeholder="Nombre">
            <input type="text" id="usuario" placeholder="Nombre de usuario">
            <input type="email" id="e-mail" placeholder="Email">
            <input type="password" id="contraseña" placeholder="Contraseña">
            <input type="password" id="confirmarContraseña" placeholder="Confirmar contraseña">
            <button type="submit">Enviar</button>
        </form>
        </section>
    </section>`;

    const divElement = document.createElement('div');
//   divElement.setAttribute('id', 'fondoModal');
  divElement.innerHTML = modal;
  return divElement;
}