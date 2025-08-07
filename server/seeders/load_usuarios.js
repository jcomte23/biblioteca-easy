/*se encarga de cargar los usuarios a la base de datos*/
import fs from 'fs'; // es la que me permite leer archivos
import path from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../conexion_db.js"


export async function cargarUsuariosAlaBaseDeDatos() {

    const rutaArchivo = path.resolve('server/data/01_usuarios.csv');
    const usuarios = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on("data", (fila) => {
                usuarios.push([
                    fila.id_usuario,
                    fila.nombre_completo.trim(),
                    fila.identificacion,
                    fila.correo,
                    fila.telefono
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO usuarios (id_usuario,nombre_completo,identificacion,correo,telefono) VALUES ?';
                    const [result] = await pool.query(sql, [usuarios]);

                    console.log(`✅ Se insertaron ${result.affectedRows} autores.`);
                    resolve(); // Termina exitosamente
                } catch (error) {
                    console.error('❌ Error al insertar usuarios:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de usuarios:', err.message);
                reject(err);
            });
    });
}