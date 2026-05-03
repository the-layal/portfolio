import sun from '@/assets/stickers/sun.png';
import flower from '@/assets/stickers/flower.png';

/**
 * Registry of stickers visitors can drop into the hero from the blue
 * paper-scrap easter egg.
 *
 * To add a new sticker:
 *   1. Drop the PNG into `artifacts/portfolio/src/assets/stickers/`.
 *   2. Import it here under a friendly name.
 *   3. Append a `{ id, label, src }` entry to STICKERS below.
 *
 * The `id` is persisted to sessionStorage; keep it stable across releases.
 */
export const STICKERS = [
  { id: 'sun',    label: 'Sun',    src: sun    },
  { id: 'flower', label: 'Flower', src: flower },
] as const;

export type StickerId = typeof STICKERS[number]['id'];

export const STICKER_BY_ID: Record<string, (typeof STICKERS)[number] | undefined> =
  Object.fromEntries(STICKERS.map(s => [s.id, s]));
