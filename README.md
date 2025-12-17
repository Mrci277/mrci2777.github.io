# CV Marcel Barti - Autenticación Segura y Correo Profesional

Currículum profesional con autenticación segura mediante bcrypt y envío de correos electrónicos con Gmail.

## 🔐 Seguridad

- **Contraseña hasheada con bcrypt**: La contraseña nunca se almacena en texto plano
- **Hash utilizado**: `$2b$10$V.Fud181KABu.AnjzDaWru2DTg43A29iMCpT/Te01GSC93wJAusW2`
- **Contraseña**: `Marcus0Parcus2` (solo para verificación, nunca aparece en el código)
- **Sesión segura**: Utiliza sessionStorage del navegador

## 📧 Correo Electrónico

- **Servicio**: Gmail SMTP
- **Plantillas HTML profesionales**: Correos formateados y responsivos
- **Confirmación automática**: El remitente recibe confirmación de envío
- **Seguridad**: Las credenciales se configuran en variables de entorno

## 🚀 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd cv-marcel-barti
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
GMAIL_USER=marcelbartiii@gmail.com
GMAIL_PASSWORD=tu_contraseña_de_aplicacion_aqui
PORT=3000
```

### 4. Obtener contraseña de aplicación de Gmail

1. Ve a [Google Account Security](https://myaccount.google.com/security)
2. Activa la verificación en dos pasos
3. Ve a [App passwords](https://myaccount.google.com/apppasswords)
4. Selecciona "Mail" y "Windows Computer"
5. Copia la contraseña generada
6. Pégala en el archivo `.env` como `GMAIL_PASSWORD`

**IMPORTANTE**: Nunca uses tu contraseña de Gmail principal. Siempre usa una contraseña de aplicación.

## 📁 Estructura de archivos

```
cv-marcel-barti/
├── index.html              # Página principal con login
├── script.js               # Lógica del cliente (autenticación y contacto)
├── styles.css              # Estilos CSS
├── CV_Marcel_Barti.pdf     # Currículum en PDF
├── server.js               # Servidor Express con endpoints
├── package.json            # Dependencias del proyecto
├── .env.example            # Plantilla de variables de entorno
├── .env                    # Variables de entorno (no incluir en git)
└── README.md               # Este archivo
```

## 🔧 Uso

### Iniciar el servidor

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

### Acceder al CV

1. Abre `http://localhost:3000` en tu navegador
2. Ingresa la contraseña: `Marcus0Parcus2`
3. Se guardará la sesión en el navegador

### Enviar mensaje de contacto

1. Desplázate hasta la sección "Contacto"
2. Completa el formulario
3. Haz clic en "Enviar Mensaje"
4. Se enviará un correo al propietario y una confirmación al remitente

## 🔒 Seguridad - Detalles Técnicos

### Hash de Contraseña

- **Algoritmo**: bcryptjs (bcrypt en JavaScript)
- **Salt rounds**: 10 (estándar de seguridad)
- **Hash**: `$2b$10$V.Fud181KABu.AnjzDaWru2DTg43A29iMCpT/Te01GSC93wJAusW2`

El hash se verifica en el servidor usando:
```javascript
const isValid = await bcryptjs.compare(password, hash);
```

### Gestión de Sesión

- Se utiliza `sessionStorage` del navegador
- La sesión se pierde al cerrar la pestaña
- No se almacenan datos sensibles

### Correo Seguro

- Las credenciales se almacenan en variables de entorno
- No se guardan en el código fuente
- Se usa SMTP de Gmail con autenticación

## 📝 Notas Importantes

1. **Nunca** compartas tu contraseña de aplicación de Gmail
2. **Nunca** hagas commit del archivo `.env` a git
3. El archivo `.gitignore` debe incluir `.env`
4. Para producción, usa un servicio de correo profesional como SendGrid o AWS SES

## 🐛 Solución de problemas

### "Error al enviar el correo"

- Verifica que las credenciales de Gmail sean correctas
- Asegúrate de usar una contraseña de aplicación, no la contraseña principal
- Comprueba que la verificación en dos pasos esté activada en Gmail

### "Contraseña incorrecta"

- La contraseña es: `Marcus0Parcus2` (sensible a mayúsculas/minúsculas)
- Verifica que no haya espacios al inicio o final

### El servidor no inicia

- Verifica que el puerto 3000 esté disponible
- Comprueba que todas las dependencias estén instaladas: `npm install`
- Revisa que el archivo `.env` esté correctamente configurado

## 📞 Contacto

Para más información, contacta a Marcel Barti en: marcelbartiii@gmail.com

---

**Última actualización**: Diciembre 2025
**Versión**: 1.0.0
