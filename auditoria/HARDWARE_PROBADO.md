# Hardware probado — formulario para el autor

Esta lista no se puede sacar del código: solo tú sabes qué máquinas has operado de verdad con NOPAL.
Con ella la [matriz de compatibilidad](../docs/04-hardware/matriz-de-compatibilidad.md) pasa de "no verificado" a estados concretos.

## Cómo llenarla

1. Una fila por **modelo y firmware**, no por marca.
2. **Estado:** `estable` (la usas a diario) · `beta` (funciona, con fallos conocidos) · `parcial` (solo algunas funciones) · `no soportado` (lo intentaste y no funciona) · `no probado`.
3. **Funciones verificadas:** marca solo las que **viste funcionar**: estado, pausar/reanudar/cancelar, iniciar trabajo, mover/home, consola, temperatura, SD, cámara.
4. Si no estás seguro de algo, déjalo en blanco o pon `?`. **Es preferible un hueco a un dato dudoso.**
5. Puedes responder en el chat con una lista libre; yo la paso a este formato.

## Candidatos mencionados en el repositorio

Aparecen citados en el código, las pruebas o los documentos de NOPAL. **Que se mencionen no significa que estén probados**: confirma o descarta cada uno.

| Modelo | Dónde aparece | ¿Probado? |
|---|---|---|
| Anet ET4 Pro (Marlin 2.1.2.7) | Sonda de conexión de Marlin; perfil validado | confirmar |
| Hellbot Magna 2 (300) | Perfil, pruebas y textos de la interfaz (muy citado) | confirmar |
| Elegoo Neptune 4 Pro | Pruebas y textos | confirmar |
| Elegoo Centauri Carbon / Carbon 2 | Docstring del driver | confirmar |
| FlashForge Adventurer 5M | Docstring y textos | confirmar |
| Bambu Lab (serie X1 / P1 / A1) | Docstring y perfiles A1 / A1 mini | confirmar modelo |
| Voron 2 (Klipper) | Textos y pruebas | confirmar |
| Creality Ender (Marlin o Klipper) | Textos y pruebas | confirmar |
| Qidi Q2 y MKS Pi | Comentario del CI sobre Python 3.9 (Debian Bullseye) | confirmar |
| Sculpfun S30 Pro | Perfil láser y textos | confirmar |
| Atomstack | Textos | confirmar modelo |

## Tabla a rellenar

| Marca y modelo | Familia (Klipper / Marlin / Bambu / Elegoo / FlashForge / GRBL) | Firmware y versión | Conexión (USB / WiFi / LAN / MKS) | Estado | Funciones verificadas | Limitaciones conocidas | Quién y cuándo lo probó |
|---|---|---|---|---|---|---|---|
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |
| | | | | | | | |

## Cómo conseguir la información si no la recuerdas

- **Tus propios equipos:** lo más fiable es repasar las máquinas que tienes conectadas hoy a tu NOPAL (Panel de control → lista de máquinas).
- **Historial de GitHub:** los *issues* y *pull requests* de `charlymigenes-ux/nopal` (por ejemplo los que originaron la compatibilidad con Python 3.9) suelen decir qué placa o impresora tenía quien reportó. Se puede revisar con `gh issue list` y `gh pr list`.
- **Mensajes de commit:** `git log --grep="<marca>"` en el repositorio del core muestra cuándo se añadió y probó cada integración.
- **Usuarios:** si alguien más usa NOPAL, pídele su modelo y firmware; marca esas filas como "reportado por terceros".
