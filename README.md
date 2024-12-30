# coally-challenge-backend

Este repositorio contiene el backend del proyecto **Coally Challenge**, desarrollado con `TypeScript`, `Node.js` y `MongoDB`.

## Url del deploy
    https://coally-backend.onrender.com

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalados los siguientes requisitos:

- **Node.js v22.6.0** o superior
- **npm v10.8.3** o superior

## Instalación

1.  Clona el repositorio:

    ```bash
    git clone https://github.com/kevob1994/Coally-backend.git
    cd coally-challenge-backend
    ```

2.  Instala las dependencias:

    ```
    npm install
    ```

3.  Crea un archivo .env en el directorio raíz del proyecto con las siguientes variables de entorno:

    ```
    MONGO_URI=<URL_de_tu_base_de_datos_MongoDB>
    JWT_SECRET=<tu_secreto_para_tokens>
    PORT=3000
    ```

## Comandos

- Ejecuta el servidor en modo desarrollo con TypeScript
  `npm run dev `

- Genera los archivos transpilados en el directorio dist
  `npm run build`

- Ejecuta el servidor en producción
  `npm start`

- Verifica el código con ESLint
  `npm run lint`

- Realiza las correcciones de ESLint
  `npm run lint:fix`

- Aplica Prettier a todo el proyecto
  `npm run format`

- Comprueba si el código sigue las reglas de Prettier
  `npm run format:check`

### Herramientas y Librerías

#### Desarrollo
- TypeScript
- ESLint
- Prettier
- Nodemon
- Concurrently

#### Producción
- Express
- Mongoose
- Helmet
- Cors
- bcryptjs
- jsonwebtoken
- Swagger UI Express
- Express Validator

### Estructura Principal

1. **src/config**: Configuración del proyecto, como conexión a la base de datos y variables de entorno.
2. **src/controllers**: Controladores que manejan la lógica de negocio de las rutas.
3. **src/middlewares**: Middlewares personalizados para validaciones, autenticación, etc.
4. **src/models**: Modelos de datos de Mongoose para la base de datos MongoDB.
5. **src/routers**: Definición de rutas y endpoints de la API.
6. **src/utils**: Utilidades y funciones auxiliares.
7. **src/validations**: Validaciones para las rutas.
8. **src**: Entrada principal del proyecto (server.ts).

### Documentación de la API

La documentación de la API está disponible a través de Swagger en la ruta `/api-docs`. Para acceder, asegúrate de que el servidor está en ejecución.
