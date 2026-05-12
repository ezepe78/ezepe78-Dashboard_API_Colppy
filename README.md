# Control Ejecutivo PyME

**Control Ejecutivo PyME** es una aplicación web full stack tipo dashboard ejecutivo, orientada a directivos de PyMEs argentinas usuarias de Colppy.

El objetivo principal es permitir que un directivo pueda entender el estado del negocio en aproximadamente **30 segundos** y luego profundizar por áreas como ventas, compras, finanzas, contabilidad y estado de datos.

La aplicación consume información desde endpoints externos, procesa archivos tipo Excel/XML binario, normaliza los datos, calcula KPIs, muestra gráficos/tablas ejecutivas y permite exportaciones en PDF/Excel.

---

## 1. Objetivo del proyecto

Crear un panel de control ejecutivo para una PyME argentina que permita visualizar de forma clara:

- Ventas del período.
- Compras del período.
- Resultado estimado.
- Cobranzas.
- Cashflow.
- Presupuesto vs real.
- Estado general del negocio.
- Principales clientes.
- Principales proveedores.
- Información contable y financiera relevante.
- Estado de actualización de datos.

La aplicación está pensada para una experiencia ejecutiva, moderna, minimalista, responsive y preparada como PWA.

---

## 2. Usuario objetivo

El usuario principal es un directivo, dueño, socio, gerente o responsable de una PyME argentina.

El usuario necesita:

- Ver rápidamente cómo está el negocio.
- Evitar navegar reportes complejos.
- Acceder a información consolidada.
- Profundizar cuando detecta algo relevante.
- Exportar información para análisis o presentación.
- Consultar el dashboard desde desktop o mobile.

---

## 3. Alcance del MVP

El MVP incluye:

- Aplicación web full stack.
- Frontend responsive.
- Backend/API routes.
- Protección simple por contraseña global.
- Consumo de endpoints externos con Basic Auth.
- Procesamiento de archivos Excel/XML binario.
- Normalización de datos.
- Cálculo de KPIs.
- Selector global de período.
- Modo claro/oscuro.
- Gráficos interactivos.
- Tablas avanzadas.
- Exportación PDF y Excel.
- Actualización manual de datos.
- Actualización programada por cron/scheduler.
- Caché temporal o archivos del servidor.
- Sección de estado de datos.
- Preparación como PWA.
- Tests básicos.
- Documentación de deploy en Vercel y Hostinger.

No incluye en esta versión:

- Sistema completo de usuarios.
- Roles internos.
- Multiempresa.
- Login con usuario individual.
- Base de datos.
- Alertas ejecutivas configurables.
- Edición de datos desde la app.

---

## 4. Stack técnico

Stack sugerido/requerido:

- **Next.js**
- **TypeScript**
- **React**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**
- **Recharts**
- **TanStack Table**
- **xlsx**
- Librería para exportación PDF
- Librería para exportación Excel
- Tests con Vitest/Jest o alternativa compatible

---

## 5. Endpoints externos

La aplicación consume tres endpoints externos:

```txt
Modelo 1:
http://powerbi.tecnonegocios.com.ar:8000/api/dashboard_data

Modelo 2:
http://powerbi.tecnonegocios.com.ar:8000/api/dashboard_presupuestovsreal

Modelo 3:
http://powerbi.tecnonegocios.com.ar:8000/api/dashboard_cashflow
````

Estos endpoints utilizan **Basic Auth**.

Las llamadas deben realizarse desde el backend de la aplicación, nunca desde el frontend.

---

## 6. Autenticación contra API externa

Los endpoints externos requieren Basic Auth.

Ejemplo de credenciales de prueba:

```txt
Usuario: GABRIEL
Password: 123
Empresa Colppy: 79570
Razón social: PMEDIA HOLDING SRL
```

Las credenciales deben configurarse mediante variables de entorno.

Nunca deben quedar hardcodeadas en el frontend.

---

## 7. Variables de entorno

Crear un archivo `.env.local` en la raíz del proyecto.

Ejemplo:

```env
# Credenciales API Colppy / Power BI
COLPPY_API_USERNAME=GABRIEL
COLPPY_API_PASSWORD=123
COLPPY_COMPANY_ID=79570

# Datos visibles de la empresa
COMPANY_NAME=PMEDIA HOLDING SRL
COMPANY_ID=79570

# Protección simple de acceso a la app
APP_ACCESS_PASSWORD=clave-segura

# Sincronización
SYNC_ENABLED=true
SYNC_CRON_SCHEDULE=0 6 * * *
SYNC_TIMEZONE=America/Argentina/Buenos_Aires
CACHE_TTL_MINUTES=15

# Configuración general
NODE_ENV=development
```

### Descripción de variables

| Variable              | Descripción                                       |
| --------------------- | ------------------------------------------------- |
| `COLPPY_API_USERNAME` | Usuario para Basic Auth de los endpoints externos |
| `COLPPY_API_PASSWORD` | Contraseña para Basic Auth                        |
| `COLPPY_COMPANY_ID`   | ID interno de empresa Colppy                      |
| `COMPANY_NAME`        | Razón social visible en el dashboard              |
| `COMPANY_ID`          | ID visible de empresa                             |
| `APP_ACCESS_PASSWORD` | Contraseña global para acceder al dashboard       |
| `SYNC_ENABLED`        | Activa o desactiva la sincronización automática   |
| `SYNC_CRON_SCHEDULE`  | Expresión cron para actualización programada      |
| `SYNC_TIMEZONE`       | Zona horaria de ejecución                         |
| `CACHE_TTL_MINUTES`   | Tiempo de vida del caché en minutos               |

---

## 8. Protección de acceso

Para el MVP no se implementa un sistema de usuarios ni roles.

Se implementa una protección simple:

* Contraseña global.
* Validación desde backend.
* Cookie segura luego de ingresar correctamente.
* Botón de cierre de sesión.
* Acceso al dashboard de la empresa configurada.

La contraseña se define en:

```env
APP_ACCESS_PASSWORD=clave-segura
```

Esta protección no reemplaza un sistema completo de autenticación, pero evita dejar el dashboard completamente público durante el MVP.

La arquitectura debe quedar preparada para incorporar en el futuro:

* Login real.
* Usuarios.
* Roles.
* Multiempresa.
* Permisos por módulo.
* Auditoría de accesos.

---

## 9. Empresa por instalación

El MVP está pensado para una empresa por instalación.

No hay selector de empresa.

La empresa visible se configura por variables de entorno:

```env
COMPANY_NAME=PMEDIA HOLDING SRL
COMPANY_ID=79570
```

En el encabezado del dashboard debe mostrarse:

```txt
PMEDIA HOLDING SRL · Empresa 79570
```

---

## 10. Formato de datos recibido

Los endpoints externos no devuelven JSON puro.

Devuelven un archivo que debe procesarse como Excel/XML binario.

La aplicación debe:

1. Consultar el endpoint desde backend.
2. Recibir la respuesta como `arrayBuffer` o `buffer`.
3. Parsear el archivo usando `xlsx` o librería compatible.
4. Leer las hojas internas.
5. Convertir cada hoja a JSON.
6. Normalizar columnas y tipos.
7. Guardar la versión procesada en caché/archivo.
8. Servir datos normalizados al frontend.

---

## 11. Hojas esperadas por modelo

### Modelo 1 — `dashboard_data`

```txt
facturasCompra
facturasCompraDetalladas
facturasVenta
facturasVentaDetalladas
clientes
articulos
proveedores
arbolContable
Remitos
```

### Modelo 2 — `dashboard_presupuestovsreal`

```txt
Centros de Costo
Cuentas Diario
Movimientos Diario
Arbol Contable
```

### Modelo 3 — `dashboard_cashflow`

```txt
Arbol Contable
Cuentas Diario
Clientes
Proveedores
Fondos Pagos
Facturas Venta
Facturas Compra
Cobros Factura
```

---

## 12. Módulos de la aplicación

La aplicación debe tener los siguientes módulos:

```txt
Resumen Ejecutivo
Ventas
Compras
Finanzas
Contabilidad
Estado de datos
```

---

## 13. Resumen Ejecutivo

La pantalla inicial debe ser **Resumen Ejecutivo**.

Debe permitir una lectura rápida del negocio en 30 segundos.

Debe incluir:

* Estado general del negocio.
* KPIs principales.
* Ventas del período.
* Compras del período.
* Resultado estimado.
* Cobranzas.
* IVA neto, si se puede calcular.
* Cashflow/caja, si se puede calcular.
* Presupuesto vs real, si aplica.
* Gráficos simples.
* Top clientes.
* Top proveedores.
* Accesos para profundizar por módulo.

---

## 14. Estado general

El dashboard debe mostrar un indicador llamado **Estado general**.

Estados posibles:

```txt
Saludable
Atención
Crítico
```

Para el MVP las reglas pueden quedar fijas en código.

Ejemplo conceptual:

```txt
Estado general: Atención
Motivo: Las ventas son positivas, pero la cobranza del período está por debajo del nivel esperado.
```

Reglas sugeridas:

* **Saludable:** ventas positivas, resultado positivo y cobranza razonable.
* **Atención:** alguna variable relevante muestra deterioro o desvío.
* **Crítico:** resultado negativo, cashflow negativo o cobranza muy baja.

---

## 15. Selector global de período

La aplicación debe tener un selector global de período.

Debe afectar:

* KPIs.
* Gráficos.
* Tablas.
* Exportaciones.
* Resumen Ejecutivo.
* Ventas.
* Compras.
* Finanzas.
* Contabilidad.

Período por defecto:

```txt
Mes actual
```

Rangos rápidos requeridos:

```txt
Últimos 7 días
Últimos 30 días
Mes actual
Trimestre actual
Año actual
Todo el período
```

También debe permitir rango personalizado:

```txt
Fecha desde
Fecha hasta
```

Los endpoints devuelven toda la información, por lo tanto el filtro se aplica dentro de la app.

---

## 16. Formato regional

Toda la app debe estar en español Argentina.

### Fechas

```txt
dd/mm/aaaa
```

### Moneda

```txt
Pesos argentinos
```

### Formato de importes

```txt
$ 1.234.567,89
```

Reglas:

* KPIs ejecutivos: sin centavos.
* Tablas/exportaciones: con dos decimales.
* Gráficos: formato compacto cuando corresponda.

Ejemplos:

```txt
KPI: $ 1.234.568
Tabla: $ 1.234.567,89
Gráfico: $ 1,2 M
```

---

## 17. Módulo Ventas

Debe incluir KPIs como:

* Facturado total.
* Neto gravado.
* Facturas emitidas.
* Ticket promedio.
* Porcentaje cobrado.
* Clientes activos del período.

Debe incluir gráficos como:

* Evolución mensual de ventas.
* Distribución por cliente.
* Ventas por artículo/categoría, si está disponible.
* Estado de cobro de facturas.

Debe incluir tabla de facturas de venta con:

* Fecha.
* Comprobante.
* Cliente.
* Total.
* Neto.
* IVA.
* Estado de cobro, si está disponible.
* Vencimiento, si está disponible.

---

## 18. Módulo Compras

Debe incluir KPIs como:

* Total facturado.
* Neto gravado.
* IVA crédito.
* Facturas recibidas.
* Ticket promedio de compra.
* Principales proveedores.

Debe incluir gráficos como:

* Compras por mes.
* Top proveedores.
* Top categorías de gasto, si se puede inferir.
* Evolución compras vs ventas.

Debe incluir tabla de facturas de compra con:

* Fecha.
* Comprobante.
* Proveedor.
* Total.
* Neto.
* IVA.
* Estado de pago, si está disponible.
* Vencimiento, si está disponible.

---

## 19. Módulo Finanzas

Debe incluir KPIs como:

* Cobros del período.
* Pagos del período.
* Cuentas por cobrar.
* Cuentas por pagar.
* Flujo neto.
* Cashflow estimado/proyectado, si se puede calcular.

Debe incluir gráficos como:

* Flujo de caja mensual.
* Cobros vs pagos.
* Antigüedad de cuentas por cobrar.
* Antigüedad de cuentas por pagar.
* Evolución de saldos, si está disponible.

Debe incluir tablas como:

* Últimos cobros.
* Últimos pagos.
* Facturas pendientes de cobro.
* Facturas pendientes de pago.

---

## 20. Módulo Contabilidad

Debe incluir KPIs como:

* Ingresos.
* Egresos.
* Resultado.
* Resultado presupuestado vs real, si aplica.
* Desvío presupuestario.

Debe incluir gráficos como:

* Estado de resultado.
* Presupuesto vs real.
* Apertura por cuentas contables.
* Evolución mensual.
* Desvíos por centro de costo, si está disponible.

Debe incluir tablas como:

* Movimientos contables.
* Cuentas diario.
* Apertura por cuenta.
* Centros de costo.
* Presupuesto vs real.

---

## 21. Módulo Estado de datos

El módulo **Estado de datos** debe ser visible y de solo lectura.

Debe mostrar:

* Última actualización exitosa.
* Próxima actualización programada.
* Estado del último intento.
* Endpoints consultados.
* Fecha/hora de respuesta por endpoint.
* Tiempo de procesamiento.
* Errores de sincronización, si existieran.
* Botón **Actualizar datos**.
* Mensaje aclaratorio indicando que la frecuencia se configura técnicamente por variables de entorno.

---

## 22. Actualización de datos

La aplicación debe permitir:

* Actualización manual.
* Actualización programada.

La actualización manual se dispara desde el botón:

```txt
Actualizar datos
```

La actualización programada se configura mediante variables de entorno.

Por defecto:

```txt
1 vez por día
```

Endpoint interno sugerido para cron:

```txt
/api/cron/sync-data
```

Endpoint interno sugerido para actualización manual:

```txt
/api/sync
```

Cada sincronización debe:

1. Consultar los tres endpoints externos.
2. Procesar los archivos recibidos.
3. Normalizar los datos.
4. Guardar la versión procesada.
5. Actualizar metadata.
6. Registrar errores si existieran.

---

## 23. Caché y persistencia MVP

Para el MVP no se utiliza base de datos.

Se permite usar:

* Caché temporal.
* Archivos del servidor.

Debe guardarse:

* Datos procesados del Modelo 1.
* Datos procesados del Modelo 2.
* Datos procesados del Modelo 3.
* Metadata de última actualización.
* Estado por endpoint.
* Errores recientes.
* Fecha/hora de respuesta.
* Duración de procesamiento.

Si una actualización falla:

* Mantener la última versión válida.
* Mostrar advertencia.
* No reemplazar datos válidos con datos incompletos.

Si no existe caché previa:

* Mostrar error controlado.
* Permitir reintentar.
* Indicar posible causa: credenciales, conectividad o endpoint no disponible.

---

## 24. Tablas avanzadas

Las tablas principales deben incluir:

* Búsqueda global.
* Ordenamiento por columna.
* Filtros por columna.
* Paginación.
* Formato local de fechas.
* Formato local de importes.
* Exportación a Excel.
* Estados vacíos.
* Diseño responsive.

Al hacer click en una fila:

* En desktop debe abrirse un drawer lateral.
* En mobile debe abrirse un modal o vista de ancho completo.

Debe aplicarse a:

* Facturas de venta.
* Facturas de compra.
* Clientes.
* Proveedores.
* Movimientos financieros.
* Movimientos contables.
* Presupuesto vs real.

---

## 25. Gráficos

Los gráficos deben ser interactivos y responsive.

Deben incluir:

* Tooltips.
* Leyendas.
* Formato de moneda.
* Formato de fechas.
* Estados vacíos.
* Buena lectura en mobile.

Librería sugerida:

```txt
Recharts
```

---

## 26. Exportaciones

La app debe permitir exportar:

* Dashboard general.
* Módulos individuales.

Formatos requeridos:

```txt
PDF
Excel
```

Exportación general:

* Empresa.
* ID empresa.
* Período seleccionado.
* Fecha de emisión.
* KPIs.
* Gráficos principales.
* Tablas resumidas.

Exportación por módulo:

* Resumen Ejecutivo.
* Ventas.
* Compras.
* Finanzas.
* Contabilidad.
* Estado de datos.

Las exportaciones deben respetar el filtro global de período.

---

## 27. Diseño visual

La aplicación debe tener una estética:

* Moderna.
* Minimalista.
* Ejecutiva.
* Premium SaaS.
* Profesional.
* Sobria.
* Mobile-first.
* Responsive.

Debe evitar:

* Pantallas sobrecargadas.
* Exceso de colores.
* Lenguaje técnico innecesario.
* Tablas ilegibles en mobile.
* Gráficos excesivamente complejos.

---

## 28. Modo claro/oscuro

La app debe incluir:

* Modo claro.
* Modo oscuro.
* Modo claro por defecto.
* Selector manual.
* Persistencia de preferencia en navegador.

---

## 29. PWA

La aplicación debe estar preparada como Progressive Web App.

Debe incluir:

* Manifest.
* Metadata.
* Íconos.
* Nombre de app.
* Theme color.
* Soporte responsive.
* Posibilidad de instalación en mobile.

Nombre PWA:

```txt
Control Ejecutivo PyME
```

---

## 30. Manejo de errores

La app debe manejar errores de forma profesional.

Casos a contemplar:

* Endpoint externo caído.
* Basic Auth incorrecto.
* Respuesta vacía.
* Archivo inválido.
* Hoja faltante.
* Columna faltante.
* Error de parsing.
* Error de normalización.
* Error de exportación.
* Caché inexistente.
* Caché vencida.
* Error de cron/scheduler.

La app nunca debe:

* Mostrar pantalla en blanco.
* Inventar datos.
* Mostrar datos mock como reales.
* Exponer credenciales.
* Mostrar errores técnicos crudos al usuario final.

Debe mostrar:

* Mensaje claro.
* Endpoint afectado, si corresponde.
* Fecha/hora del intento.
* Acción recomendada.
* Botón para reintentar cuando aplique.

---

## 31. Estructura sugerida del proyecto

```txt
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    api/
      auth/
        login/
        logout/
        status/
      dashboard/
        route.ts
      sync/
        route.ts
      cron/
        sync-data/
          route.ts
      export/
        pdf/
        excel/
  components/
    layout/
    dashboard/
    charts/
    tables/
    filters/
    export/
    ui/
  features/
    resumen/
    ventas/
    compras/
    finanzas/
    contabilidad/
    estado-datos/
  lib/
    api/
      colppy-client.ts
    auth/
      access-password.ts
    cache/
      file-cache.ts
    excel/
      parser.ts
    normalizers/
      modelo1.ts
      modelo2.ts
      modelo3.ts
    kpis/
      resumen.ts
      ventas.ts
      compras.ts
      finanzas.ts
      contabilidad.ts
    filters/
      period.ts
    formatters/
      currency.ts
      dates.ts
      numbers.ts
    exports/
      pdf.ts
      excel.ts
    scheduler/
      sync.ts
    errors/
      app-error.ts
  types/
    dashboard.ts
    modelo1.ts
    modelo2.ts
    modelo3.ts
    kpis.ts
  tests/
    excel-parser.test.ts
    period-filter.test.ts
    kpis.test.ts
    api-routes.test.ts
```

---

## 32. Instalación local

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
cd control-ejecutivo-pyme
```

Instalar dependencias:

```bash
npm install
```

Crear archivo `.env.local`:

```bash
cp .env.example .env.local
```

Completar las variables de entorno.

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

```txt
http://localhost:3000
```

---

## 33. Scripts sugeridos

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest",
    "test:watch": "vitest --watch"
  }
}
```

---

## 34. Tests

La aplicación debe incluir tests básicos para:

* Parser de Excel.
* Normalización de hojas.
* Filtros por período.
* Cálculo de KPIs.
* Endpoints internos.
* Manejo de errores.
* Protección simple por contraseña.
* Exportaciones básicas si es viable.

Ejecutar tests:

```bash
npm run test
```

---

## 35. Deploy en Vercel

### 1. Crear proyecto

Crear un nuevo proyecto en Vercel conectado al repositorio de GitHub.

### 2. Configurar variables de entorno

En Vercel, ir a:

```txt
Project Settings > Environment Variables
```

Cargar variables como:

```env
COLPPY_API_USERNAME=GABRIEL
COLPPY_API_PASSWORD=123
COLPPY_COMPANY_ID=79570
COMPANY_NAME=PMEDIA HOLDING SRL
COMPANY_ID=79570
APP_ACCESS_PASSWORD=clave-segura
SYNC_ENABLED=true
SYNC_CRON_SCHEDULE=0 6 * * *
SYNC_TIMEZONE=America/Argentina/Buenos_Aires
CACHE_TTL_MINUTES=15
```

### 3. Build

Vercel ejecutará:

```bash
npm install
npm run build
```

### 4. Cron job en Vercel

Configurar cron para llamar al endpoint:

```txt
/api/cron/sync-data
```

Ejemplo conceptual:

```json
{
  "crons": [
    {
      "path": "/api/cron/sync-data",
      "schedule": "0 6 * * *"
    }
  ]
}
```

### 5. Consideración importante sobre archivos en Vercel

Vercel funciona sobre entorno serverless.

La persistencia en filesystem puede ser limitada o temporal.

Para MVP se puede usar caché temporal, pero para producción estable se recomienda migrar la persistencia a:

* Vercel KV.
* Vercel Blob.
* Supabase.
* Neon.
* PostgreSQL.
* S3 compatible.
* Otro storage persistente.

---

## 36. Deploy en Hostinger

Para desplegar en Hostinger, se recomienda usar un plan compatible con Node.js.

### Pasos generales

1. Subir el repositorio o archivos del proyecto.
2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env` o configurar variables desde el panel.
4. Ejecutar build:

```bash
npm run build
```

5. Iniciar servidor:

```bash
npm run start
```

6. Configurar dominio.
7. Configurar cron job para llamar a:

```txt
https://tu-dominio.com/api/cron/sync-data
```

### Cron sugerido

Ejemplo para una ejecución diaria a las 06:00:

```bash
0 6 * * * curl -X GET https://tu-dominio.com/api/cron/sync-data
```

### Consideración sobre persistencia

En Hostinger, si el plan permite filesystem persistente, se pueden guardar temporalmente archivos normalizados.

Para producción robusta, evaluar migrar a base de datos o storage persistente.

---

## 37. Troubleshooting

### El dashboard muestra error de autenticación

Revisar:

* `COLPPY_API_USERNAME`
* `COLPPY_API_PASSWORD`
* Disponibilidad de endpoints externos
* Configuración de Basic Auth

### No se muestran datos

Revisar:

* Que los endpoints respondan correctamente.
* Que la respuesta se esté procesando como archivo binario.
* Que las hojas esperadas existan.
* Que haya datos dentro del período seleccionado.
* Logs del servidor.

### Las fechas no filtran correctamente

Revisar:

* Formato de fecha recibido desde Excel.
* Conversión de fechas tipo número serial Excel.
* Campos de fecha usados por cada normalizador.
* Selector global de período.

### Los importes aparecen mal

Revisar:

* Separadores decimales.
* Separadores de miles.
* Conversión de texto a número.
* Signos negativos.
* Campos vacíos.

### La exportación falla

Revisar:

* Que existan datos filtrados.
* Que el módulo tenga información.
* Que la librería PDF/Excel esté correctamente instalada.
* Logs del endpoint de exportación.

### El cron no se ejecuta

Revisar:

* Configuración del proveedor.
* Ruta `/api/cron/sync-data`.
* Variables `SYNC_ENABLED` y `SYNC_CRON_SCHEDULE`.
* Logs de ejecución.

---

## 38. Seguridad

Buenas prácticas mínimas:

* No exponer credenciales en frontend.
* Usar variables de entorno.
* Validar acceso con contraseña global.
* Usar cookies seguras.
* No loguear contraseñas.
* No exponer archivos crudos descargados desde endpoints externos.
* Sanitizar errores visibles al usuario.
* Mantener logs técnicos del lado servidor.

---

## 39. Criterios de aceptación

La aplicación se considera lista para MVP si cumple:

1. Levanta localmente con `npm install` y `npm run dev`.
2. Solicita contraseña global al ingresar.
3. Valida acceso sin sistema de usuarios.
4. Consume los tres endpoints externos desde backend.
5. Usa Basic Auth sin exponer credenciales.
6. Procesa respuestas tipo Excel/XML binario.
7. Lee y normaliza las hojas esperadas.
8. Muestra Resumen Ejecutivo al ingresar.
9. Tiene selector global de período.
10. El período por defecto es mes actual.
11. Muestra KPIs con formato argentino.
12. Tiene gráficos responsive e interactivos.
13. Tiene tablas con búsqueda, ordenamiento, filtros y paginación.
14. Permite abrir detalle desde filas de tablas.
15. Tiene modo claro/oscuro.
16. Está preparada como PWA.
17. Permite exportar PDF y Excel.
18. Tiene botón “Actualizar datos”.
19. Tiene sección “Estado de datos”.
20. Maneja errores sin inventar información.
21. Conserva última versión válida si falla una actualización.
22. Incluye README completo.
23. Incluye tests básicos.
24. Incluye instrucciones para deploy en Vercel y Hostinger.

---

## 40. Evolución futura

Posibles mejoras posteriores al MVP:

* Login real.
* Gestión de usuarios.
* Roles y permisos.
* Multiempresa.
* Base de datos persistente.
* Historial de sincronizaciones.
* Alertas ejecutivas configurables.
* Notificaciones por email o WhatsApp.
* Comparativos interanuales.
* Forecast financiero.
* Integración directa con más endpoints de Colppy.
* Auditoría de accesos.
* Panel administrativo.
* Configuración visual por empresa.
* Branding personalizado.

```
```
