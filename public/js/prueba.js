const apiBaseUrl = 'http://localhost:3001/solicitud'; // URL base del backend

// Función para obtener el historial de solicitudes (aprobadas/rechazadas)
function obtenerHistorialSolicitudes() {
    $.get(`${apiBaseUrl}/historial2`, function(data) {
        console.log(data); // Añadido para depuración
        const tableBody = $('#historialTableBody');
        tableBody.empty(); // Limpiar la tabla
    
        if (data.success) {
            window.solicitudes = data.solicitudes;
            filtrarSolicitudesPorEstado('');
        } else {
            alert('No se pudieron obtener el historial de solicitudes');
        }
    }).fail(function() {
        alert('Error al obtener el historial de solicitudes');
    });
    
}

// Función para filtrar las solicitudes por estado
function filtrarSolicitudesPorEstado(estado) {
    const tableBody = $('#historialTableBody');  // Asegurándonos que usamos el id correcto
    tableBody.empty(); // Limpiar la tabla

    // Filtrar las solicitudes si hay un estado seleccionado
    const solicitudesFiltradas = window.solicitudes.filter(solicitud => {
        if (estado === '') return true; // Si no hay filtro, mostrar todas las solicitudes
        return solicitud.estado.toLowerCase() === estado.toLowerCase();
    });

    // Agregar las solicitudes filtradas a la tabla
    solicitudesFiltradas.forEach(solicitud => {
        const row = `
            <tr>
                <td>${solicitud.id}</td>
                <td>${solicitud.usuario}</td> <!-- Cambio de "user_id" a "usuario" -->
                <td>${solicitud.fecha_inicio}</td>
                <td>${solicitud.fecha_fin}</td>
                <td>${solicitud.estado}</td>
                <td>
                    <button class="btn btn-warning" onclick="abrirModalEditar(${solicitud.id}, '${solicitud.motivo}', '${solicitud.fecha_inicio}', '${solicitud.fecha_fin}', '${solicitud.estado}', '${solicitud.user_id}')">Editar</button>
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
            obtenerHistorialSolicitudes();  // Recargar las solicitudes
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

    // Agregar el evento para filtrar por estado
    $('#filtroEstado').on('change', function() {
        const estadoSeleccionado = $(this).val();
        filtrarSolicitudesPorEstado(estadoSeleccionado);
    });

    // Agregar el evento para filtrar por nombre
    $('#filtroNombre').on('input', function() {
        const nombreSeleccionado = $(this).val().toLowerCase();
        filtrarSolicitudesPorNombre(nombreSeleccionado);
    });
});

// Función para filtrar solicitudes por nombre
function filtrarSolicitudesPorNombre(nombre) {
    const tableBody = $('#historialTableBody');
    tableBody.empty(); // Limpiar la tabla

    // Filtrar las solicitudes por nombre
    const solicitudesFiltradas = window.solicitudes.filter(solicitud => {
        return solicitud.usuario.toLowerCase().includes(nombre);
    });

    // Agregar las solicitudes filtradas a la tabla
    solicitudesFiltradas.forEach(solicitud => {
        const row = `
            <tr>
                <td>${solicitud.id}</td>
                <td>${solicitud.usuario}</td>
                <td>${solicitud.fecha_inicio}</td>
                <td>${solicitud.fecha_fin}</td>
                <td>${solicitud.estado}</td>
                <td>
                    <button class="btn btn-warning" onclick="abrirModalEditar(${solicitud.id}, '${solicitud.motivo}', '${solicitud.fecha_inicio}', '${solicitud.fecha_fin}', '${solicitud.estado}', '${solicitud.user_id}')">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarSolicitud(${solicitud.id})">Eliminar</button>
                </td>
            </tr>
        `;
        tableBody.append(row);
    });
}
$(document).ready(function() {
    obtenerHistorialSolicitudes();
});