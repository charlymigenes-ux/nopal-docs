---
title: NOPAL Intelligence
sidebar_label: NOPAL Intelligence
sidebar_position: 14
audience: user
type: explanation
status: implemented
verified_against: "nopal@a5853dc (2026-10-17)"
---

# NOPAL Intelligence

Asistente de IA opcional integrado en NOPAL. Está **desactivado por defecto**: la entrada **Herramientas → NOPAL Intelligence** solo aparece cuando un administrador lo activa.

## Qué puede hacer

Puedes hacerle preguntas sobre tus máquinas y trabajos y recibir respuestas en lenguaje natural. Dispone de herramientas de **solo lectura** para consultar el estado de NOPAL.

- Tus conversaciones son **privadas**: cada usuario ve solo las suyas.
- Respeta tu rol: no puede hacer nada que tú no puedas hacer.
- **Nunca inicia el láser ni el CNC.**
- Muestra un aviso de que la IA puede equivocarse: verifica lo importante.

![NOPAL Intelligence con una conversación sobre el taller, el estado de las máquinas y los eventos recientes](/img/capturas/es/ia-conversacion-1.2.0-alpha.1.png)

*Captura de un sistema en funcionamiento · NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

## Acciones de la IA

Por defecto la IA **solo lee**. Un administrador puede activar *«Permitir que la IA actúe»*. Aun así, las acciones con riesgo piden **tu confirmación** antes de ejecutarse.

Si el plugin **Matriz LED** está instalado, la IA puede además **mostrar un mensaje corto en el panel LED FK-8Wa**: es una acción de riesgo bajo, que sustituye al mensaje vigente y vence sola (1 a 1440 minutos; 5 por omisión). Sin el plugin, la acción no está disponible.

## Configuración (administrador)

En **Configuración → Inteligencia artificial**:

| Ajuste | Descripción |
|---|---|
| Activar | Muestra u oculta la IA para todos |
| Servidor | Cualquier servidor compatible con OpenAI: local, de tu red o en la nube (hay ajustes predefinidos) |
| Modelo | **Auto** (NOPAL elige según el nivel de la pregunta: Rápido, Intermedio, Razonamiento…) o **Fijo** |
| Preguntas rápidas | Lista editable de sugerencias |
| Permitir que la IA actúe | Desactivado por defecto |

:::danger Privacidad: servidores públicos
Usar un servidor público exige aceptar de forma explícita (`allow_public_endpoint`) una lista de los datos que se enviarán. La clave de API se guarda en `ai_config.json` en la carpeta de NOPAL. Si quieres que nada salga de tu red, usa un servidor local.
:::

Un servidor local de IA suele necesitar una GPU para responder con fluidez.

![Tarjeta «Inteligencia artificial» con dos IAs guardadas y la configuración de un proveedor externo](/img/capturas/es/ia-configuracion-1.2.0-alpha.1.png)

*Captura de un sistema en funcionamiento · NOPAL 1.2.0-alpha.1 · interfaz en español · tema NOPAL Style.*

## Todavía no disponible

El dictado por voz aparece como «próximamente».

## Quién puede hacer qué

| Acción | Operador | Administrador |
|---|:-:|:-:|
| Usar el asistente y ver sus conversaciones | ✅ | ✅ |
| Configurar servidor, modelo y acciones | ❌ | ✅ |
| Editar las preguntas rápidas | ❌ | ✅ |

Para exponer herramientas de tus propios plugins a la IA, consulta [Integraciones de plugins](../05-desarrolladores/plugins-integraciones).
