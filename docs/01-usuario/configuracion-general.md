---
title: Configuración general
sidebar_label: Configuración general
sidebar_position: 15
audience: user
type: reference
status: implemented
verified_against: "nopal@4346f72 (2026-10-07)"
---

# Configuración general

El engranaje del menú abre **Configuración**. Cada usuario tiene sus preferencias de interfaz; otras tarjetas solo las ve un administrador.

:::note Las preferencias son por navegador
Idioma, tema y demás ajustes de interfaz se guardan en el navegador (`localStorage`). Si abres NOPAL desde otro navegador o equipo, volverás a los valores por defecto.
:::

## Ajustes generales

| Ajuste | Qué hace |
|---|---|
| Idioma | Español, inglés, portugués (Brasil), francés o alemán |
| Calidad de vista previa | Calidad de las previsualizaciones |
| Escala de la interfaz | Tamaño de la interfaz |
| Modo del panel CNC | **Simple** o **Avanzado** |
| Confirmar antes de Home | Pide confirmación antes de llevar la máquina a origen |
| Auto Refresh | Actualización automática |
| Mostrar máquinas sin conexión | Mantiene visibles las máquinas offline |
| Alertas de sonido | Avisos sonoros |
| Recorrido guiado | Activa o desactiva los recorridos. Ver [Centro de ayuda](./centro-de-ayuda-y-recorrido) |

**Personalizar página de Configuración** permite elegir qué grupos de tarjetas se muestran según el tamaño de pantalla.

## Temas

Claro, Negro, **NOPAL Style**, Rojo y un tema **personalizado** con imagen de fondo propia (PNG, JPG o WEBP, hasta **2 MB**; se recomienda 1600×900). Aparece además el «Modo IA» cuando [NOPAL Intelligence](./nopal-intelligence) está activo.

## Tarjetas solo para administradores

Estas tarjetas se ocultan al operador: Inteligencia artificial, Usuarios, Registros (nivel de log), Actualizaciones, Dispositivos, Accesorios y Respaldo. Detalle en [Administración](../02-administracion/).
