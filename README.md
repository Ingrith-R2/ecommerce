# Ecommerce

Tienda en línea (Node.js + Express + Handlebars) para catálogo de productos de
belleza y salud, con carrito de compras y registro de pedidos.

## Modo demo

El proyecto arranca en **modo demo** automáticamente cuando no existe un archivo
`.env` con `MONGODB_URI`. En este modo:

- Usa 10 productos de ejemplo repartidos en 4 categorías (`src/demo/data.js`).
- Genera las imágenes como SVG (`/demo/img/:slug.svg`), sin depender de Cloudinary
  ni de conexión a internet.
- Los pedidos no se guardan ni se envía correo: se imprimen en la consola.
- El administrador entra con un usuario de prueba, sin base de datos.

### Credenciales de prueba

| Campo | Valor |
| --- | --- |
| Correo | `admin@demo.com` |
| Contraseña | `demo1234` |

Vienen precargadas en el formulario de login, así que basta con pulsar *Entrar*.
Los productos y categorías que crees se guardan **en memoria**: se pierden al
reiniciar el servidor, lo cual es útil para dejar la demo siempre igual.

Para levantarla:

```bash
npm install
npm start
```

Luego abrir <http://localhost:5000>.

Con `npm run dev` se levanta con nodemon (recarga automática).

### Qué se puede mostrar en la demo

| Funcionalidad | Estado |
| --- | --- |
| Catálogo por categorías con precios | Funciona |
| Agregar al carrito, cambiar cantidad, eliminar | Funciona |
| Total del carrito y contador de artículos | Funciona |
| Formulario de datos y confirmación del pedido | Funciona |
| Login de administrador | Funciona (usuario de prueba) |
| Crear, editar y eliminar productos | Funciona (en memoria) |
| Crear, editar y eliminar categorías | Funciona (en memoria) |
| Subir imágenes propias | Requiere Cloudinary |
| Envío de correos y recuperar contraseña | Requiere Mailtrap y base de datos |

En modo demo la imagen de cada producto se genera automáticamente a partir de su
nombre, por lo que el campo de subir archivo no aparece en el formulario.

### Recorrido sugerido para la presentación

1. Abrir la tienda y recorrer las categorías con sus precios.
2. Agregar dos o tres productos al carrito, cambiar cantidades y ver el total.
3. Finalizar la compra: llenar los datos de contacto y confirmar el pedido.
4. Entrar como administrador (*Administrador* en el menú) y crear un producto.
5. Volver al inicio y mostrar el producto nuevo ya publicado en la tienda.

## Modo completo (con base de datos)

Copiar `.env.example` a `.env` y completar las variables:

- `MONGODB_URI` — conexión a MongoDB (local o Atlas)
- `CLOUD_NAME`, `API_KEY`, `API_SECRET` — Cloudinary, para subir imágenes
- `HOST_MAILTRAP`, `PORT_MAILTRAP`, `USER_MAILTRAP`, `PASS_MAILTRAP` — envío de correos

Con `MONGODB_URI` presente el modo demo se desactiva solo y la aplicación usa la
base de datos.
