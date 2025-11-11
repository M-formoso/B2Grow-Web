# 🤖 Configuración del Chatbot con OpenAI

## 📋 Pasos para configurar:

### 1. Obtener tu API Key de OpenAI

1. Ve a https://platform.openai.com/api-keys
2. Inicia sesión con tu cuenta de OpenAI
3. Haz click en "Create new secret key"
4. Copia la API key (empieza con `sk-...`)

### 2. Configurar la API Key

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza `tu-api-key-de-openai-aqui` con tu API key real:
   ```
   OPENAI_API_KEY=sk-tu-api-key-aqui
   ```
3. Guarda el archivo

### 3. Iniciar el servidor del chatbot

Abre una **nueva terminal** y ejecuta:

```bash
cd server
npm start
```

Deberías ver:
```
🤖 Servidor de chatbot corriendo en http://localhost:3001
📡 Endpoint: http://localhost:3001/api/chat
🔑 OpenAI API Key configurada: ✅ Sí
```

### 4. Iniciar el frontend (si no está corriendo)

En **otra terminal**:

```bash
npm run dev
```

### 5. Probar el chatbot

1. Ve a http://localhost:8080
2. Haz click en la burbuja 💬 abajo a la derecha
3. Escribe un mensaje y presiona Enter
4. Deberías recibir una respuesta de Bitu

---

## 🚀 Para producción en tu hosting

Cuando subas a producción, necesitarás:

1. **Subir el servidor** (`/server` folder) a un servicio como:
   - Render.com (gratuito)
   - Railway.app (gratuito)
   - Heroku
   - Tu propio VPS

2. **Actualizar la URL** en `src/components/ChatBot.tsx`:
   ```typescript
   // Cambiar esto:
   fetch('http://localhost:3001/api/chat', ...)

   // Por esto (ejemplo con Render):
   fetch('https://tu-chatbot.onrender.com/api/chat', ...)
   ```

3. **Configurar variables de entorno** en tu hosting:
   - `OPENAI_API_KEY=tu-api-key`

---

## 🔍 Troubleshooting

### Error: "No se pudo conectar con el servidor"
- Verifica que el servidor esté corriendo en http://localhost:3001
- Ejecuta: `cd server && npm start`

### Error: "Error de autenticación con OpenAI"
- Verifica que tu API Key esté correctamente configurada en `.env`
- Verifica que tengas créditos en tu cuenta de OpenAI

### Error: "Límite de requests excedido"
- Has alcanzado el límite de requests de OpenAI
- Espera unos minutos o verifica tu plan en OpenAI

---

## 💰 Costos de OpenAI

- **gpt-3.5-turbo**: ~$0.002 por 1000 tokens (~750 palabras)
- **gpt-4**: ~$0.03 por 1000 tokens (más caro pero más potente)

Un chat típico usa entre 100-500 tokens por conversación.

---

## 📝 Personalizar el asistente

Para cambiar el comportamiento de Bitu, edita el archivo:
`server/index.js` → línea 29 (el "system prompt")

Ahí puedes:
- Cambiar el tono de las respuestas
- Agregar más información sobre productos
- Ajustar el estilo de comunicación
