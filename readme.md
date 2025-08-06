# 📚 Sistema de Gestión de Biblioteca

Este es un sistema monolítico para la gestión de una biblioteca, que permite administrar usuarios, libros y préstamos. El backend está construido con **Node.js** y **Express**, la base de datos se gestiona con **MySQL**, y el frontend se encuentra dentro de la carpeta `app`.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript (Frontend)
- csv-parser (para cargar datos desde archivos CSV)
- vite

---

## 📁 Estructura del proyecto
```bash
biblioteca/
│
├── docs/ # Documentation
│       ...
├── app/ # Frontend (HTML, CSS, JS)
│       ...
├── server/ # Backend
│       ...
├── index.html 
├── .env # Variables de entorno
├── .gitignore
└── README.md
```

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/jcomte23/biblioteca-easy.git
cd biblioteca
```
2. Instala dependencias:

```bash
npm install
```

3. Crea y configura el archivo .env:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=db_name
DB_PORT=3306
```

4. Inicializa el backend:
```bash
node server/index.js
```

5. Inicializa el frontend:
```bash
npm run dev
```

# 📬 Licencia
Este proyecto está bajo licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.