// Manejar el evento de envío del formulario
document.getElementById('solicitudForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre_empleado = document.getElementById('nombre_empleado').value.trim();
    const fecha_inicio = document.getElementById('fecha_inicio').value;
    const fecha_fin = document.getElementById('fecha_fin').value;
    const motivo = document.getElementById('motivo').value.trim();

    // Validación de campos
    if (!nombre_empleado || !fecha_inicio || !fecha_fin || !motivo) {
        document.getElementById('mensaje').textContent = 'Todos los campos son obligatorios.';
        return;
    }

    try {
        // Realizar la solicitud a la API
        const response = await fetch('http://localhost:3001/solicitud/solicitar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre_empleado, fecha_inicio, fecha_fin, motivo }),
            credentials: 'include' // Incluir las cookies (sesión)
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud. Código de estado: ' + response.status);
        }

        const data = await response.json();

        // Manejar la respuesta del servidor
        if (data.success) {
            document.getElementById('mensaje').textContent = 'Solicitud enviada correctamente. Estado: Pendiente.';
            document.getElementById('solicitudForm').reset(); // Limpiar el formulario después de enviar
            cargarSolicitudesPendientes();
        } else {
            document.getElementById('mensaje').textContent = 'Error al enviar la solicitud: ' + data.message;
        }
    } catch (error) {
        document.getElementById('mensaje').textContent = 'Error al enviar la solicitud. Por favor intente de nuevo.';
        console.error(error);  // Mostrar error en la consola para depuración
    }
});

// Función para cargar las solicitudes pendientes del usuario autenticado
async function cargarSolicitudesPendientes() {
    try {
        const response = await fetch('http://localhost:3001/solicitud/solicitudesPendientes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Incluir las cookies para la autenticación
        });

        if (!response.ok) {
            throw new Error('Error al cargar las solicitudes pendientes. Código de estado: ' + response.status);
        }

        const data = await response.json();

        if (data.success) {
            const tabla = document.getElementById('tablaSolicitudes').getElementsByTagName('tbody')[0];
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

            if (data.solicitudes.length === 0) {
                document.getElementById('mensajeSolicitudes').textContent = 'No tienes solicitudes pendientes.';
                return;
            }

            // Agregar las filas de las solicitudes pendientes a la tabla
            data.solicitudes.forEach(solicitud => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${solicitud.id}</td>
                    <td>${solicitud.fecha_inicio}</td>
                    <td>${solicitud.fecha_fin}</td>
                    <td>${solicitud.motivo}</td>
                    <td>${solicitud.estado}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="abrirModalEditar(${solicitud.id}, '${solicitud.motivo}', '${solicitud.fecha_inicio}', '${solicitud.fecha_fin}')">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="eliminarSolicitud(${solicitud.id})">Eliminar</button>
                    </td>
                `;
                tabla.appendChild(fila);
            });
        } else {
            document.getElementById('mensajeSolicitudes').textContent = data.message || 'Error al cargar las solicitudes pendientes.';
        }
    } catch (error) {
        document.getElementById('mensajeSolicitudes').textContent = 'Error al cargar las solicitudes pendientes. Por favor intente de nuevo.';
        console.error(error); // Mostrar error en la consola para depuración
    }
}

// Función para abrir el modal de edición y cargar los valores de la solicitud
function abrirModalEditar(id, motivo, fechaInicio, fechaFin) {
    // Rellenar los campos del modal con los datos actuales de la solicitud
    document.getElementById('editarId').value = id;
    document.getElementById('editarMotivo').value = motivo;
    document.getElementById('editarFechaInicio').value = fechaInicio;
    document.getElementById('editarFechaFin').value = fechaFin;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('modalEditarSolicitud'));
    modal.show();
}

// Función para guardar los cambios de la solicitud editada
document.getElementById('guardarEdicion').addEventListener('click', async () => {
    const id = document.getElementById('editarId').value;
    const motivo = document.getElementById('editarMotivo').value.trim();
    const fechaInicio = document.getElementById('editarFechaInicio').value;
    const fechaFin = document.getElementById('editarFechaFin').value;

    if (!motivo || !fechaInicio || !fechaFin) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/solicitud/modificar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ motivo, fecha_inicio: fechaInicio, fecha_fin: fechaFin })
        });

        const data = await response.json();
        if (data.success) {
            alert('Solicitud modificada correctamente.');
            cargarSolicitudesPendientes(); // Recargar las solicitudes
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarSolicitud'));
            modal.hide(); // Cerrar el modal
        } else {
            alert(data.message || 'Error al modificar la solicitud.');
        }
    } catch (error) {
        alert('Error al modificar la solicitud. Intente nuevamente.');
        console.error(error); // Mostrar error en la consola para depuración
    }
});

// Función para eliminar una solicitud
// Función para eliminar solicitud
function eliminarSolicitud(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
        $.ajax({
            url: `/solicitud/eliminar/${id}`,  // Aquí estás pasando el id de la solicitud a eliminar
            type: 'DELETE',
            success: function(data) {
                if (data.success) {
                    alert('Solicitud eliminada');
                    obtenerHistorialSolicitudes(); // Actualizar lista
                } else {
                    alert('Error al eliminar la solicitud');
                }
            },
            error: function() {
                alert('Error al eliminar la solicitud');
            }
        });
    }
}

// Cargar las solicitudes pendientes al cargar la página
document.addEventListener('DOMContentLoaded', cargarSolicitudesPendientes);
