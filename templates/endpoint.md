<!-- Plantilla de endpoint documentado a mano (Standard §7.4). Los del core se generan desde OpenAPI. -->

### `MÉTODO /ruta/{parametro}`

**Estado:** implemented | convention | experimental
**Rol requerido:** público | operator | admin

Descripción de una línea.

**Parámetros**

| Nombre | En | Tipo | Obligatorio | Descripción |
|---|---|---|---|---|

**Petición de ejemplo**

```bash
curl -X POST "http://<servidor>:8420/ruta" -H "Content-Type: application/json" -d '{}'
```

**Respuesta**

```json
{}
```

**Errores**

| Código | Cuándo |
|---|---|
