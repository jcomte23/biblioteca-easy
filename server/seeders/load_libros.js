/*se encarga de cargar los libros a la base de datos*/
import fs from 'fs'; // es la que me permite leer archivos
import path from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../conexion_db.js"


export async function cargarLibrosAlaBaseDeDatos() {

    const rutaArchivo = path.resolve('server/data/02_libros.csv');
    const libros = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(rutaArchivo)
            .pipe(csv())
            .on("data", (fila) => {
                libros.push([
                    fila.isbn,
                    fila.titulo.trim(),
                    fila.anio_de_publicacion,
                    fila.autor
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO libros (isbn,titulo,anio_de_publicacion,autor) VALUES ?';
                    const [result] = await pool.query(sql, [libros]);

                    console.log(`✅ Se insertaron ${result.affectedRows} libros.`);
                    resolve(); // Termina exitosamente
                } catch (error) {
                    console.error('❌ Error al insertar libros:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de libros:', err.message);
                reject(err);
            });
    });
}