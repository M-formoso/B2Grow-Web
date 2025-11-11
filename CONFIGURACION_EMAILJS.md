# Configuración de EmailJS para Formularios de Contacto

Este documento explica cómo configurar EmailJS para que los formularios de contacto funcionen correctamente.

## 📧 Emails de Destino

Los formularios enviarán correos a las siguientes direcciones:
- `info@b2grow.com`
- `leanscapin@gmail.com`
- `dgonzalezgrowthled@gmail.com`

## 🚀 Pasos para Configurar EmailJS

### 1. Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Crea una cuenta gratuita (o inicia sesión si ya tienes una)

### 2. Configurar un Servicio de Email

1. En el dashboard de EmailJS, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta de email
5. **Guarda el Service ID** que te proporciona EmailJS

### 3. Crear una Plantilla de Email

1. Ve a **"Email Templates"** en el dashboard
2. Haz clic en **"Create New Template"**
3. Usa el siguiente formato para el contenido del email:

#### Subject (Asunto):
```
{{form_type}} - {{from_name}}
```

#### Content (Contenido):
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #374151; }
        .value { color: #1f2937; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{form_type}}</h1>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">Nombre:</div>
                <div class="value">{{from_name}}</div>
            </div>

            <div class="field">
                <div class="label">Email:</div>
                <div class="value">{{from_email}}</div>
            </div>

            <div class="field">
                <div class="label">Teléfono:</div>
                <div class="value">{{phone}}</div>
            </div>

            <div class="field">
                <div class="label">Empresa:</div>
                <div class="value">{{company}}</div>
            </div>

            <div class="field">
                <div class="label">Ciudad:</div>
                <div class="value">{{city}}</div>
            </div>

            <div class="field">
                <div class="label">Provincia:</div>
                <div class="value">{{province}}</div>
            </div>

            <div class="field">
                <div class="label">Experiencia:</div>
                <div class="value">{{experience}}</div>
            </div>

            <div class="field">
                <div class="label">Mensaje:</div>
                <div class="value">{{message}}</div>
            </div>

            <div class="field">
                <div class="label">Fecha:</div>
                <div class="value">{{timestamp}}</div>
            </div>
        </div>
    </div>
</body>
</html>
```

4. En la sección **"To Email"**, ingresa las direcciones de destino:
   ```
   info@b2grow.com, leanscapin@gmail.com, dgonzalezgrowthled@gmail.com
   ```

5. **Guarda el Template ID** que te proporciona EmailJS


### 4. Obtener la Public Key

1. Ve a **"Account"** en el menú principal
2. En la sección **"API Keys"**, encontrarás tu **Public Key**
3. Copia esta clave

### 5. Configurar el Código

Abre el archivo `src/components/Contact.tsx` y actualiza las siguientes líneas (líneas 19-23):

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'TU_SERVICE_ID',      // Reemplazar con tu Service ID
  templateId: 'TU_TEMPLATE_ID',    // Reemplazar con tu Template ID
  publicKey: 'TU_PUBLIC_KEY'       // Reemplazar con tu Public Key
};
```

Reemplaza:
- `TU_SERVICE_ID` → El Service ID que obtuviste en el paso 2
- `TU_TEMPLATE_ID` → El Template ID que obtuviste en el paso 3
- `TU_PUBLIC_KEY` → La Public Key que obtuviste en el paso 4

### 6. Probar los Formularios

1. Ejecuta el proyecto: `npm run dev`
2. Navega a la sección de contacto
3. Prueba ambos formularios:
   - **Solicitar Presupuesto**: Formulario general de contacto
   - **Quiero ser Distribuidor**: Modal con formulario extendido

## 📝 Notas Importantes

- EmailJS ofrece **200 emails gratis por mes** en su plan gratuito
- Si necesitas enviar más emails, considera actualizar a un plan pago
- Verifica que los emails no caigan en spam la primera vez
- Puedes personalizar el diseño de la plantilla de email según tus necesidades

## 🔧 Alternativa: Usar Variables de Entorno

Para mayor seguridad, puedes mover las credenciales a variables de entorno:

1. Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_EMAILJS_SERVICE_ID=tu_service_id
VITE_EMAILJS_TEMPLATE_ID=tu_template_id
VITE_EMAILJS_PUBLIC_KEY=tu_public_key
```

2. Actualiza `Contact.tsx`:
```typescript
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};
```

3. Agrega `.env` al archivo `.gitignore` para no subir las credenciales a GitHub

## 🎯 Formularios Implementados

### 1. Formulario de Presupuesto
- **Campos**: Nombre, Email, Teléfono, Empresa (opcional), Mensaje
- **Ubicación**: Sección principal de contacto (izquierda)

### 2. Formulario de Distribuidor
- **Campos**: Nombre, Email, Teléfono, Empresa, Ciudad, Provincia, Experiencia, Mensaje
- **Ubicación**: Modal que se abre al hacer clic en "Quiero ser Distribuidor"

Ambos formularios:
- Validan campos requeridos
- Muestran estado de "Enviando..."
- Muestran mensajes de éxito/error
- Se limpian automáticamente después del envío exitoso
- Envían a las 3 direcciones de email configuradas

## ❓ Problemas Comunes

### Los emails no llegan
- Verifica que las credenciales de EmailJS sean correctas
- Revisa la carpeta de spam
- Confirma que el servicio de email esté activo en EmailJS

### Error de CORS
- EmailJS maneja automáticamente CORS, pero asegúrate de usar el Public Key correcto

### Emails se envían pero están vacíos
- Verifica que los nombres de las variables en la plantilla coincidan con los del código
- Revisa la consola del navegador para ver los datos que se están enviando

## 📞 Soporte

Si tienes problemas con la configuración de EmailJS, visita su documentación:
- [Documentación de EmailJS](https://www.emailjs.com/docs/)
- [Ejemplos de integración](https://www.emailjs.com/docs/examples/)
