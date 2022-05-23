Es necesario crear las variables de entorno. Para esto puedes copiar las que se encuentran en el ejemplo:

```
cp .env.example .env
```

Para correr escribir en el terminal: 

```
npm install
```
```
npm start
```
Luego visita http://localhost:3000 y verás el mensaje "Hola Mundo!".

Requerimientos
Node.js

Para correr la aplicación dockerizada + postgres:

linux: 
```
  sudo docker-compose build
```
```
  sudo docker-compose up
```
  

macOS: 
```
    docker compose build
```
```
    docker compose up
```

Alternativamente, puedes correr con detach para ejecutar comandos subsecuentes en el mismo thread del terminal:

linux: 
```
    docker-compose build
```
```
    docker-comopose up -d
```

macOS: 
```
    docker comose build
```
```
    docker compose up -d
```

Luego visita http://localhost:3000 y verás el mensaje "Hola Mundo!".

#Requisitos: 

Instalar docker y docker-compose (Docker desktop es un buen complemento)
ref: https://phoenixnap.com/kb/install-docker-compose-on-ubuntu-20-04

Problemas con otras imágenes?:

linux: 
```
sudo docker system prune -a
```
mac:
```
docker system prune -a
```



#Se agregaron scripts para facilitar el uso de migraciones a ddbb. La herramienta necesaria para correrlos es dbmate:
https://github.com/amacneil/dbmate


Cómo se utiliza cada script? Primero descarga la herramienta mencionada y después ingresa a la carpeta script

Para aplicar todas las migraciones faltantes:
```
./apply-migration.sh
```

Para retroceder una migración:
```
./rollback-migration.sh
```

Para crear una nueva migración:
```
./create-migration.sh [nombre de migración]
```
