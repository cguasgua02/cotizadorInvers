# Cotizador Inteligente de Invers conectado a Stripe y Registro en Google Sheets

**Cotizador Inteligente de Invers** es una aplicación web interactiva desarrollada con React y Tailwind CSS, desplegada en **Netlify**, que permite a negocios y empresas obtener una cotización automatizada para la implementación de agentes conversacionales basados en inteligencia artificial (IA).

El objetivo es facilitar un proceso de levantamiento de información y cálculo de precios personalizado, en base a los requerimientos de cada empresa, como canales de atención, complejidad del agente, automatizaciones requeridas y tamaño del negocio.

Este cotizador está diseñado para ser **inteligente, flexible y escalable**, permitiendo además registrar los datos en una hoja de **Google Sheets mediante n8n**, y generar un **enlace de pago en tiempo real con Stripe**.

## Requisitos

- Cuenta de n8n (Más adelante se provee el Workflow).
- Cuenta en Netlify (Servicio Serverless para manejar backend y Frontend de la página)
- API de Stripe. Secret Key.
- API OAuth de Google Cloud y tener habilitado el Google Sheets API en Google Cloud
- Para un servicio ininterrumpido se recomienda una VPS con interfaz de EasyPanel para correr el n8n de manera constante 

## Ultimas actualizaciones

2.0 : Se ha actualizado la lógica de precios mensual, para que responda de acuerdo a si es una empresa pequeña, mediana o grande. Se añaden los logos
Primera Versión 1.0 : Se crea todo el sistema.

## Mejoras Pendientes:

- Se necesita desarrollar el botón de "Subir a Google Drive". Dentro de `index.html` se cuenta con la función `handleUploadToGoogleDrive` que debe tener una estructura similar al `handleSubmit` para que n8n se encargue de crear el documento ya sea `.json` o `.doc`.
- Se necesita un favicon de nuestra empresa.
- Siempre se puede mejorar la lógica de precios pues se sigue estudiantes los parámetros y las variables que hacen que esta función lineal sea más asertiva. 

## 🚀 Funcionalidades principales

- 📝 **Formulario dinámico** con validación en tiempo real (JavaScript).
- 📊 **Cálculo automático de cotización** según reglas de negocio configuradas (JavaScript).
- 💸 **Cálculo de precio inicial, descuento, ahorro e inversión final.**
- 📩 **Envío automático de datos a Google Sheets** usando **n8n** (sin servidor, API Google).
- 💳 **Botón de pago con Stripe** que genera una sesión segura en tiempo real. (API Stripe)
- 📦 **Exportación de datos** en formato JSON o subida a Google Drive (simulado).
- 🌐 **Despliegue automático en Netlify** con flujos CI/CD desde GitHub.

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

## 🧮 Lógica de Cotización ¿Cómo calcula el precio?
La lógica de precios incluye:

- Tamaño de la base de datos (clientes + sedes).
- Canales seleccionados (WhatsApp, webchat, etc.).
- Tipo de agente requerido (texto, voz).
- Automatizaciones (ventas, soporte, interno).
- Complejidad del agente según roles seleccionados.
- Operación nacional o internacional.
- Descuento especial por acción rápida (48h).
 
Toda la lógica está implementada en la sección `calculator.js`.

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

