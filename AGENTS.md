# porta-hilue

Portafolio artístico de una actriz. SPA de una sola página, contenido en español, tema oscuro.

## Qué es

Sitio estático de presentación: portada, biografía, grid de muestras de teatro, galería de fotos y datos de contacto. Sin backend, sin login, sin llamadas a la API. Todo el texto y las URLs de imágenes salen de un único JSON.

## Stack

| | |
|---|---|
| React | 19.1 (JSX, JavaScript puro) |
| Vite | 7.1 |
| Estilos | CSS Modules, sin framework CSS ni preprocesador |
| Iconos | `lucide-react` (única dependencia de runtime, además de React) |
| Lint | ESLint 9 flat config + `react-hooks` + `react-refresh` |

**JavaScript, no TypeScript.** No hay `tsconfig.json` ni tipos. Es una decisión deliberada: no introduzcas TS sin que lo pida explícitamente.

Node ≥ 20.19 (requisito de Vite 7).

## Comandos

```bash
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # build de producción a dist/
npm run preview   # sirve el build de producción
npm run lint      # ESLint — debe quedar en verde
```

No hay tests, ni formatter. `npm run lint` y `npm run build` son la verificación local; el CI corre ambos antes de publicar.

## Despliegue

GitHub Pages vía GitHub Actions. Cada push a `main` dispara `.github/workflows/deploy.yml`, que hace `npm ci` → `lint` → `build` → publica `dist/`.

- `base` en `vite.config.js` es `/porta-hilue/`, que corresponde al nombre del repositorio. **Cambiar el nombre del repo en GitHub obliga a cambiar ese `base`**, o todos los assets dan 404. Con dominio propio, `base` pasa a ser `'/'`.
- El workflow corre `npm run lint`: un error de ESLint bloquea el despliegue.
- `public/.nojekyll` evita que Jekyll interprete los archivos del build.
- La navegación es por anclas `#id`, no hay router, así que no hace falta `404.html` de fallback SPA.
- `VITE_BASE` sobreescribe el `base` en el build, por si se necesita una URL distinta.

## Estructura

```
index.html              Shell; también contiene el SEO (title, description, OG, theme-color)
vite.config.js          Plugin de React + `base` para GitHub Pages
eslint.config.js        Flat config; ignora dist/
.github/workflows/      deploy.yml: build + publish a GitHub Pages en cada push a main
data/
  data.json             ÚNICA fuente de contenido (bio, contacto, proyectos, fotos)
  logo.png              Logo del nav
src/
  main.jsx              Punto de entrada: createRoot + StrictMode
  index.css             Reset global + TOKENS DE DISEÑO (única fuente de color y layout)
  App.jsx               Composition root. Sólo compone secciones, sin lógica
  Components/           Reutilizables. Nombres en inglés
    Cards/              Card de proyecto con carrusel de imágenes
    NavBar/             Nav fija, scroll spy, menú móvil
    SmartImage/         <img> con srcset, lazy, decoding y fallback de error
  Sections/             Bloques de la página. Nombres en español
    Portada/  AboutMe/  Muestras/  Book/  Contacto/
```

Cada carpeta de componente o sección es `Nombre/Nombre.jsx` + `Nombre.module.css`. El CSS se importa con `styles` y se accede por clave: `className={styles.algo}`.

## Reglas de datos

`data.json` es la fuente de verdad. Para cambiar textos o fotos, edita el JSON; no toques los componentes.

**`data.contacto`** — iterar sus claves genera las tarjetas de `Contacto.jsx`. `ICONS` y `LABELS` en ese archivo están indexados por clave: **si agregás una clave al JSON sin añadirla a ambos mapas, `Icono` queda `undefined` y React revienta en runtime.** No hay validación que lo atrape.

**`data.proyectos[]`** — todos los campos son opcionales: `tipo`, `lugar`, `colectivo`, `institucion`, `duracion`, `direccion`, `fotografo`, `fecha`, `imagenes[]`. La constante `CAMPOS` en `Cards.jsx` define cuáles se pintan y con qué etiqueta. `titulo` se usa como `key` de React y `imagenes` alimenta el carrusel.

**`data.fotos[]`** — array plano de URLs, se renderiza como masonry.

## Imágenes

Están hotlinked desde Flickr (`live.staticflickr.com`). **Nunca escribas un `<img>` crudo**: usá `SmartImage`, que genera `srcset` variando el sufijo de tamaño de Flickr (`_n` 320w, `_z` 640w, `_c` 800w, `_b` 1024w, `_h` 1600w) y añade `loading="lazy"`, `decoding="async"` y un placeholder si la carga falla.

```jsx
<SmartImage
  src={url}
  alt="Descripción real"          // obligatorio
  sizes="(max-width: 640px) 100vw, 33vw"   // obligatorio: sin esto el srcset no sirve
  maxWidth={1024}                 // ancho máximo a generar
  priority                         // sólo para la imagen LCP (la portada)
  className={styles.miClase}
/>
```

## Diseño

Tokens en `src/index.css`, consumidos como `var(--nombre)` desde los CSS Modules:

| Token | Uso |
|---|---|
| `--bg-color` | Fondo de página |
| `--bg-secondary-color` | Tarjetas y superficies elevadas |
| `--text-color` | Texto principal |
| `--text-secondary-color` | Acento: títulos, etiquetas, hover |
| `--primary-color` / `--secondary-color` | Morados, para degradados y sombras |
| `--nav-height` | Alto de la nav. **La lee también JS** vía `getComputedStyle` |
| `--gutter` | Padding lateral de todas las secciones |

Reglas transversales:

- **Una sola fuente de verdad de estilos globales.** `index.css` es el único stylesheet no-module. No crees otro, ni reintroduzcas un `App.css` con tokens duplicados.
- **Todo en `clamp()` o `minmax(min(100%, X), Y)`.** Los anchos fijos en `px` y las fuentes fijas rompen el diseño; es el motivo principal por el que se rehízo el responsive.
- **Secciones:** `padding: calc(var(--nav-height) + 4rem) var(--gutter) 5rem` + `scroll-margin-top: var(--nav-height)`, porque la nav es `position: fixed`.
- **Nunca `100vw`** para ancho de sección: ignora el `scrollbar` y genera scroll horizontal. Usa `100%` con `box-sizing: border-box` global.
- **Grid:** siempre `minmax(0, 1fr)`, no `1fr`, para que un hijo con contenido largo no desborde la columna.
- **Altura de la portada:** `100svh` con fallback a `100vh`, por la barra de direcciones de los móviles.

Breakpoints: `900px` (nav a menú hamburguesa, en JS *y* CSS deben coincidir), `1024px` (AboutMe a una columna, masonry a 2), `640px` (masonry a 1, texto justificado a alineado a la izquierda).

## Contratos internos

Cambiar cualquiera de estos rompe otra cosa; actualízalos juntos.

- **IDs de sección** (`index.html` no, pero sí el DOM): `welcome`, `about`, `muestras`, `book`, `contacto`. Son el contrato entre el atributo `id` de cada `<section>` y el mapa `LABELS` de `NavBar.jsx`. Una sección sin entrada en `LABELS` no aparece en el nav; una entrada en `LABELS` sin sección correspondiente simplemente nunca se activa. `NavBar` deriva el **orden** de los enlaces del DOM real, así que reordenar las secciones en `App.jsx` reordena el nav automáticamente.
- **`--nav-height`** debe coincidir con el `height: var(--nav-height)` de `NavBar.module.css`, porque el `IntersectionObserver` del scroll spy lo lee para calcular su `rootMargin`.

## Accesibilidad

- Iconos decorativos: `aria-hidden="true"`. Iconos con texto asociado: sin `aria-hidden`.
- Controles de puntero: `<button type="button">`. Nada de `<span onClick>`.
- Áreas táctiles mínimo 44×44px.
- Se respeta `prefers-reduced-motion`, globalmente en `index.css` y también en JS (`usePrefersReducedMotion` en `Cards.jsx`, que desactiva el autoplay del carrusel).

## Convenciones

- Comentarios y textos de UI en **español**; identificadores y nombres de archivo en **inglés** dentro de `Components/`, **español** en `Sections/`. Es la convención que ya existe, no la unifiques por tu cuenta.
- Sin librerías nuevas sin necesidad. El proyecto es deliberadamente mínimo: si algo se puede resolver con el DOM o CSS, se resuelve así.
- Sin `useState`/`useEffect` para leer datos estáticos importados: `data.proyectos` directamente, no copiado a estado. Ese patrón ya se eliminó de todo el proyecto.
- Las fotos son de una persona real y `data.json` expone email y teléfono. No los hardcodees en componentes ni los muevas a variables de entorno: es un sitio público de contacto.

## Pendientes conocidos

- El favicon sigue siendo el logo de Vite (`public/vite.svg`).
- `README.md` es el template de Vite sin personalizar.
- `data/logo.png` es un PNG; el resto de iconos son SVG.
