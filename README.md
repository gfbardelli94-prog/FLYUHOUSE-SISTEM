# FLYHOUSE — Property Service

Sistema web (SPA) en un solo archivo: Store, Rental, Life, Presupuestos, Requerimientos, Contratos, CRM.

## Subir a Vercel (con GitHub)

1. Crea un repositorio en GitHub (ejemplo: `flyhouse`).
2. Sube **todos** los archivos de esta carpeta a la **raíz** del repo:
   - `index.html`
   - `vercel.json`
   - `README.md`
3. Entra a https://vercel.com → inicia sesión con GitHub.
4. **Add New Project** → selecciona el repo `flyhouse` → **Deploy**.
5. Copia el link que te da Vercel (ej. `https://flyhouse.vercel.app`).

### Actualizar
- Sustituye `index.html` en GitHub (Upload o commit) y Vercel republica solo.

## Usuario Master (por defecto)
- Usuario: **Gianfranco**
- PIN: **1212**

## Presupuestos online
Al pulsar **Copiar link cliente**, el enlace incluye los datos del presupuesto para que el cliente pueda abrirlo en cualquier dispositivo (sin necesitar tu misma PC).

Notas:
- Fotos muy pesadas pueden no viajar en el link (límite de URL). Usa imágenes comprimidas.
- La data del panel (contratos, catálogo, etc.) se guarda en el **navegador** de cada persona (localStorage). No es una base de datos compartida entre todos los usuarios todavía.

## Abrir en local
Abre `index.html` en Chrome/Edge (doble clic o Live Server).
