# Programmeerimine II 2021 kevad - Vabanduste API

## Endpoindid
### Ruumid:
* GET /rooms
  * Tagastab ruumide nimekirja
* GET /rooms/:id
  * Tagastab ruumi määratud id-ga
* POST /rooms
  * Loob uue ruumi
  * Nõutud nameofcourse, dayId, roomId 
  * Nõutud courseId, createdById ja classroom request body-s
* DELETE /rooms/:id
  * Kustutab määratud id-ga ruumi
  ### Kasutajad:
* GET /users
  * Tagastab kasutajate nimekirja
* GET /users/:id
  * Tagastab kasutaja määratud id-ga
* POST /users
  * Loob uue kasutaja
  * Nõutud email ja password
  * Nõutud firstName ja lastName request body-s
* PATCH /users/:id
  * Muudab määratud id-ga kasutaja
  * Nõutud id parameetrina
  * Nõutud firstName või lastName request body-s
* DELETE /users/:id
  * Kustutab määratud id-ga kasutaja
### Nädalapäevad:
* GET /days
  * Tagastab nädalapäevade nimekirja
* GET /days/:id
  * Tagastab nädalapäeva määratud id-ga


### Kursused:
* GET /courses
  * Tagastab kursuste nimekirja
  * Query parameeter dayId=:id tagastab vabandused määratud päevaga
* GET /courses/:id
  * Tagastab määratud id-ga kursuse
* POST /courses
  * Loob uue kursuse
  * Nõutud nameofday, roomId ja dayId request body-s
* PATCH /courses/:id
  * Muudab määratud id-ga kursuse
  * Nõutud id parameetrina
  * Nõutud nameofday või dayId või roomId request body-s
* DELETE /courses/:id
  * Kustutab määratud id-ga kursuse
