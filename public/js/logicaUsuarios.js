// frontend/js/logicaUsuarios.js
const apiUrl = '/usuarios'; // Asegúrate de que esta URL sea correcta
const userTableBody = document.getElementById('userTableBody');

let userToDelete = null; // Guardamos el usuario a eliminar

// Función para cargar los usuarios y mostrarlos en una tabla
async function fetchUsers() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Error al obtener los usuarios: ' + response.statusText);
    }

    const users = await response.json();
    userTableBody.innerHTML = ''; // Limpiar la tabla antes de agregar los usuarios

    users.forEach(user => {
      // Crear una fila para cada usuario
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.nombre}</td>
        <td>${user.email}</td>
        <td>${user.rol}</td>
        <td>${user.descripcion || 'No disponible'}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">Editar</button>
          <button class="btn btn-danger btn-sm" onclick="openDeleteModal(${user.id})">Eliminar</button>
          <button class="btn btn-info btn-sm" onclick="showUserRequests(${user.id})">ver solicitudes</button>
        </td>
      `;
      userTableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error al cargar los usuarios:', error);
    alert('No se pudieron cargar los usuarios. Verifica la conexión con el servidor.');
  }
}

// Función para obtener datos de un usuario y llenar el formulario para editarlo
async function editUser(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);

    if (!response.ok) {
      throw new Error('Error al obtener el usuario: ' + response.statusText);
    }

    const user = await response.json();
    document.getElementById('userId').value = user.id;
    document.getElementById('nombre').value = user.nombre;
    document.getElementById('email').value = user.email;
    document.getElementById('descripcion').value = user.descripcion || '';
    document.getElementById('rol').value = user.rol;
    document.getElementById('password').value = ''; // Contraseña no se muestra por seguridad

    // Mostrar el modal
    const myModal = new bootstrap.Modal(document.getElementById('editUserModal'));
    myModal.show();
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    alert('No se pudo cargar el usuario para editar.');
  }
}

// Función para guardar los cambios de usuario
async function saveUserChanges() {
  const id = document.getElementById('userId').value;
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const descripcion = document.getElementById('descripcion').value;
  const rol = document.getElementById('rol').value;

  const userData = { nombre, email, descripcion, rol };

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el usuario: ' + response.statusText);
    }

    alert('Usuario actualizado correctamente');
    fetchUsers(); // Recargar la lista de usuarios
    const myModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
    myModal.hide(); // Ocultar el modal
    document.getElementById('editUserForm').reset(); // Limpiar el formulario
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    alert('No se pudo actualizar el usuario.');
  }
}

// Función para abrir el modal de eliminación
function openDeleteModal(id) {
  userToDelete = id; // Guardamos el ID del usuario que queremos eliminar
  const myModal = new bootstrap.Modal(document.getElementById('deleteUserModal'));
  myModal.show(); // Mostrar el modal de confirmación
}

// Función para confirmar la eliminación del usuario
async function confirmDeleteUser() {
  try {
    // Realizar la solicitud de eliminación al servidor
    const response = await fetch(`${apiUrl}/${userToDelete}`, { method: 'DELETE' });

    if (!response.ok) {
      throw new Error('Error al eliminar el usuario: ' + response.statusText);
    }

    alert('Usuario eliminado correctamente');
    fetchUsers(); // Recargar la lista de usuarios después de la eliminación
    const myModal = bootstrap.Modal.getInstance(document.getElementById('deleteUserModal'));
    myModal.hide(); // Cerrar el modal de eliminación
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    alert('No se pudo eliminar el usuario.');
  }
}

// Función para mostrar las solicitudes de un usuario
async function showUserRequests(userId) {
  const modal = new bootstrap.Modal(document.getElementById('userRequestsModal'));
  const tableBody = document.getElementById('requestsTableBody');
  const mensaje = document.getElementById('mensajeSolicitudes');

  tableBody.innerHTML = ''; // Limpiar tabla
  mensaje.textContent = ''; // Limpiar mensaje

  try {
    const response = await fetch(`http://localhost:3001/solicitud/solicitudesUsuario/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Asegura que se envíen cookies
    });

    const data = await response.json();

    if (data.success) {
      if (data.solicitudes.length === 0) {
        mensaje.textContent = 'No se encontraron solicitudes para este usuario.';
      } else {
        data.solicitudes.forEach(solicitud => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${solicitud.id}</td>
            <td>${solicitud.fecha_inicio}</td>
            <td>${solicitud.fecha_fin}</td>
            <td>${solicitud.motivo}</td>
            <td>${solicitud.estado}</td>
          `;
          tableBody.appendChild(row);
        });
      }
    } else {
      mensaje.textContent = data.message || 'Error al cargar las solicitudes.';
    }
  } catch (error) {
    mensaje.textContent = 'Error al cargar las solicitudes.';
    console.error('Error:', error);
  }

  modal.show();
}

// Cargar usuarios al inicio
fetchUsers();

document.getElementById('registroForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const usuarioTipo = document.getElementById('usuarioTipo').value;

  const usuario = { nombre, email, password, rol: usuarioTipo };

  try {
    const response = await fetch('/usuarios/registro2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(usuario)
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message); // "Registro exitoso"
      window.location.href = '/usuarios.html'; // Redirige a la página de login
    } else {
      alert('Error en el registro: ' + result.error);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión con el servidor');
  }
});