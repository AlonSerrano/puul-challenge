La API de Gestión de Tareas es un sistema diseñado para facilitar la creación, asignación, y seguimiento de tareas dentro de un equipo. Utiliza Node.js, NestJS, y PostgreSQL para manejar usuarios y tareas, incluyendo funcionalidades para filtrar, ordenar, y obtener analíticas relevantes.

## Configuración Inicial

Windows y Mac

Para Windows y Mac, Docker Desktop incluye Docker Compose, por lo que solo necesitas instalar Docker Desktop.

Descarga Docker Desktop desde Docker Hub.
Sigue las instrucciones de instalación proporcionadas en la página de descarga.

![image](https://github.com/AlonSerrano/puul-challenge/assets/10080082/a4c68010-b3d0-4b43-adde-46c8ff87aec2)


## Lanzar App

```
docker-compose up --build -d
```

Una vez en tu local solo necesitas apuntar los request a

```
http://localhost:3000
```

## Endpoints

### Usuarios

- **Crear Usuario**: `POST /users` - Crea un nuevo usuario.
- **Listar Usuarios**: `GET /users` - Lista todos los usuarios con la opción de filtrar por nombre, correo, y rol.

### Tareas

- **Crear Tarea**: `POST /tasks` - Crea una nueva tarea, asignándola a uno o más usuarios.
- **Listar Tareas**: `GET /tasks` - Lista todas las tareas con opciones de filtrado y ordenamiento.
- **Actualizar Tarea**: `PATCH /tasks/:id` - Actualiza los detalles de una tarea, incluyendo la reasignación de usuarios.
- **Eliminar Tarea**: `DELETE /tasks/:id` - Elimina una tarea específica.

### Analíticas

- **Estadísticas de Tareas**: `GET /tasks/analytics` - Provee estadísticas sobre las tareas, como la cantidad por estado y  lista el top 5 de tareas con mayor estimación de horas, interpretadas como las más complicadas.


