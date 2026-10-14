import React from 'react';
import Translate from '@docusaurus/Translate';

// Estados definidos en DOCUMENTATION_STANDARD.md §5.
const MESSAGES = {
  implemented: (
    <Translate id="status.implemented">Verificado contra el código actual.</Translate>
  ),
  convention: (
    <Translate id="status.convention">
      Funciona hoy, pero ningún mecanismo lo impone. Puede cambiar sin un contrato formal.
    </Translate>
  ),
  experimental: (
    <Translate id="status.experimental">
      Existe en el código y puede cambiar sin aviso. No se recomienda para producción.
    </Translate>
  ),
  rfc: (
    <Translate id="status.rfc">
      Propuesta futura. No existe en NOPAL y no forma parte de la API oficial.
    </Translate>
  ),
  deprecated: (
    <Translate id="status.deprecated">
      Se mantiene por compatibilidad. No lo uses en trabajo nuevo.
    </Translate>
  ),
};

const LABELS = {
  implemented: 'Implemented',
  convention: 'Convention',
  experimental: 'Experimental',
  rfc: 'RFC',
  deprecated: 'Deprecated',
};

/**
 * Uso en MDX: <StatusBanner status="rfc" verifiedAgainst="1.2.0-alpha.1 @ abc1234" />
 * Se muestra arriba de las páginas técnicas; para `rfc` es obligatorio (Standard §5).
 */
export default function StatusBanner({ status, verifiedAgainst }) {
  if (!MESSAGES[status]) {
    throw new Error(`StatusBanner: estado desconocido "${status}"`);
  }
  return (
    <div className={`nopal-status nopal-status--${status}`} role="note">
      <span className="nopal-status__label">{LABELS[status]}</span>
      <span>
        {MESSAGES[status]}
        {verifiedAgainst ? <> <code>{verifiedAgainst}</code></> : null}
      </span>
    </div>
  );
}
