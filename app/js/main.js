const API_URL = "http://localhost:3000/prestamos";
const tablaPrestamos = document.getElementById("tablaPrestamos");
const prestamoForm = document.getElementById("prestamoForm");

// Cargar lista
async function cargarPrestamos() {
    const res = await fetch(API_URL);
    const data = await res.json();

    tablaPrestamos.innerHTML = "";
    data.forEach(p => {
        tablaPrestamos.innerHTML += `
            <tr>
                <td>${p.id_prestamo}</td>
                <td>${p.usuario}</td>
                <td>${p.libro}</td>
                <td>${p.fecha_prestamo}</td>
                <td>${p.fecha_devolucion}</td>
                <td>${p.estado}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarPrestamo(${p.id_prestamo})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarPrestamo(${p.id_prestamo})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Guardar / Actualizar
prestamoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prestamo = {
        id_usuario: document.getElementById("id_usuario").value,
        isbn: document.getElementById("isbn").value,
        fecha_prestamo: document.getElementById("fecha_prestamo").value,
        fecha_devolucion: document.getElementById("fecha_devolucion").value,
        estado: document.getElementById("estado").value
    };

    const id_prestamo = document.getElementById("id_prestamo").value;

    if (id_prestamo) {
        // UPDATE
        await fetch(`${API_URL}/${id_prestamo}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prestamo)
        });
    } else {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prestamo)
        });
    }

    prestamoForm.reset();
    cargarPrestamos();
});

// Editar
window.editarPrestamo = async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    const p = await res.json();

    document.getElementById("id_prestamo").value = p.id_prestamo;
    document.getElementById("id_usuario").value = p.id_usuario;
    document.getElementById("isbn").value = p.isbn;
    document.getElementById("fecha_prestamo").value = p.fecha_prestamo.split("T")[0];
    document.getElementById("fecha_devolucion").value = p.fecha_devolucion.split("T")[0];
    document.getElementById("estado").value = p.estado;
};

// Eliminar
window.eliminarPrestamo = async (id) => {
    if (confirm("¿Seguro que quieres eliminar este préstamo?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarPrestamos();
    }
};

// Inicializar
cargarPrestamos();
