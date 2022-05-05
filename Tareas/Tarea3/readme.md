# Actividad individual 3
## _Pruebas unitarias, autenticación y persistencia en MongoDB_

### Emiliano Antonio Pineda Hernández - A01332517

Para poder observar la funcionalidad de la actividad, primero se debe utilizar el comando:

```sh
npm i
```
Así se creará la carpeta de **node_modules**, después se tendrá que inicializar **MongoDB** para tener la base de datos de la actividad corriendo y se pueda utilizar.
 ```sh
 HOST
localhost:27017
 ```
Una vez inicializada la base de datos, podremos iniciar con las pruebas. Para correr las pruebas de **Mocha** se tiene que ingresar el comando:
```sh
npm run mochatest
```
Los únicos problemas que se presentaron al momento de correr este comando, es que salen dos errores, donde no se muestra como tal el Status 200 al momento de obtener la lista de bicicletas y esto no es poque no esté la conexión con las APIs, sino que dentro del request, el **response** se muestra como **undefined** y por más que le estuve investigando y moviendo no lo pude corregir, pero repito, hay interacción con las APIs porque las siguientes pruebas donde se realizan los gets y posts se realizan correctamente. Estos test se pueden encontrar dentro del archivo de:
 ```sh
test --> test.js
 ```


Para correr todo se utiliza el comando:
```sh
npm run devstart
```
Y aquí se puede hayar que se puede crear un usuario y cuando se crea sale la leyenda en la terminal que se mandó un correo para que el usuario pueda verificar su cuenta, y se agregó una página simple para iniciar sesión.
Por último, todo tiene precedencia en la base de datos de MongoDB, los usuarios, bicicletas y reservas.