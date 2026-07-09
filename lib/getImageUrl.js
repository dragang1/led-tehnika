import { normalizeImageUrl } from './cms/utils.js';

export function getImageUrl(img) {
  if (!img) return '/placeholder.png';
  const url = typeof img === 'string' ? img : img?.url;
  return normalizeImageUrl(url) || '/placeholder.png';
}

export { normalizeImageUrl };
