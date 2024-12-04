const apiBaseUrl = 'http://localhost:3001/solicitud'; // URL base del backend

function obtenerHistorialSolicitudes() {
    $.get(`${apiBaseUrl}/historial2`, function(data) {
        const tableBody = $('#solicitudesHistorialTable tbody');
        tableBody.empty(); // Limpiar la tabla

        if (data.success) {
            // Guardar las solicitudes en una variable global para el filtrado
            window.solicitudes = data.solicitudes;
            // Inicialmente, mostrar todas las solicitudes
            filtrarSolicitudes('');
        } else {
            alert('No se pudieron obtener el historial de solicitudes');
        }
    }).fail(function() {
        alert('Error al obtener el historial de solicitudes');
    });
}


function filtrarSolicitudes() {
    const estado = $('#filtroEstado').val(); // Obtener el valor del filtro por estado
    const usuario = $('#filtroUsuario').val().toLowerCase(); // Obtener el valor del filtro por nombre de usuario

    const tableBody = $('#solicitudesHistorialTable tbody');
    tableBody.empty(); // Limpiar la tabla

    // Filtrar las solicitudes según el estado y el nombre de usuario
    const solicitudesFiltradas = window.solicitudes.filter(solicitud => {
        const coincideEstado = estado === '' || solicitud.estado.toLowerCase() === estado.toLowerCase();
        const coincideUsuario = usuario === '' || solicitud.usuario.toLowerCase().includes(usuario);
        return coincideEstado && coincideUsuario;
    });

    // Agregar las solicitudes filtradas a la tabla
    solicitudesFiltradas.forEach(solicitud => {
        const row = `
            <tr>
                <td>${solicitud.id}</td>
                <td>${solicitud.usuario}</td> <!-- Aquí mostramos el nombre del usuario -->
                <td>${solicitud.fecha_inicio}</td>
                <td>${solicitud.fecha_fin}</td>
                <td>${solicitud.estado}</td>
                <td>
                    <button class="btn btn-warning" onclick="abrirModalEditar(${solicitud.id}, '${solicitud.motivo}', '${solicitud.fecha_inicio}', '${solicitud.fecha_fin}', '${solicitud.estado}')">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarSolicitud(${solicitud.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}

// Función para abrir el modal de edición y cargar los valores de la solicitud
function abrirModalEditar(id, motivo, fechaInicio, fechaFin, estado, userId) {
    document.getElementById('editarId').value = id;
    document.getElementById('editarMotivo').value = motivo;
    document.getElementById('editarFechaInicio').value = fechaInicio;
    document.getElementById('editarFechaFin').value = fechaFin;
    document.getElementById('editarEstado').value = estado;
    document.getElementById('editarUser_Id').value = userId;

    const modal = new bootstrap.Modal(document.getElementById('modalEditarSolicitud'));
    modal.show();
}

// Guardar cambios al editar solicitud
document.getElementById('guardarEdicion').addEventListener('click', async () => {
    const id = document.getElementById('editarId').value;
    const motivo = document.getElementById('editarMotivo').value.trim();
    const fechaInicio = document.getElementById('editarFechaInicio').value;
    const fechaFin = document.getElementById('editarFechaFin').value;
    const estado = document.getElementById('editarEstado').value.trim();
    const userId = document.getElementById('editarUser_Id').value;

    if (!motivo || !fechaInicio || !fechaFin || !estado) {
        alert('Todos los campos son obligatorios.');
        return;
    }

    try {
        const response = await fetch(`${apiBaseUrl}/modificar1/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ motivo, fecha_inicio: fechaInicio, fecha_fin: fechaFin, estado, user_id: userId })
        });

        const data = await response.json();
        if (data.success) {
            alert('Solicitud modificada correctamente.');
            obtenerSolicitudesPendientes();  // Recargar las solicitudes
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditarSolicitud'));
            modal.hide(); // Cerrar el modal
        } else {
            alert(data.message || 'Error al modificar la solicitud.');
        }
    } catch (error) {
        alert('Error al modificar la solicitud. Intente nuevamente.');
        console.error(error);  // Mostrar error en la consola
    }
});

// Función para eliminar solicitud
function eliminarSolicitud(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta solicitud?')) {
        $.ajax({
            url: `${apiBaseUrl}/eliminar/${id}`,  // Aquí estás pasando el id de la solicitud a eliminar
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

$(document).ready(function() {
    obtenerHistorialSolicitudes();

    // Agregar los eventos para filtrar por estado y usuario
    $('#filtroEstado').on('change', function() {
        filtrarSolicitudes(); // Filtrar por estado y usuario
    });

    $('#filtroUsuario').on('input', function() {
        filtrarSolicitudes(); // Filtrar por usuario y estado
    });
});