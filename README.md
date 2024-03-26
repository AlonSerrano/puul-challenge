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
```
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Luis Serrano",
    "email": "example@example.com",
    "role": "member"
}'
```
- **Listar Usuarios**: `GET /users` - Lista todos los usuarios con la opción de filtrar por nombre, correo, y rol.
```
curl --location 'http://localhost:3000/users'
```
### Tareas

- **Crear Tarea**: `POST /tasks` - Crea una nueva tarea, asignándola a uno o más usuarios.
```
curl --location 'http://localhost:3000/task' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Roles",
    "description": "Se debe crear un CRUD de Roles",
    "status": "finished",
    "cost": 5,
    "estimatedHours": 8,
    "dueDate": "2024-03-26",
    "assignedUsers": [
        {
            "id": 4,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "member"
        }
    ]
}'
``` 
- **Listar Tareas**: `GET /tasks` - Lista todas las tareas con opciones de filtrado y ordenamiento.
```
curl --location 'http://localhost:3000/task?title=roles'
```
- **Actualizar Tarea**: `PATCH /tasks/:id` - Actualiza los detalles de una tarea, incluyendo la reasignación de usuarios.
```
curl --location --request PATCH 'http://localhost:3000/task/3' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Roles",
    "description": "Se debe crear un CRUD de Roles",
    "status": "finished",
    "cost": "5.00",
    "estimatedHours": 8,
    "dueDate": "2024-03-27T06:00:00.000Z",
    "assignedUsers": [
        {
            "id": 1,
            "name": "Luis Serrano",
            "email": "luis_alonso@outlook.com",
            "role": "member"
        },
        {
            "id": 4,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "role": "member"
        }
    ]
}'
```
- **Eliminar Tarea**: `DELETE /tasks/:id` - Elimina una tarea específica.

### Analíticas

- **Estadísticas de Tareas**: `GET /tasks/analytics` - Provee estadísticas sobre las tareas, como la cantidad por estado y  lista el top 5 de tareas con mayor estimación de horas, interpretadas como las más complicadas.
```
curl --location 'http://localhost:3000/task/analytics'
```
