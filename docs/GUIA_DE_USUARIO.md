# Guía del Propietario - Portal de Clientes y Administración

## Inicio Rápido

Esta plataforma incluye:
- **Sitio web público** - Landing page para captar leads
- **Portal de Clientes** (`/portal`) - Donde sus clientes suben documentos y ven contratos
- **Panel de Administración** (`/admin`) - Donde usted gestiona leads, clientes y documentos

---

## Panel de Administración

### Acceso Inicial

El primer administrador se configura durante la instalación. Para acceder:

1. Vaya a `/login`
2. Ingrese su correo y contraseña de administrador
3. Será redirigido automáticamente al panel de administración

### Dashboard

Vista general con estadísticas de:
- Leads nuevos y totales
- Clientes activos
- Documentos pendientes de revisión

### Gestión de Leads

**Leads** → Lista de prospectos captados desde el formulario de contacto.

| Acción | Descripción |
|--------|-------------|
| Ver | Información completa del lead |
| Editar | Actualizar datos o notas |
| Cambiar estado | Nuevo → Contactado → Calificado → Convertido |
| Eliminar | Eliminar lead del sistema |

### Gestión de Clientes

**Clientes** → Lista de clientes registrados en el portal.

Para cada cliente puede:
- Ver perfil completo
- Crear y gestionar contratos
- Revisar documentos subidos
- Cambiar estado (Activo/Inactivo)

### Revisión de Documentos

**Documentos** → Todos los documentos subidos por clientes.

Para cada documento:
1. Haga clic en **"Ver"** para abrir el archivo
2. Revise el contenido
3. Actualice el estado: **Aprobar** o **Rechazar**
4. Agregue notas si es necesario

### Invitar Administradores

**Configuración** → Equipo Administrador

1. Clic en **"Invitar"**
2. Ingrese el correo del nuevo administrador
3. Opcionalmente agregue su nombre
4. Clic en **"Enviar Invitación"**

El invitado recibirá un correo con enlace para crear su contraseña.

---

## Portal de Clientes

Sus clientes acceden a `/portal` para:

### Registro
- Crean cuenta con correo y contraseña
- Completan su perfil (nombre, empresa, teléfono)
- Seleccionan su rango de gasto mensual en electricidad

### Funcionalidades
- **Dashboard** - Resumen de contratos y documentos
- **Contratos** - Ver y descargar contratos asignados
- **Documentos** - Subir archivos requeridos (PDF, imágenes, Word, Excel - máx 10MB)

### Estados de Documentos
| Estado | Significado |
|--------|-------------|
| Pendiente | Esperando revisión por administrador |
| Aprobado | Documento aceptado |
| Rechazado | Documento rechazado (cliente debe subir otro) |

---

## Personalización

### Información de Contacto

Actualice estos valores en el código para reflejar su empresa:

| Ubicación | Qué cambiar |
|-----------|-------------|
| `app/layout.tsx` | Título del sitio y metadatos |
| `components/Footer.tsx` | Datos de contacto, dirección, redes sociales |
| `components/ContactForm.tsx` | Correo de destino para formulario |
| Variables de entorno | `EMAIL_FROM`, `ADMIN_EMAIL` |

### Colores y Marca

Los colores se definen en `tailwind.config.ts`:
- `canvas` - Colores de fondo
- `ink` - Colores de texto
- `highlight` - Color primario
- `accent-gold` - Color de acento

---

## Mantenimiento

### Tareas Regulares

| Frecuencia | Tarea |
|------------|-------|
| Diario | Revisar leads nuevos y documentos pendientes |
| Semanal | Dar seguimiento a leads contactados |
| Mensual | Revisar clientes inactivos |

### Recuperación de Contraseña

Si un usuario olvida su contraseña:
1. El usuario accede a **"¿Olvidaste tu contraseña?"**
2. Ingresa su correo
3. Recibe enlace de recuperación (válido por 1 hora)
4. Crea nueva contraseña

**Nota:** Como administrador, no puede restablecer contraseñas de otros usuarios directamente. Ellos deben usar el proceso de recuperación.

---

## Soporte Técnico

Para problemas técnicos con la plataforma, contacte a su proveedor de software.

Para configuración de servidores y base de datos, consulte la documentación técnica en `CLAUDE.md` y `ADMIN_SETUP.md`.

---

*Última actualización: Enero 2025*
