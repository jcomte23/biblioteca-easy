/*se encarga de cargar los prestamos a la base de datos*/
import fs from 'fs'; // es la que me permite leer archivos
import path from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../conexion_db.js"


export async function cargarPrestamosAlaBaseDeDatos() {

    const rutaArchivo = path.resolve('server/data/03_prestamos.csv');
    const prestamos = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on("data", (fila) => {
                prestamos.push([
                    fila.id_prestamo,
                    fila.id_usuario,
                    fila.isbn,
                    fila.fecha_prestamo,
                    fila.fecha_devolucion,
                    fila.estado
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO prestamos (id_prestamo,id_usuario,isbn,fecha_prestamo,fecha_devolucion,estado) VALUES ?';
                    const [result] = await pool.query(sql, [prestamos]);

                    console.log(`✅ Se insertaron ${result.affectedRows} prestamos.`);
                    resolve(); // Termina exitosamente
                } catch (error) {
                    console.error('❌ Error al insertar prestamos:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de prestamos:', err.message);
                reject(err);
            });
    });
}