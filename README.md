<img src="PR-LLAJTA-TOUR/assets/icon.png" alt="Descripción de la imagen" width="300"/>

# Cochabamba Turistica-Movil


## Video de Presentación de la App Movil
<a href="https://www.youtube.com/watch?v=4ckT_--Dp94">
  <img src="PR-LLAJTA-TOUR/assets/icon.png" alt="Descripción de la miniatura" width="100">
</a>

Haga click en la miniatura.


## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Roles / Integrantes](#roles-e-integrantes)
4. [Arquitectura del Software](#arquitectura-del-software)
5. [Procedimiento para Actualización de la Aplicación en la Play Store](#Procedimiento-para-Actualización-de-la-Aplicación-en-la-Play-Store)
6. [Personalización y Configuración](#personalización-y-configuración)
7. [Seguridad](#seguridad)
8. [Depuración y Solución de Problemas](#depuración-y-solución-de-problemas)
9. [Glosario de Términos](#glosario-de-términos)
10. [Referencias y Recursos Adicionales](#referencias-y-recursos-adicionales)
11. [Herramientas de Implementación](#herramientas-de-implementación)
12. [Bibliografía](#bibliografía)

## **INTRODUCCIÓN**

La aplicación Cochabamba Turística es una herramienta diseñada para facilitar y enriquecer la experiencia de quienes desean conocer los principales atractivos turísticos de la ciudad de Cochabamba, Bolivia. A través de una interfaz intuitiva y funcionalidades prácticas, los usuarios pueden acceder a información detallada de los lugares turísticos, explorar mapas interactivos, y disfrutar de contenido multimedia como imágenes, videos y audios.

## **DESCRIPCIÓN DEL PROYECTO**

El proyecto Cochabamba Turística presenta una innovadora iniciativa tecnológica orientada a promover y facilitar el turismo en la ciudad de Cochabamba, Bolivia. A través del desarrollo de una aplicación móvil, esta plataforma busca conectar a los usuarios con la riqueza cultural, histórica y natural de la región, ofreciendo una experiencia interactiva y personalizada.

La aplicación integra múltiples funcionalidades, como filtros por categoría, nombre o preferencias personales, un sistema de favoritos, y mapas interactivos que permiten ubicar y navegar hacia los destinos turísticos mediante Google Maps. Además, ofrece contenido multimedia enriquecido para cada lugar, incluyendo imágenes actuales e históricas, videos, audios y descripciones detalladas, permitiendo a los usuarios conocer a profundidad cada sitio.

Con un diseño intuitivo y opciones como el inicio de sesión con Google, Cochabamba Turística busca no solo facilitar el acceso a información turística, sino también preservar y difundir la historia y cultura de la región. Este proyecto se plantea como una herramienta clave para fomentar el turismo local, fortalecer la conexión de los habitantes y visitantes con los atractivos de la ciudad, y contribuir al desarrollo sostenible del sector turístico en Bolivia.

## **ROLES E INTEGRANTES**

1. **Team Líder, DB Architect, Developer:** Jhael kuno Bustos
2. **DB Architect, GIT Master, Developer:** Boris Sejas Mendizabal

## **ARQUITECTURA DEL SOFTWARE**

La aplicación Cochabamba Turística sigue una arquitectura basada en el modelo cliente-servidor. En este modelo, el cliente (la aplicación móvil) interactúa directamente con servicios en la nube proporcionados por Firebase y APIs externas para gestionar datos, multimedia, autenticación y mapas.

 - ### **Tecnologías y Herramientas**
    - **Lenguaje de programación:** JavaScript.
    - **Framework:** React Native, utilizado para desarrollar una aplicación móvil multiplataforma (Android y iOS).
    - **Servicios en la nube:** Firebase.
       - *Firestore:* Base de datos NoSQL utilizada para almacenar información de los lugares turísticos y los datos del usuario.
       - *Firebase Storage:* Almacenamiento de archivos multimedia, como imágenes, videos y audios.
       - *Firebase Authentication:* Gestión de autenticación de usuarios con Google.
    - **APIs externas:** Google Maps API, utilizada para la visualización y navegación hacia los destinos turísticos.

 
 ## **PROCEDIMIENTO PARA LA ACTUALIZACIÓN DE LA APLICACIÓN EN LA PLAY STORE**

  - **Paso 1:** Preparación del Proyecto
    - Antes de actualizar la aplicación en la Play Store, asegúrate de tener todo el código actualizado y funcionando correctamente:
      
          npm start

  - **Paso 2:** Verificar las Configuraciones de Expo
     - Asegúrate de que el archivo app.json esté configurado correctamente:
         - versión de la aplicación (version).
         - número de versión de Android (android.versionCode).
     





