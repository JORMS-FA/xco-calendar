# XCO Calendar Coach

Web app estatica para planificar, editar y consultar un calendario XCO con chat coach.

## Publicacion

Este proyecto esta preparado para GitHub Pages. El archivo principal es `index.html`.

## IA

La app puede conectarse a Ollama Cloud API u OpenAI desde Ajustes IA. No subas archivos con API keys al repositorio.

### Ollama Cloud en GitHub Pages

GitHub Pages corre en el navegador. Si llamas directamente a `https://ollama.com/api/chat`, el navegador puede bloquear la solicitud por CORS y mostrar `Failed to fetch`.

Usa el archivo `cloudflare-worker.js` como proxy:

1. Crea un Worker en Cloudflare.
2. Pega el contenido de `cloudflare-worker.js`.
3. Agrega un secreto llamado `OLLAMA_API_KEY` con tu API key de Ollama.
4. Publica el Worker.
5. En la app, abre Ajustes IA y usa la URL del Worker, por ejemplo `https://xco-ollama-proxy.tuusuario.workers.dev`.
6. Deja vacio el campo API key en la app si el Worker ya tiene el secreto.
