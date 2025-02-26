# 🚀 Prueba Técnica - SDi Digital Logroño

Este proyecto ha sido creado para la prueba técnica de **SDi Digital Logroño**.  
⏳ **Tiempo de desarrollo:** 24 horas.

---
## 👣 Pasos al clonar el repositorio 
- Ejecutar npm install para instalar todo y que haya un buen funcionamiento
- Versión de **Angular**: 19.1.0 (Última... creo jeje)

## ⚙️ Funcionamiento

- Para hacer **login**, solo hay que poner un correo y seleccionar de dónde eres.
- Si el email termina en **"@sdi.es"**, serás **administrador**; en cualquier otro caso, no.
- Una vez dentro, se puede ver un **dashboard** con todos los productos.
- Se pueden **añadir** productos al carrito, **quitar** productos del carrito y **"cobrar"** (simulación de compra que vacía el carrito).

### 👤 **Administradores**
- En otras pestañas, los **admins** verán una tabla con los productos actuales.
- Dependiendo de la ciudad de la que seas, tendrás más o menos permisos:
  - **Madrid** → No puede crear productos, puede eliminar productos y ver la tabla de productos.
  - **Logroño** → Puede crear productos, ver la tabla de productos, pero no eliminarlos.

### 🔐 **Logout**
Para cerrar sesión, hay que clicar en la parte superior izquierda, donde aparecerá un botón para salir y volver al login.

---

## ✅ Cosas que he podido hacer

✔️ Estilos similares al diseño.  
✔️ Mostrar productos.  
✔️ Guardarlos en el carrito.  
✔️ Mantener los productos en el carrito tras un **F5**.  
✔️ Mostrar el **nombre del usuario** en la interfaz.  
✔️ Control de usuarios con **guards**.  
✔️ Autenticación de administradores con emails **@sdi.es**.  
✔️ **Formulario de login**.  
✔️ **Tabla de productos** (sin paginación, pero con scroll infinito).  
✔️ **Búsqueda** en la tabla de productos.  
✔️ **Filtro** en el dashboard de productos.  
✔️ **Creación de productos** (solo si eres admin de Logroño).  
✔️ **Borrado de productos** (solo si eres admin de Madrid).  
✔️ Diseño del dashboard algo **responsive** (hasta donde me dio tiempo 😅).  
✔️ Uso de la fuente proporcionada.  
✔️ Estilización con **Bootstrap y TailwindCSS**.  

---

## ❌ Cosas que me hubiera gustado hacer (pero no me dio tiempo)

❌ Descubrir antes que en **Adobe XD** se pueden ver los iconos y estilos con precisión.  
❌ **Paginación** de la tabla de productos en la vista de admin.  
❌ Alertas más trabajadas (no usar las **default**).  
❌ Mejorar el control del formulario (añadir `required` en los campos).  
❌ **Diseño más responsive**.  
❌ Más fluidez en la navegación (**transitions, animations...**).  
❌ Organización del código (con las prisas, hay una vista llamada *admin2*... no debería ser así 😅).  
❌ **Calendario no desplegable**: actualmente hay que colocar la fecha manualmente (hubiera usado `angular-calendar` o algo similar).  

---

## 📝 **Resumen de la experiencia**
Me ha gustado bastante el reto, ha sido más complicado de lo que esperaba. A pesar de eso, me lo he pasado muy bien y me ha gustado ponerme a prueba con esta prueba técnica.  

Aunque, no voy a mentir… **también ha sido bastante estresante** 😆.  

Cualquier duda, no dudéis en **mandarme un mail**. Estaré muy atento.  

🙏 **Muchas gracias por la oportunidad**, estaría encantado de hacer la tercera fase y explicar el funcionamiento en más profundidad.  

¡Un saludín! 😊
