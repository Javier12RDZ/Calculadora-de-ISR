# Resumen de Cambios - 20 de Noviembre de 2025

Hoy se trabajó en la integración de Google AdSense en la calculadora fiscal para permitir la monetización del sitio.

## 1. Configuración Inicial de Google AdSense

-   **Integración del script de AdSense:** Se añadió el script principal de Google AdSense en el `<head>` del archivo `index.html`. Este script carga la librería necesaria para mostrar los anuncios.
    -   Se usó el ID de editor proporcionado por Google AdSense (`ca-pub-8650238416383621`).
-   **Creación de un placeholder para la unidad de anuncio:** Se insertó un espacio para un anuncio (elemento `<ins>`) en `App.tsx`, específicamente en la columna de resultados, justo antes de la sección de estadísticas.
    -   Inicialmente se usó un placeholder para el ID del espacio publicitario (`YOUR_ADSENSE_AD_SLOT_ID`).

## 2. Aclaración entre Google Ads y Google AdSense

-   Se identificó una confusión entre Google Ads (para anunciantes que pagan por publicidad) y Google AdSense (para editores que ganan dinero mostrando anuncios). Se aclaró esta diferencia al usuario.

## 3. Resolución de Problemas de Verificación y Despliegue

-   **Verificación del sitio fallida:** Se diagnosticó que la verificación inicial falló porque los cambios locales no se habían desplegado al sitio en vivo.
-   **Actualización del repositorio de GitHub:** Se guio al usuario para:
    -   Hacer `git add .` para preparar los archivos modificados (`index.html`, `App.tsx`).
    -   Hacer `git commit -m "Configure AdSense verification code"` para guardar los cambios localmente.
    -   Resolver un conflicto de "pull antes de push" (`git pull`) y finalmente hacer `git push` para enviar los cambios al repositorio remoto en GitHub.
-   **Verificación del sitio exitosa:** Tras el despliegue automático de Vercel, el sitio fue verificado exitosamente por Google AdSense.

## 4. Configuración Final de la Unidad de Anuncio

-   **Actualización del ID del espacio publicitario:** Se reemplazó el placeholder `YOUR_ADSENSE_AD_SLOT_ID` en `App.tsx` con el ID real de la unidad de anuncio proporcionado por el usuario (`4125717924`).
-   **Despliegue final:** Se guio al usuario para:
    -   Hacer `git add App.tsx`.
    -   Hacer `git commit -m "feat: Add AdSense ad slot ID"`.
    -   Hacer `git push` para actualizar el sitio en vivo con la unidad de anuncio configurada.

Con estos pasos, el código está listo para que el sitio muestre anuncios de AdSense una vez que Google complete la revisión y aprobación final del mismo.

# Resumen de Cambios - 26 de Noviembre de 2025

## Corrección Técnica en AdSense

-   **Problema:** La implementación anterior usaba una etiqueta `<script>` dentro del JSX (`App.tsx`), la cual React no ejecuta, dejando el espacio publicitario vacío e invisible para Google.
-   **Solución:**
    -   Se eliminó la etiqueta `<script>` inline.
    -   Se implementó un `useEffect` para invocar `(window.adsbygoogle || []).push({})` después de que el componente se monta.
    -   Se añadieron atributos `data-ad-format="auto"` y `data-full-width-responsive="true"` a la etiqueta `<ins>` para mejorar la visualización.

# Resumen de Cambios - 30 de Noviembre de 2025

Hoy se abordaron y resolvieron varias advertencias y errores reportados en la consola del navegador.

## 1. Resolución de Errores y Advertencias en Consola

-   **ERR_BLOCKED_BY_CLIENT (AdSense y Analytics):**
    -   Se explicó que estas advertencias no son errores de código, sino que son causadas por bloqueadores de anuncios o configuraciones de privacidad del navegador del usuario.
    -   Se recomendó probar en modo incógnito para verificar su funcionamiento en un entorno sin bloqueadores.
-   **Advertencia de Tailwind CSS CDN en Producción:**
    -   Se informó que esta advertencia aparece porque Tailwind CSS se está cargando a través de un CDN, lo cual es subóptimo para entornos de producción.
    -   Se indicó que, aunque no es un error crítico, para optimizar el rendimiento, se debería instalar Tailwind CSS como una dependencia del proyecto.
-   **404 (Not Found) para /index.css:**
    -   Se identificó que el archivo `index.css` no existía y estaba siendo referenciado en `index.html`.
    -   **Acción:** Se eliminó la línea `<link rel="stylesheet" href="/index.css">` de `index.html` para resolver este error 404.

## 2. Actualización del Repositorio de GitHub

-   **Acción:** Se añadieron (`git add`) los cambios realizados en `index.html`.
-   **Acción:** Se realizó un commit con el mensaje "Fix 404 error by removing reference to missing index.css".
-   **Acción:** Se subieron (`git push`) los cambios a la rama `master` del repositorio remoto.

# Resumen de Cambios - 3 de Diciembre de 2025

Hoy se trabajó en la resolución de un problema de construcción en el proyecto de Android y se creó la versión APK con su imagen.

# Resumen de Cambios - 4 de Diciembre de 2025

Hoy se trabajó en la preparación de la aplicación Android para su publicación en Google Play Store.

## 1. Preparación de Recursos Visuales

-   **Confirmación de ID de Aplicación:** Se verificó que el `appId` en `capacitor.config.ts` (`com.nominamx.calculadora`) es único y apto para la publicación.
-   **Configuración de Icono y Splash Screen:** La imagen `Gemini_Generated_Image_ta7wvita7wvita7w.png` se copió a la carpeta `assets` del proyecto Capacitor (`Version_APK/assets/icon.png` y `Version_APK/assets/splash.png`).
-   **Generación de Recursos Android:** Se utilizaron las herramientas de `@capacitor/assets` (`npx @capacitor/assets generate --android`) para generar automáticamente todos los tamaños de iconos adaptativos y splash screens necesarios para Android.

## 2. Generación del Android App Bundle (AAB)

-   **Creación de Keystore:** Se guió al usuario a través de Android Studio para crear una nueva llave de firma (`upload-keystore.jks`), un paso crucial para la seguridad y futuras actualizaciones de la aplicación.
-   **Compilación del AAB:** Se generó exitosamente el archivo `app-release.aab` a través de Android Studio (Build > Generate Signed Bundle / APK), el formato requerido por Google Play Store para nuevas aplicaciones.
-   **Ubicación del AAB:** El archivo final listo para subir se encuentra en `C:\Users\noroe\OneDrive\Documentos\Proyectos-web\nominamx_calculadora_fiscal\Version_APK\android\app\build\outputs\bundle\release\app-release.aab`.

## 3. Próximos Pasos para la Publicación en Google Play Store

-   Subir el `app-release.aab` a la Google Play Console.
-   Completar la información de la ficha de la aplicación (título, descripción, capturas de pantalla, política de privacidad, etc.).

# Resumen de Cambios - 5 de Diciembre de 2025

## Inicio del Proceso de Publicación en Play Store

-   **Cuenta de Desarrollador:** El usuario confirmó la creación de su cuenta en Google Play Console.
-   **Localización del AAB:** Se rastreó y confirmó la ubicación del archivo para subir: `C:\Users\noroe\OneDrive\Documentos\Proyectos-web\nominamx_calculadora_fiscal\Version_APK\android\app\release\app-release.aab`.
-   **Estado Actual:** El usuario detuvo el proceso antes de subir el archivo por ser tarde.
-   **Siguientes Pasos Pendientes:**
    -   Subir el archivo `.aab` a la sección "Producción" en Play Console.
    -   Generar/Enlazar la Política de Privacidad.
    -   Completar la Ficha de la Play Store (Descripciones, imágenes).

# Resumen de Cambios - 6 de Diciembre de 2025

## Problemas con la Publicación en Google Play Store

-   **Problema:** Al intentar crear una versión de prueba interna, se encontró un error que impide la publicación: "Hay problemas con tu cuenta, lo que significa que no puedes publicar los cambios en tu app ni enviarlos para su revisión".
-   **Causa Identificada:** El usuario no ha completado la verificación de identidad de su cuenta de desarrollador en Google Play Console.
-   **Acciones Pendientes:** Es necesario completar el proceso de verificación de identidad de la cuenta en Google Play Console antes de poder proceder con cualquier tipo de publicación o prueba de la aplicación. El proceso de publicación queda pausado hasta que la cuenta sea verificada.

# Resumen de Cambios - 9 de Diciembre de 2025

Hoy se trabajó en la preparación de la ficha de la aplicación para Google Play Store y la resolución de un error de permisos.

## 1. Política de Privacidad

-   Se creó el archivo `privacy_policy.md` con una plantilla de política de privacidad.
-   Se generó y subió `privacy_policy.html` a la carpeta `public` de la versión web del proyecto (`nominamx_calculadora_fiscal/Version_web/public/privacy_policy.html`) y se hizo `git push` para su despliegue, obteniendo una URL pública para la política.

## 2. Configuración de la Ficha en Google Play Store

-   **Declaración de Anuncios:** Se confirmó que la app "contiene anuncios" debido a la integración de Google AdSense.
-   **Declaración de ID de Publicidad:** Se indicó que la app "usa un ID de publicidad" y que la razón es "Publicidad o marketing".
-   **Etiquetas:** Se recomendaron las etiquetas "Finanzas", "Herramientas", "Productividad", "Empresa" y "Educación".
-   **Textos de la Ficha:** Se proporcionaron textos optimizados para el nombre (título), descripción breve y descripción completa de la app.
-   **Gráficos:** Se subió el `icon.png` existente y se generó un `feature_graphic.png` (placeholder azul) de 1024x500 píxeles para cumplir con los requisitos.

## 3. Resolución de Error de Permiso (ID de Publicidad)

-   **Problema:** Al intentar iniciar la prueba interna, la Play Console arrojó un error indicando la falta del permiso `com.google.android.gms.permission.AD_ID` en el `AndroidManifest.xml` de la aplicación Android.
-   **Solución:** Se añadió manualmente la línea `<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>` al archivo `C:\Users\noroe\OneDrive\Documentos\Proyectos-web\nominamx_calculadora_fiscal\Version_APK\android\app\src\main\AndroidManifest.xml`.
-   **Acción Pendiente:** Debido a un error con la configuración de `JAVA_HOME` en el entorno de línea de comandos, se instruyó al usuario a **generar un nuevo Android App Bundle (AAB) desde Android Studio** para que el cambio de permiso se aplique correctamente. Este nuevo AAB deberá subirse a la Play Console para resolver el error y poder continuar con la prueba interna.

# Resumen de Cambios - 10 de Diciembre de 2025

## Problemas de Firma (Keystore) y Google Play Console

- **Pérdida de Contraseña del Keystore:**
    - Al intentar generar el nuevo AAB para corregir el permiso `AD_ID`, se produjo un error `javax.crypto.BadPaddingException`, indicando que la contraseña del `upload-keystore` original era incorrecta y no se pudo recuperar.
- **Creación de Nueva Llave:**
    - Se generó un nuevo archivo de claves: `nuevo-keystore` en la carpeta `Version_APK`.
    - Se generó exitosamente un nuevo Android App Bundle (AAB) firmado con esta nueva llave.
- **Error de Coincidencia de Firmas en Play Store:**
    - Al intentar subir el nuevo AAB a la Google Play Console, fue rechazado con un error de validación de firma (SHA1 mismatch).
    - **Causa:** Google Play ya había registrado la huella digital del primer `upload-keystore` (cuya contraseña se perdió) y rechaza cualquier actualización firmada con una llave diferente.
- **Siguientes Pasos (Bloqueante):**
    - Es necesario generar un certificado `.pem` de la nueva llave (`nuevo-keystore`).
    - Solicitar un **"Restablecimiento de clave de subida" (Upload Key Reset)** dentro de la sección "Integridad de la app" en Google Play Console.
    - Esperar la aprobación de Google (24-48 horas) para poder subir el nuevo AAB.

# Resumen de Cambios - 15 de Diciembre de 2025

## Generación de Certificado para Restablecimiento de Clave

-   **Identificación del Alias:** Se utilizó `keytool` (desde Android Studio) para inspeccionar `upload-keystore2` y se confirmó que el alias de la llave es **`key0`** (no `NominaMX`).
-   **Generación del PEM:** Se ejecutó exitosamente el comando para exportar el certificado:
    -   Archivo generado: `nominamx_calculadora_fiscal\Version_APK\upload-key.pem`.

# Resumen de Cambios - 12 de Abril de 2026

Hoy se realizaron actualizaciones importantes para el ejercicio fiscal 2026 y nuevas funcionalidades de análisis.

## 1. Actualización Fiscal 2026
- **Tablas ISR 2026:** Se actualizaron las tablas mensuales de ISR en `constants.ts` (manteniendo las bases de 2025 conforme a la normativa vigente).
- **Valores UMA 2026:** Se actualizó el valor de la UMA a un estimado de **$117.67 diarios** y **$3,577.17 mensuales**.
- **Título del Sitio:** Se actualizó el título y las descripciones en `index.html` y `App.tsx` para reflejar el año 2026.

## 2. Nueva Funcionalidad: Comparativa de Ofertas
- **Módulo de Comparación:** Se implementó un sistema que permite al usuario "guardar" el cálculo actual para compararlo con otras ofertas laborales.
- **Tabla Comparativa:** Se añadió una sección dinámica que muestra las diferencias en Sueldo Bruto, ISR, Otras Deducciones y Sueldo Neto entre las distintas opciones guardadas.

## 3. Mejora en Deducciones: Multi-Deducción
- **Otras Deducciones Dinámicas:** Se eliminó el campo único de "Otras Deducciones" y se reemplazó por un sistema de lista.
- **Gestión de Lista:** Ahora el usuario puede añadir múltiples deducciones personalizadas (ej. Seguro, Préstamo, Infonavit) con etiquetas individuales y montos específicos.
- **Interfaz Mejorada:** Se integró un estilo "minimal" en `CurrencyInput` para una mejor visualización de la lista de deducciones.

## 4. Sincronización Móvil (Android)
- **Build y Sync:** Se generó la nueva versión de producción (`npm run build`) y se sincronizó con el proyecto de Capacitor en `Version_APK` (`npx cap sync android`), permitiendo que todos los cambios (2026, comparativa y multi-deducciones) estén disponibles inmediatamente en la aplicación Android.

## 5. Corrección de Errores (Hotfix)
- **Fix Pantalla en Blanco:** Se corrigió un error crítico en `DonutChart.tsx` donde la aplicación se bloqueaba al intentar desestructurar `viewBox` cuando era indefinido. Se añadió una validación de nulidad.
- **Sincronización de Datos en Gráfico:** Se actualizó la lógica del gráfico para que reconozca el nuevo campo `otherDeductionsTotal` (Multi-deducción), evitando fallos visuales.
- **Notas de Consola:** Se identificaron advertencias de AdSense/Analytics (bloqueados por navegador) y Tailwind CDN (uso recomendado de PostCSS en producción) que no afectan la funcionalidad básica pero se consideran para futuras optimizaciones.

## Próximos Pasos (Pendientes)
- **Subida a la Web:** Desplegar la nueva versión de producción en el hosting web (GitHub Pages o similar).
- **Compilación de App:** Abrir el proyecto en Android Studio para generar el nuevo archivo APK/AAB firmado y subirlo a la Google Play Console.