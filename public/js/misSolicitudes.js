// prueba.js
async function cargarSolicitudes() {
    try {
        // Realizar la solicitud para obtener las solicitudes del usuario autenticado
        const response = await fetch('http://localhost:3001/solicitud/solicitudesUsuario', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Esto asegura que se envíen las cookies con la solicitud
        });

        const data = await response.json();

        if (data.success) {
            const tabla = document.getElementById('tablaSolicitudes').getElementsByTagName('tbody')[0];
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevas filas

            // Verificar si hay solicitudes
            if (data.solicitudes.length === 0) {
                document.getElementById('mensaje').textContent = 'No tienes solicitudes registradas.';
            } else {
                // Agregar las filas de las solicitudes a la tabla
                data.solicitudes.forEach(solicitud => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${solicitud.id}</td>
                        <td>${solicitud.fecha_inicio}</td>
                        <td>${solicitud.fecha_fin}</td>
                        <td>${solicitud.motivo}</td>
                        <td>${solicitud.estado}</td>
                    `;
                    tabla.appendChild(fila);
                });
            }
        } else {
            document.getElementById('mensaje').textContent = data.message || 'Error al cargar las solicitudes. Por favor intente de nuevo.';
        }
    } catch (error) {
        document.getElementById('mensaje').textContent = 'Error al cargar las solicitudes. Por favor intente de nuevo.';
    }
}


// Cargar las solicitudes al inicio cuando la página se carga
document.addEventListener('DOMContentLoaded', cargarSolicitudes);
