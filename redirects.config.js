/**
 * Legacy URL redirects for SEO preservation.
 * Add entries from GSC export when old slugs differ from current content slugs.
 */
export const legacyRedirects = [
  {
    source: '/kategorije/Grijanje',
    destination: '/kategorije/grijanje',
    permanent: true,
  },
  {
    source: '/kategorije/Smart sistemi',
    destination: '/kategorije/smart-sistemi',
    permanent: true,
  },
  {
    source: '/kategorije/Smart%20sistemi',
    destination: '/kategorije/smart-sistemi',
    permanent: true,
  },
  {
    source: '/productDetail/daljinski-za-motor',
    destination: '/kategorije/automatizacija/daljinski-za-motor-za-kapiju',
    permanent: true,
  },
  {
    source: '/productDetail/smart-panther-600-komplet-set',
    destination: '/kategorije/automatizacija/motor-za-kapiju-set',
    permanent: true,
  },
  {
    source: '/productDetail/wifi-bluetooth-upravljacka-jedinica',
    destination: '/kategorije/automatizacija/wifi-bluetooth-upravljacka-jedinica-motor',
    permanent: true,
  },
];
