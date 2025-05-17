import { createHash } from 'crypto';

/**
 * Genera un identificador único de pedido tipo "P-DDMMYY-XXXXXXXX"
 * a partir del ID de sesión de Stripe y su timestamp de creación.
 *
 * @param sessionId - ID de la sesión de Stripe.
 * @param createdTimestamp - Timestamp UNIX de creación (en segundos).
 * @returns Identificador del pedido.
 */
export function generateOrderId(sessionId: string, createdTimestamp: number): string {
  const date = new Date(createdTimestamp * 1000); // convertir a milisegundos

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yy = String(date.getFullYear()).slice(-2);
  const dateStr = `${dd}${mm}${yy}`;

  const hash = createHash('sha256')
    .update(sessionId)
    .digest('hex')
    .slice(0, 8)
    .toUpperCase();

  return `P-${dateStr}-${hash}`;
}
