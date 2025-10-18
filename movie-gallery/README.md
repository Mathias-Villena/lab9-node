🎬 Galería de Películas – Next.js

Proyecto hecho con Next.js + Tailwind + Axios, que muestra una galería de películas usando la API de OMDb.
Incluye renderizado del lado del servidor (SSR) y del cliente (CSR).

🚀 Cómo ejecutar

Instala dependencias:

npm install


Cree el archivo .env.local en la raíz del proyecto:

NEXT_PUBLIC_OMDB_API_KEY=miapikey


Inicia el servidor:

npm run dev


Abre en el navegador:
👉 http://localhost:3000

🧭 Navegación del proyecto

/ → Página principal (SSR): muestra películas populares desde el servidor.

/search → Página de búsqueda (CSR): resultados en tiempo real sin recargar.

Modal → Detalle de película: se abre al hacer clic en una tarjeta.

💡 Tecnologías: Next.js 15, React 18, Tailwind CSS, Axios, OMDb API.
👨‍💻 Autor: Mathias Villena – TECSUP