# Guía de Usuario - FADEMEX

## Índice

1. [Introducción](#introducción)
2. [Portal de Clientes](#portal-de-clientes)
   - [Registro de Cuenta](#registro-de-cuenta)
   - [Inicio de Sesión](#inicio-de-sesión)
   - [Recuperación de Contraseña](#recuperación-de-contraseña)
   - [Panel Principal (Dashboard)](#panel-principal-dashboard)
   - [Mis Contratos](#mis-contratos)
   - [Mis Documentos](#mis-documentos)
   - [Cerrar Sesión](#cerrar-sesión)
3. [Panel de Administración](#panel-de-administración)
   - [Aceptar Invitación de Administrador](#aceptar-invitación-de-administrador)
   - [Invitar Nuevos Administradores](#invitar-nuevos-administradores)
   - [Gestión de Equipo Administrador](#gestión-de-equipo-administrador)
4. [Preguntas Frecuentes](#preguntas-frecuentes)
5. [Soporte](#soporte)

---

## Introducción

Bienvenido a la plataforma FADEMEX. Esta guía te ayudará a navegar por el sistema, ya sea como **cliente** utilizando el Portal de Clientes, o como **administrador** utilizando el Panel de Administración.

La plataforma cuenta con dos áreas principales:
- **Portal de Clientes**: Donde los clientes pueden ver sus contratos, subir documentos y gestionar su información.
- **Panel de Administración**: Donde los administradores gestionan leads, clientes y la operación general.

---

## Portal de Clientes

El Portal de Clientes está disponible en `/portal` y permite a los clientes de FADEMEX gestionar su relación con la empresa de manera digital.

### Registro de Cuenta

Si eres un nuevo cliente y deseas crear una cuenta, sigue estos pasos:

#### Paso 1: Acceder a la página de registro
1. Abre tu navegador web (Google Chrome, Firefox, Safari, etc.)
2. Ve a la dirección: `[URL del sitio]/portal/register`
3. También puedes acceder desde la página de inicio de sesión haciendo clic en **"Regístrate aquí"**

#### Paso 2: Completar el formulario de registro

El formulario de registro te pedirá la siguiente información:

| Campo | Descripción | Requerido |
|-------|-------------|-----------|
| **Nombre Completo** | Tu nombre y apellidos completos | Sí |
| **Correo Electrónico** | Un correo válido donde recibirás notificaciones | Sí |
| **Empresa** | El nombre de tu empresa o negocio | No |
| **Teléfono** | Tu número de contacto con lada (ej: +52 55...) | No |
| **Gasto Mensual Promedio (Luz)** | Selecciona el rango de tu recibo de luz mensual | Sí |
| **Contraseña** | Mínimo 6 caracteres | Sí |
| **Confirmar Contraseña** | Repite tu contraseña para verificar | Sí |

**Rangos de gasto de luz disponibles:**
- $3,000 - $10,000 MXN
- $10,000 - $30,000 MXN
- Más de $30,000 MXN

#### Paso 3: Crear la cuenta
1. Revisa que toda la información sea correcta
2. Haz clic en el botón **"Registrarse"**
3. Espera mientras se procesa tu registro (verás "Creando cuenta...")
4. Si todo es correcto, serás redirigido automáticamente al Panel Principal

#### Posibles errores durante el registro:
- **"Las contraseñas no coinciden"**: Verifica que ambas contraseñas sean idénticas
- **"La contraseña debe tener al menos 6 caracteres"**: Tu contraseña es muy corta
- **"Este correo está reservado para uso administrativo"**: El correo que intentas usar está reservado para administradores
- **"Ocurrió un error inesperado de registro"**: Intenta nuevamente o contacta a soporte

---

### Inicio de Sesión

Si ya tienes una cuenta registrada, puedes iniciar sesión de la siguiente manera:

#### Paso 1: Acceder a la página de inicio de sesión
1. Ve a la dirección: `[URL del sitio]/portal/login`
2. También puedes hacer clic en **"Portal de Clientes"** desde la página principal del sitio

#### Paso 2: Ingresar tus credenciales

| Campo | Descripción |
|-------|-------------|
| **Correo Electrónico** | El correo con el que te registraste |
| **Contraseña** | Tu contraseña de acceso |

#### Paso 3: Acceder al sistema
1. Haz clic en el botón **"Iniciar Sesión"**
2. Espera mientras se verifica tu información (verás "Iniciando sesión...")
3. Si las credenciales son correctas, serás redirigido al Panel Principal

#### ¿Olvidaste tu contraseña?
Si no recuerdas tu contraseña, haz clic en el enlace **"¿Olvidaste tu contraseña?"** que aparece debajo del campo de contraseña.

---

### Recuperación de Contraseña

Si olvidaste tu contraseña, puedes restablecerla siguiendo estos pasos:

#### Paso 1: Solicitar enlace de recuperación
1. Desde la página de inicio de sesión, haz clic en **"¿Olvidaste tu contraseña?"**
2. Se abrirá la página de "Recuperar Contraseña"
3. Ingresa el correo electrónico asociado a tu cuenta
4. Haz clic en **"Enviar Enlace de Recuperación"**

#### Paso 2: Revisar tu correo
1. Revisa tu bandeja de entrada (y también la carpeta de spam)
2. Busca un correo de FADEMEX con el asunto de recuperación de contraseña
3. El enlace de recuperación **expira en 1 hora**, así que úsalo pronto

#### Paso 3: Crear nueva contraseña
1. Haz clic en el enlace que recibiste por correo
2. Se abrirá la página "Nueva Contraseña"
3. Ingresa tu nueva contraseña (mínimo 6 caracteres)
4. Confirma tu nueva contraseña escribiéndola nuevamente
5. Haz clic en **"Restablecer Contraseña"**

#### Paso 4: Iniciar sesión
1. Verás un mensaje de confirmación: "Contraseña Actualizada"
2. Serás redirigido automáticamente a la página de inicio de sesión
3. Ingresa tu correo y tu nueva contraseña

**Nota importante:** Si el enlace ha expirado o es inválido, verás el mensaje "Enlace Inválido o Expirado". En ese caso, haz clic en **"Solicitar Nuevo Enlace"** para repetir el proceso.

---

### Panel Principal (Dashboard)

Una vez que inicias sesión, llegarás al Panel Principal de tu cuenta. Aquí encontrarás:

#### Sección de Bienvenida
En la parte superior verás un saludo personalizado con tu nombre: "Hola, [Tu nombre]" junto con el mensaje "Bienvenido a tu portal de clientes FADEMEX".

#### Estadísticas Rápidas
Verás 4 tarjetas con información importante:

| Tarjeta | Descripción |
|---------|-------------|
| **Contratos Activos** | Número de contratos que tienes vigentes |
| **Docs Pendientes** | Documentos que aún están en proceso de revisión |
| **Total Proyectos** | Cantidad total de proyectos/contratos registrados |
| **Total Documentos** | Todos los documentos que has subido |

#### Accesos Rápidos
Dos botones de acceso rápido:
- **Mis Contratos**: Ver y descargar contratos activos
- **Mis Documentos**: Subir y administrar archivos

#### Tarjeta de Ayuda
Si necesitas asistencia, encontrarás una sección con el botón **"Contactar Soporte"** que te permite enviar un correo a contacto@fademex.com

#### Barra de Navegación
En la parte superior de la pantalla encontrarás el menú de navegación con:
- **Dashboard**: Página principal (donde estás)
- **Contratos**: Ver todos tus contratos
- **Documentos**: Gestionar tus documentos

También verás tu nombre y empresa (si la registraste) junto con el botón **"Cerrar Sesión"**.

---

### Mis Contratos

En esta sección puedes ver todos los contratos que tienes con FADEMEX.

#### Cómo acceder
1. Desde el menú superior, haz clic en **"Contratos"**
2. O desde el Panel Principal, haz clic en **"Mis Contratos"**

#### Información que verás de cada contrato

Cada contrato se muestra como una tarjeta con:

| Elemento | Descripción |
|----------|-------------|
| **Estado** | Puede ser: Activo, Pendiente, Completado o Cancelado |
| **Número de contrato** | Identificador único (ej: #1234) |
| **Título** | Nombre o descripción del contrato |
| **Descripción** | Detalles adicionales del contrato |
| **Fecha de inicio** | Cuándo comenzó el contrato |
| **Fecha de fin** | Cuándo termina el contrato |

#### Estados de los contratos

| Estado | Color | Significado |
|--------|-------|-------------|
| **Activo** | Verde | El contrato está vigente |
| **Pendiente** | Amarillo | En proceso de aprobación o firma |
| **Completado** | Azul | El contrato ha finalizado exitosamente |
| **Cancelado** | Rojo | El contrato fue cancelado |

#### Descargar contrato
- Si el contrato tiene un documento PDF disponible, verás el botón **"Descargar PDF"**
- Haz clic en él para abrir o descargar el archivo
- Si no hay documento disponible, verás "Documento no disponible" en gris

#### Si no tienes contratos
Verás el mensaje "No hay contratos disponibles" con la sugerencia de contactar a soporte si crees que es un error.

---

### Mis Documentos

Esta sección te permite subir documentos importantes y ver el historial de archivos que has enviado.

#### Cómo acceder
1. Desde el menú superior, haz clic en **"Documentos"**
2. O desde el Panel Principal, haz clic en el botón **"Subir Documento"** o **"Mis Documentos"**

#### Subir un nuevo documento

**Método 1: Arrastrar y soltar**
1. Localiza el archivo en tu computadora
2. Arrástralo hacia el área que dice "Haz clic o arrastra un archivo aquí"
3. Suelta el archivo cuando el área se ilumine

**Método 2: Seleccionar archivo**
1. Haz clic en el área de subida
2. Se abrirá una ventana para seleccionar el archivo
3. Navega hasta el archivo deseado y selecciónalo
4. Haz clic en "Abrir"

**Después de seleccionar el archivo:**
1. Verás el nombre del archivo y su tamaño
2. Si deseas cambiar el archivo, haz clic en la **X** para eliminarlo y seleccionar otro
3. Haz clic en el botón **"Subir Archivo"**
4. Espera mientras se sube (verás "Subiendo...")
5. Una vez completado, el documento aparecerá en tu historial

#### Formatos permitidos
- **PDF** (.pdf)
- **Imágenes** (.jpg, .jpeg, .png)
- **Word** (.doc, .docx)
- **Excel** (.xls, .xlsx)

**Tamaño máximo:** 10 MB por archivo

#### Posibles errores al subir
- **"Formato no válido"**: El tipo de archivo no está permitido
- **"El archivo es demasiado grande"**: El archivo supera los 10 MB
- **"Error al subir el archivo"**: Problema de conexión, intenta nuevamente

#### Historial de documentos

Cada documento en tu historial muestra:

| Información | Descripción |
|-------------|-------------|
| **Nombre del archivo** | El nombre original del archivo |
| **Estado** | Aprobado, Pendiente o Rechazado |
| **Tamaño** | Tamaño del archivo en MB |
| **Fecha** | Cuándo subiste el documento |

#### Estados de los documentos

| Estado | Color | Significado |
|--------|-------|-------------|
| **Aprobado** | Verde | El documento fue revisado y aceptado |
| **Pendiente** | Amarillo | El documento está en proceso de revisión |
| **Rechazado** | Rojo | El documento fue rechazado (contacta a soporte) |

#### Descargar un documento
- Haz clic en el ícono de descarga (flecha hacia abajo) junto al documento
- El archivo se abrirá en una nueva pestaña o se descargará

---

### Cerrar Sesión

Para salir de tu cuenta de manera segura:

1. Localiza el botón **"Cerrar Sesión"** en la esquina superior derecha
2. Haz clic en él
3. Serás redirigido a la página de inicio de sesión

**Importante:** Siempre cierra sesión cuando uses una computadora compartida o pública.

---

## Panel de Administración

El Panel de Administración está reservado para usuarios autorizados de FADEMEX. Esta sección explica cómo aceptar invitaciones y gestionar el equipo de administradores.

### Aceptar Invitación de Administrador

Si recibiste un correo de invitación para ser administrador de FADEMEX, sigue estos pasos:

#### Paso 1: Abrir el enlace de invitación
1. Revisa tu correo electrónico
2. Busca el correo de invitación de FADEMEX
3. Haz clic en el enlace de invitación incluido en el correo

#### Paso 2: Verificar tu información
En la página de invitación verás:
- Tu correo electrónico
- Tu nombre (si fue proporcionado al crear la invitación)

Verifica que la información sea correcta.

#### Paso 3: Crear tu contraseña
1. En el campo **"Contraseña"**, ingresa una contraseña segura (mínimo 6 caracteres)
2. En el campo **"Confirmar Contraseña"**, repite la misma contraseña
3. Haz clic en el botón **"Activar Cuenta"**

#### Paso 4: Acceso automático
1. Verás el mensaje "¡Cuenta Activada!" con una palomita verde
2. El sistema te iniciará sesión automáticamente
3. Serás redirigido al Panel de Administración

#### Posibles mensajes de error

**"Invitación No Válida"**
- El enlace no existe o ha expirado
- Solución: Contacta al administrador que te invitó para que envíe una nueva invitación

**"Invitación Ya Utilizada"**
- Esta invitación ya fue aceptada anteriormente
- Solución: Ve a la página de inicio de sesión (`/login`) e ingresa con tu correo y contraseña

**"La contraseña debe tener al menos 6 caracteres"**
- Tu contraseña es muy corta
- Solución: Usa una contraseña de 6 caracteres o más

**"Las contraseñas no coinciden"**
- Las contraseñas ingresadas son diferentes
- Solución: Verifica que ambos campos tengan exactamente la misma contraseña

---

### Invitar Nuevos Administradores

Si eres administrador y necesitas dar acceso a un nuevo miembro del equipo:

#### Paso 1: Ir a Configuración
1. Inicia sesión en el Panel de Administración
2. En el menú lateral, haz clic en **"Configuración"**

#### Paso 2: Abrir el formulario de invitación
1. En la sección "Equipo Administrador", haz clic en el botón **"Invitar"** (con el ícono de persona con +)
2. Se abrirá una ventana modal con el formulario de invitación

#### Paso 3: Completar la información del nuevo administrador

| Campo | Descripción | Requerido |
|-------|-------------|-----------|
| **Correo Electrónico** | El correo del nuevo administrador | Sí |
| **Nombre Completo** | El nombre de la persona (opcional pero recomendado) | No |

#### Paso 4: Enviar la invitación
1. Haz clic en el botón **"Enviar Invitación"**
2. Espera mientras se procesa (verás "Enviando...")
3. Verás el mensaje "Invitación Enviada" con una palomita verde
4. El nuevo administrador recibirá un correo con el enlace de invitación

#### Paso 5: La ventana se cerrará automáticamente
La lista de administradores se actualizará mostrando la nueva invitación con estado "Pendiente".

#### Posibles errores al invitar
- **"Error al enviar la invitación"**: Verifica que el correo sea válido e intenta nuevamente
- Si el correo ya existe como administrador, no se creará una nueva invitación

---

### Gestión de Equipo Administrador

En la página de Configuración puedes ver el listado de todos los administradores:

#### Información mostrada

| Dato | Descripción |
|------|-------------|
| **Nombre/Correo** | Identificación del administrador |
| **Estado** | Activo, Pendiente o Inactivo |
| **Fecha** | Cuándo se unió o fue invitado |

#### Estados de los administradores

| Estado | Color | Significado |
|--------|-------|-------------|
| **Activo** | Verde | El administrador tiene acceso completo |
| **Pendiente** | Amarillo | La invitación fue enviada pero no aceptada |
| **Inactivo** | Gris | La cuenta está deshabilitada |

#### Estadísticas del equipo
En la sección "Resumen de Uso" encontrarás:
- Número de administradores activos
- Número de invitaciones pendientes

---

## Preguntas Frecuentes

### Portal de Clientes

**¿Puedo cambiar mi correo electrónico?**
Actualmente no es posible cambiar el correo asociado a tu cuenta. Contacta a soporte para asistencia.

**¿Qué hago si no recibo el correo de recuperación de contraseña?**
1. Revisa tu carpeta de spam o correo no deseado
2. Espera unos minutos, a veces el correo tarda en llegar
3. Intenta solicitar un nuevo enlace
4. Si el problema persiste, contacta a soporte

**¿Cuánto tiempo tengo para usar el enlace de recuperación?**
El enlace de recuperación de contraseña expira después de **1 hora**.

**¿Puedo subir varios documentos a la vez?**
No, debes subir los documentos uno por uno. Después de subir uno, puedes seleccionar el siguiente.

**¿Qué pasa si mi documento es rechazado?**
Contacta a soporte para conocer el motivo del rechazo y qué documento debes enviar en su lugar.

### Panel de Administración

**¿Cuánto tiempo dura válida una invitación de administrador?**
Las invitaciones no expiran automáticamente, pero pueden ser revocadas por otro administrador.

**¿Puedo reenviar una invitación si la persona no la recibió?**
Actualmente debes crear una nueva invitación con el mismo correo. La invitación anterior quedará inactiva.

**¿Quién puede invitar nuevos administradores?**
Cualquier administrador activo puede invitar nuevos miembros al equipo.

---

## Soporte

Si tienes problemas o preguntas que no están cubiertas en esta guía, puedes contactar al equipo de soporte:

**Correo electrónico:** contacto@fademex.com

**Desde el Portal de Clientes:**
1. Ve al Panel Principal
2. En la sección "¿Necesitas Ayuda?"
3. Haz clic en **"Contactar Soporte"**

---

*Última actualización: Enero 2025*
*Versión de la plataforma: 2.1.0*
