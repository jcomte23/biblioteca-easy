import mysql from "mysql2/promise"

export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Combita1234+',
  database: 'biblioteca_easy',
  connectionLimit: 10,        // Máximo número de conexiones activas al mismo tiempo
  waitForConnections: true,   // Si se alcanza el límite, las nuevas peticiones esperan su turno
  queueLimit: 0               // Número máximo de peticiones en espera (0 = sin límite)
});


async function probarConexion() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a la base de datos exitosa');
    connection.release();
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message);
  }
}
