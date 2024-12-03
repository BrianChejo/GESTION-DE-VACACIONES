document.addEventListener('DOMContentLoaded', function () {
  // Cargar el contenido de nav.html
  fetch('/nav.html')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(data => {
      // Insertar el contenido de nav.html en el contenedor
      document.getElementById('nav-placeholder').innerHTML = data;

      // Obtener referencias a los elementos del menú
      const menuItems = document.getElementById('menu-items');
      const loginItem = document.getElementById('login-item');
      const registerItem = document.getElementById('register-item');
      const logoutItem = document.getElementById('logout-item');

      // Obtener el rol del usuario desde el almacenamiento local
      const rol = localStorage.getItem('rol');

      // Verificar el rol y mostrar las opciones correspondientes
      if (rol) {
        loginItem.style.display = 'none';
        registerItem.style.display = 'none';
        logoutItem.style.display = 'block';

        if (rol === 'empleado') {
          menuItems.innerHTML += `
            <li class="nav-item"><a class="nav-link" href="enviarSolicitud.html">Formulario Solicitud</a></li>
            <li class="nav-item"><a class="nav-link" href="misSolicitudes.html">Historial Solicitudes</a></li>

          `;
        } else if (rol === 'administrador') {
          menuItems.innerHTML += `
            <li class="nav-item"><a class="nav-link" href="usuarios.html">Usuarios</a></li>
            <li class="nav-item"><a class="nav-link" href="gestionSolicitud.html">Solicitudes</a></li>
            <li class="nav-item"><a class="nav-link" href="prueba.html">Prueba</a></li>


          `;
        }
      } else {
        loginItem.style.display = 'block';
        registerItem.style.display = 'block';
        logoutItem.style.display = 'none';
      }
    })
    .catch(error => console.error('Error al cargar el archivo de navegación:', error));
});

// Función de cierre de sesión
function logout() {
  localStorage.removeItem('rol'); // Eliminar rol del almacenamiento local
  window.location.href = 'login.html'; // Redirigir al login
}
