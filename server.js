// ============================================
// Servidor Express - Marcel Barti CV
// Autenticación segura y envío de correos
// ============================================

import express from 'express';
import bcryptjs from 'bcryptjs';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// Hash bcrypt de la contraseña (nunca guardar contraseña en texto plano)
const PASSWORD_HASH = '$2b$10$V.Fud181KABu.AnjzDaWru2DTg43A29iMCpT/Te01GSC93wJAusW2';

// Configurar Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'marcelbartiii@gmail.com',
    pass: process.env.GMAIL_PASSWORD // Usar contraseña de aplicación de Gmail
  }
});

// Endpoint para verificar contraseña
app.post('/api/verify-password', async (req, res) => {
  try {
    const { password, hash } = req.body;

    if (!password || !hash) {
      return res.status(400).json({ error: 'Faltan parámetros', valid: false });
    }

    // Comparar contraseña con hash
    const isValid = await bcryptjs.compare(password, hash);

    res.json({ valid: isValid });
  } catch (error) {
    console.error('Error verificando contraseña:', error);
    res.status(500).json({ error: 'Error en el servidor', valid: false });
  }
});

// Endpoint para enviar correo
app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validar datos
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Todos los campos son requeridos' 
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email inválido' 
      });
    }

    // Generar HTML del correo
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 1.5rem;
          }
          .content {
            padding: 2rem;
          }
          .field {
            margin-bottom: 1.5rem;
          }
          .field-label {
            font-weight: 600;
            color: #667eea;
            margin-bottom: 0.5rem;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .field-value {
            background-color: #f9f9f9;
            padding: 1rem;
            border-radius: 4px;
            border-left: 4px solid #667eea;
            word-wrap: break-word;
          }
          .message-content {
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 1.5rem;
            text-align: center;
            font-size: 0.875rem;
            color: #666;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Nuevo Mensaje de Contacto</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Asunto</div>
              <div class="field-value">${escapeHtml(subject)}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Nombre del Remitente</div>
              <div class="field-value">${escapeHtml(name)}</div>
            </div>
            
            <div class="field">
              <div class="field-label">Correo Electrónico</div>
              <div class="field-value">
                <a href="mailto:${escapeHtml(email)}" style="color: #667eea; text-decoration: none;">
                  ${escapeHtml(email)}
                </a>
              </div>
            </div>
            
            <div class="field">
              <div class="field-label">Mensaje</div>
              <div class="field-value">
                <div class="message-content">${escapeHtml(message)}</div>
              </div>
            </div>
          </div>
          <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto del CV de Marcel Barti.</p>
            <p>${new Date().toLocaleString('es-ES')}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar correo al propietario
    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'marcelbartiii@gmail.com',
      to: process.env.GMAIL_USER || 'marcelbartiii@gmail.com',
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: htmlContent,
      replyTo: email
    });

    // Enviar confirmación al remitente
    const confirmationHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 2rem;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 1.5rem;
          }
          .content {
            padding: 2rem;
            text-align: center;
          }
          .success-icon {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          .content p {
            margin: 1rem 0;
            color: #666;
          }
          .footer {
            background-color: #f5f5f5;
            padding: 1.5rem;
            text-align: center;
            font-size: 0.875rem;
            color: #666;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✓ Mensaje Recibido</h1>
          </div>
          <div class="content">
            <div class="success-icon">✓</div>
            <h2>¡Gracias, ${escapeHtml(name)}!</h2>
            <p>Tu mensaje ha sido recibido correctamente.</p>
            <p>Nos pondremos en contacto contigo lo antes posible.</p>
          </div>
          <div class="footer">
            <p>Si tienes alguna pregunta, no dudes en escribir nuevamente.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER || 'marcelbartiii@gmail.com',
      to: email,
      subject: 'Confirmación de tu mensaje',
      html: confirmationHtml
    });

    res.json({ success: true, message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error enviando correo:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Error al enviar el correo. Por favor intenta de nuevo.' 
    });
  }
});

// Función para escapar HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char] || char);
}

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✓ Servidor ejecutándose en http://localhost:${PORT}`);
  console.log('✓ Autenticación segura con bcrypt activada');
  console.log('✓ Envío de correos con Gmail configurado');
});
