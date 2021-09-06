# Creando una Red Social: «SOCIAL-HEALTH» ![image](https://user-images.githubusercontent.com/85120257/132244403-50cc5047-d9d8-4095-b97f-6d68e7c02c68.png)

## Índice

* [1. Preámbulo](#1-preámbulo)
* [2. Resumen del proyecto](#2-resumen-del-proyecto)
* [3. Objetivos de aprendizaje](#3-objetivos-de-aprendizaje)
* [4. Consideraciones generales](#4-consideraciones-generales)
* [5. Criterios de aceptación mínimos del proyecto](#5-criterios-de-aceptación-mínimos-del-proyecto)
* [6. Entrega](#6-entrega)


## 1. Preámbulo

Instagram, Snapchat, Twitter, Facebook, Twitch, Linkedin, etc. Las redes
sociales han invadido nuestras vidas. Las amamos u odiamos, y muchos no podemos
vivir sin ellas.

Hay redes sociales de todo tipo y para todo tipo de intereses. Por ejemplo,
en una ronda de financiamiento con inversionistas, se presentó una red social
para químicos en la que los usuarios podían publicar artículos sobre sus
investigaciones, comentar en los artículos de sus colegas, y filtrar artículos
de acuerdo a determinadas etiquetas o su popularidad, lo más reciente, o lo
más comentado.

## 2. Resumen del proyecto

Social Health es una red social desarrollada para aquellos usuarios interesados 
en aplicar en su día a día prácticas saludables, físicas, mentales y espirituales.
Esta red social les dará acceso a una comunidad de personas que también deseen mejorar
y/o mantener este estilo de vida saludable.

Social Health permite a cualquier usuario crear una cuenta de
acceso y loguearse con ella; crear, editar, borrar y _"likear"_ publicaciones.

En este proyecto se construyó una [Single-page Application (SPA)](https://es.wikipedia.org/wiki/Single-page_application)
[_responsive_](https://curriculum.laboratoria.la/es/topics/css/02-responsive) (con más de una vista / página)
en la que se puede **leer y escribir datos**.

## 3. Objetivos de aprendizaje

### HTML

- [x] **Uso de HTML semántico**

### CSS

- [x] **Uso de selectores de CSS**

- [x] **Modelo de caja (box model): borde, margen, padding**

- [x] **Uso de flexbox en CSS**

- [ ] **Uso de CSS Grid Layout**

### Web APIs

- [x] **Uso de selectores del DOM**

- [x] **Manejo de eventos del DOM (listeners, propagación, delegación)**

- [x] **Manipulación dinámica del DOM**

- [x] **Ruteado (History API, evento hashchange, window.location)**

### JavaScript

- [x] **Arrays (arreglos)**

- [x] **Objetos (key, value)**

- [x] **Diferenciar entre tipos de datos primitivos y no primitivos**

- [x] **Variables (declaración, asignación, ámbito)**

- [x] **Uso de condicionales (if-else, switch, operador ternario, lógica booleana)**

- [ ] **Uso de bucles/ciclos (while, for, for..of)**

- [x] **Funciones (params, args, return)**

- [x] **Pruebas unitarias (unit tests)**

- [x] **Pruebas asíncronas**

- [x] **Uso de mocks y espías**

- [x] **Módulos de ECMAScript (ES Modules)**

- [x] **Uso de linter (ESLINT)**

- [x] **Uso de identificadores descriptivos (Nomenclatura y Semántica)**

- [x] **Diferenciar entre expresiones (expressions) y sentencias (statements)**

- [x] **Callbacks**

- [x] **Promesas**

### Control de Versiones (Git y GitHub)

- [x] **Git: Instalación y configuración**

- [x] **Git: Control de versiones con git (init, clone, add, commit, status, push, pull, remote)**

- [x] **Git: Integración de cambios entre ramas (branch, checkout, fetch, merge, reset, rebase, tag)**

- [ ] **GitHub: Creación de cuenta y repos, configuración de llaves SSH**

- [x] **GitHub: Despliegue con GitHub Pages**

- [x] **GitHub: Colaboración en Github (branches | forks | pull requests | code review | tags)**

- [ ] **GitHub: Organización en Github (projects | issues | labels | milestones | releases)**

### UX (User eXperience)

- [x] **Diseñar la aplicación pensando en y entendiendo al usuario**

- [x] **Crear prototipos para obtener feedback e iterar**

- [x] **Aplicar los principios de diseño visual (contraste, alineación, jerarquía)**

- [x] **Planear y ejecutar tests de usabilidad**

### Firebase

- [x] **Firebase Auth**

- [x] **Firestore**

## 4. Consideraciones generales

* Este proyecto se trabajó en dupla.

* La lógica del proyecto ha sido implementada completamente en JavaScript
  (ES6+), HTML y CSS :smiley:. Para este proyecto **no estuvo permitido** utilizar
  _frameworks_ o librerías de CSS y JS.

* La división y organización del trabajo ha permitido que **cada integrante** del 
  equipo practique el aprendizaje de todo lo involucrado en **cada historia**. 
  Aprovechamos mutuamente de hacer _pair programming_, puesto que, consideramos que
  esta es una de las mejores maneras de reforzar el aprendizaje.

## 5. Criterios de aceptación mínimos del proyecto

### 5.1 Definición del producto

* **¿Quiénes son los principales usuarios del Producto?**
  Personas que están interesadas en aplicar prácticas saludables, físicas, mentales
  y espirituales.
  
* **¿Qué problema resuelve el producto / para qué le servirá a estos usuarios?**
  Existe una cantidad de personas interesadas en mejorar su salud física y mental 
  que no encuentran un espacio digital específico para estos temas. Este producto 
  les otorgará una comunidad para estar en contacto con multitud de personas que 
  también deseen mejorar y/o mantener una vida saludable, en donde interactúen y 
  puedan sacar provecho de ello.
  
* **¿Cuáles son los objetivos de estos usuarios en relación con el Producto?**
  El usuario deseará tener una cuenta de acceso a la red para que pueda crear 
  publicaciones, editarlas, borrarlas y likearlas.
  
* **¿Cuándo utilizan o utilizarían el Producto?**
  En sus tiempos libres o cuando deseen compartir u obtener información sobre algún 
  tema relacionado a la salud física, mental y/o espiritual.


### 5.2 Historias de usuario

![image](https://user-images.githubusercontent.com/85120257/132150888-4c085ba6-97be-46ee-a708-5af922039854.png)

![image](https://user-images.githubusercontent.com/85120257/132150910-cd2f1952-f513-4ec3-a1a3-aa523b2007ae.png)


### 5.3 Diseño de la Interfaz de Usuario (protoripo de alta fidelidad)

* Vista mobile

    ![01-Iniciar sesión](https://user-images.githubusercontent.com/85120257/132243639-d3fe0adf-7499-4895-a455-eb6e84c9244c.jpg)

    ![02-Modal de Registro](https://user-images.githubusercontent.com/85120257/132243696-305f0bc0-c811-4b1a-99c4-dfadc479bb94.jpg)

    ![03-Interfaz Principal](https://user-images.githubusercontent.com/85120257/132243721-66badf38-eb69-434a-b46a-0e90e49e8a3a.png)


* Vista Desktop
    
    ![01-Vista Login Desktop](https://user-images.githubusercontent.com/85120257/132243764-6296d819-7aae-4a35-a9c6-3ac90ce20de4.png)
    
    ![02-Vista Register Desktop](https://user-images.githubusercontent.com/85120257/132246832-2a38ca01-7dd5-42c3-a2cd-f5230b9978ff.png)
    
    ![03-Vista Home Desktop](https://user-images.githubusercontent.com/85120257/132244103-3169f200-75a2-4f57-ba4e-f9cd423f83fb.png)

    
### 5.5 Consideraciones del comportamiento de la interfaz de usuario (UI)

#### Creación de cuenta de usuario e inicio de sesión

* _Login_ con Firebase:
  - Para el _login_ y las publicaciones en el muro se utilizó [Firebase](https://firebase.google.com/products/database/)
  - Es posible la creación de cuentas de acceso y autenticación con cuenta de correo y
    contraseña, y también con una cuenta de Google.
* Validaciones:
  - Solamente se permite el acceso a usuarios con cuentas válidas.
  - No pueden haber usuarios repetidos.
  - La cuenta de usuario debe ser un correo electrónico válido.
  - Lo que se escriba en el campo (_input_) de contraseña es secreto.
* Comportamiento:
  - Al enviarse el formulario de registro o inicio de sesión, debe validarse.
  - Si hay errores, se muestran mensajes descriptivos para ayudar al
  usuario a corregirlos.

#### Muro/timeline

* Validaciones:
  - Al publicar, se valida que exista contenido en el _input_.
* Comportamiento:
  - Al recargar la aplicación, se verifica si el usuario está _logueado_
    antes de mostrar contenido.
  - Se pueden publicar _posts_.
  - Se puede dar y quitar _like_ a las publicaciones. Máximo uno por usuario.
  - Se lleva el conteo de los _likes_.
  - Se puede eliminar un post específico.
  - Se pide confirmación antes de eliminar un _post_.
  - Al dar _click_ para editar un _post_, se cambia el texto por un _input_
    que permite editar el texto y luego guardar los cambios.
  - Al guardar los cambios se cambia a un texto normal pero con la
    información editada.
  - Al recargar la página se pueden ver los textos editados.

### 5.6 Consideraciones técnicas Front-end

* Se separó la manipulación del DOM de la lógica (Separación de responsabilidades).
* La aplicación es una [Single Page Application (SPA)](https://es.wikipedia.org/wiki/Single-page_application),
  la cual cuenta con múltiples vistas.
* Se trabajó con [Firebase](https://firebase.google.com/) (Auth y Cloud Firestore), 
  que nos permitió alterar y persistir datos a lo largo de la aplicación.

#### Pruebas unitarias (unit tests)

* Los tests unitarios logran cubrir un mínimo del 70% de _statements_, _functions_,
  _lines_, y _branches_.


## 6. Entrega

El proyecto ha sido _entregado_ subiendo el código a GitHub (`commit`/`push`) y la
interfaz ha sido desplegada usando GitHub pages.

***

## 7. Autoras

El proyecto ha sido realizado por:

* Dafne Aquino 👩‍💻

* Paola Taboada 👩‍💻
