import { config, fields, collection, singleton } from '@keystatic/core';

const GITHUB_REPO = process.env.KEYSTATIC_GITHUB_REPO || 'dragang1/led-tehnika';

const useGithubStorage =
  process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
  process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
  process.env.KEYSTATIC_SECRET;

export default config({
  storage: useGithubStorage
    ? { kind: 'github', repo: GITHUB_REPO }
    : { kind: 'local' },
  collections: {
    categories: collection({
      label: 'Kategorije',
      slugField: 'slug',
      path: 'content/categories/*',
      schema: {
        slug: fields.slug({
          name: { label: 'Slug' },
          description: 'NE MIJENJATI — SEO URL zavisi od ovoga (npr. /kategorije/automatizacija).',
        }),
        title: fields.text({ label: 'Naziv' }),
        description: fields.text({ label: 'Opis', multiline: true }),
        iconUrl: fields.text({ label: 'Icon URL (Cloudinary)' }),
        iconAlt: fields.text({ label: 'Icon alt tekst' }),
        updatedAt: fields.text({ label: 'Datum ažuriranja' }),
      },
    }),
    products: collection({
      label: 'Proizvodi',
      slugField: 'slug',
      path: 'content/products/*',
      schema: {
        slug: fields.slug({
          name: { label: 'Slug' },
          description: 'NE MIJENJATI — SEO URL zavisi od ovoga (npr. /kategorije/automatizacija/motor-za-kapiju-set).',
        }),
        title: fields.text({ label: 'Naziv' }),
        price: fields.number({ label: 'Cijena (KM)' }),
        description: fields.text({ label: 'Opis', multiline: true }),
        category: fields.relationship({
          label: 'Kategorija',
          collection: 'categories',
        }),
        updatedAt: fields.text({ label: 'Datum ažuriranja' }),
        images: fields.array(
          fields.object({
            url: fields.text({ label: 'URL slike (Cloudinary)' }),
            alt: fields.text({ label: 'Alt tekst' }),
          }),
          { label: 'Slike', itemLabel: (props) => props.fields.alt.value || 'Slika' }
        ),
      },
    }),
    pages: collection({
      label: 'Stranice',
      slugField: 'slug',
      path: 'content/pages/*',
      schema: {
        slug: fields.slug({
          name: { label: 'Slug' },
          description: 'NE MIJENJATI — SEO URL zavisi od ovoga (npr. /kategorije/automatizacija).',
        }),
        title: fields.text({ label: 'Naslov' }),
        seoTitle: fields.text({ label: 'SEO naslov' }),
        seoDescription: fields.text({ label: 'SEO opis', multiline: true }),
        coverUrl: fields.text({ label: 'Cover URL (Cloudinary)' }),
        updatedAt: fields.text({ label: 'Datum ažuriranja' }),
        contentJson: fields.text({
          label: 'Sadržaj (JSON blokovi)',
          multiline: true,
          description: 'Rich text blokovi iz Strapi-ja, u JSON formatu.',
        }),
      },
    }),
  },
  singletons: {
    slider: singleton({
      label: 'Slider (početna)',
      path: 'content/slider',
      schema: {
        slides: fields.array(
          fields.object({
            imageUrl: fields.text({ label: 'URL slike' }),
            title: fields.text({ label: 'Naslov' }),
            highlight: fields.text({ label: 'Istaknuti tekst' }),
            description: fields.text({ label: 'Opis', multiline: true }),
          }),
          { label: 'Slajdovi', itemLabel: (props) => props.fields.title.value || 'Slajd' }
        ),
      },
    }),
  },
});
