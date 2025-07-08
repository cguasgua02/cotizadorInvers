# Cotizador Inteligente de Invers conectado a Stripe y Registro en Google Sheets

Este proyecto permite cotizar automáticamente el valor de un asistente IA personalizado, mostrar la cotización en pantalla y redirigir al usuario a un **link de pago de Stripe**, además de registrar la información en **Google Sheets** mediante una automatización de **n8n**.

## 🚀 Funcionalidades principales

- 📋 Formulario web de cotización con validación en tiempo real
- 📊 Lógica de precios dinámica basada en variables seleccionadas
- 💸 Integración con Stripe para pago en línea (Checkout)
- 📥 Registro automático en Google Sheets vía webhook de n8n
- ✅ Páginas de confirmación y error personalizadas

---

## 🛠️ Tecnologías utilizadas

| Tecnología      | Rol                                       |
|-----------------|--------------------------------------------|
| **React + Babel**  | Construcción del formulario interactivo    |
| **Tailwind CSS**   | Estilo visual del formulario y resultados |
| **Stripe API**     | Generación del enlace de pago seguro      |
| **Netlify Functions** | Backend sin servidor para checkout Stripe |
| **n8n**             | Webhook para guardar datos en Google Sheets |
| **Google Sheets**   | Base de datos para registrar formularios  |

---

## 🧠 Lógica de Cotización

El cálculo de la cotización se basa en:
- Tamaño del negocio (`clientes` y `sedes`)
- Número de canales elegidos
- Uso de agentes de texto o voz
- Integración CRM o desde cero
- Tareas del agente (ventas, soporte, interno)
- Nivel de personalización requerido
- Ubicación (nacional/internacional)

💡 El sistema aplica un **descuento del 15%** si el usuario actúa en las primeras 48 horas.

---

## 🔗 Conexiones y automatizaciones

### Stripe
- Se utiliza Stripe Checkout para pagos.
- El monto se calcula desde el frontend y se envía a Netlify Function (`crear-checkout.js`).
- Clave secreta guardada como variable de entorno `STRIPE_SECRET_KEY`.

### n8n + Google Sheets
- El formulario guarda todos los datos del usuario y su cotización.
- También se guarda el **link de pago de Stripe** y la **hora de registro**.
- Webhook de n8n expuesto públicamente para Netlify.

---

## 📦 Estructura del Proyecto

📁 public/

│   ├── index.html           # Página principal con el formulario de cotización

│   ├── exito.html           # Página de éxito tras el pago

│   └── error.html           # Página de error si el pago falla

│
📁 netlify/

│   └── functions/

│       └── crear-checkout.js   # Netlify Function que crea la sesión de pago con Stripe
│

📄 netlify.toml              # Configuración de Netlify (build y rutas)

📄 README.md                 # Documentación del proyecto



---

## ✅ Cómo desplegar en Netlify

1. En caso de no tener una copia en tu cuenta de Github, clona el repositorio. 
3. En Netlify, conecta el repositorio. Con el repositorio conectado puedes cargar el proyecto a Netlify. 
4. Añade la clave secreta de Stripe en Environmental Variables de Netlify. Para esto, vas al proyecto cargado y das click en la parte de **Project Configuration** 
5. En la lista de Proyect configuration buscas **Environment Variables** y allí puedes copiar la clave en el Value. El nombre de la clave debe ser `STRIPE_SECRET_KEY`.
6. Publica 

---

## 🔗 Conexión con n8n

La integración con [n8n](https://n8n.io/) permite automatizar el almacenamiento de cada cotización en una hoja de Google Sheets. Esto se logra mediante un **webhook** configurado en n8n que se activa desde el formulario.

### 📍 ¿Dónde está implementada esta conexión?

| Archivo               | Ubicación en el código                                                 | Descripción                                                                 |
|-----------------------|------------------------------------------------------------------------|-----------------------------------------------------------------------------|
| `index.html`          | `handleSubmit` en el componente `QuoteForm`                           | Envía los datos completos del formulario y los precios a n8n vía `fetch()` |
| `handleSubmit` (JS)   | Línea que llama a `https://n8n-n8n.hqovcw.easypanel.host/webhook/formulario-cotizacion` | Webhook que guarda los datos en Google Sheets                              |
| `crear-checkout.js`   | Dentro de Netlify Functions (`/netlify/functions/`)                   | (Opcional) También puedes replicar aquí el envío del link de pago a n8n    |

### 📂 Repositorio de Workflows de n8n

Puedes acceder a todos los flujos de trabajo de automatización n8n utilizados en este proyecto (incluyendo conexión con Google Sheets) desde este repositorio:

👉 [https://github.com/tu-usuario/workflows-n8n](https://github.com/tu-usuario/workflows-n8n)

---

## 🧪 Demo / Probar

- URL del formulario (Netlify): `https://tupagina.netlify.app`
- Si deseas probar el checkout, usa [tarjetas de prueba de Stripe](https://stripe.com/docs/testing).

---

## 📩 Contacto

Desarrollado por [Tu Nombre / Tu Empresa]

- 📧 contacto@tuempresa.com
- 🌐 [www.tuempresa.com](https://www.tuempresa.com)

