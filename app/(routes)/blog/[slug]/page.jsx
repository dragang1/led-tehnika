import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/app/_components/Breadcrumbs';
import { notFound } from 'next/navigation';

// Blog posts content - can be moved to CMS/API later
const blogPosts = {
  'kako-odabrati-motor-za-kapiju': {
    title: 'Kako Odabrati Motor za Kapiju - Kompletan Vodič',
    content: `
# Kako Odabrati Motor za Kapiju - Kompletan Vodič

Odabir pravog motora za kapiju je ključan za sigurnost, funkcionalnost i dugotrajnost vaše kapije. U ovom vodiču ćemo vam pomoći da odaberete idealan motor za vaše potrebe.

## Faktori koje treba razmotriti

### 1. Težina i veličina kapije
Prvi korak je određivanje težine i dimenzija vaše kapije. Motor mora biti dovoljno snažan da podigne vašu kapiju bez naprezanja.

### 2. Tip motora
- **Linearni motori**: Idealni za teže kapije, jednostavna instalacija
- **Hidraulični motori**: Snažniji, bolji za komercijalne primjene
- **Podzemni motori**: Estetski najbolji izbor, skriveni u tlu

### 3. Snaga motora
Snaga se mjeri u Newtonima (N). Za standardne kapije do 500kg, preporučuje se motor od 500-800N.

## Instalacija

Instalacija motora za kapiju zahtijeva stručno znanje. Preporučujemo angažovanje profesionalnog instalatera kako biste osigurali sigurnost i ispravno funkcioniranje.

## Održavanje

Redovno održavanje produžava životni vijek motora. Provjeravajte:
- Nivo ulja (za hidraulične motore)
- Čistoću i podmazivanje
- Električne konekcije

## Zaključak

Odabir pravog motora za kapiju je investicija u sigurnost i udobnost. Na Led Tehnika nudimo širok asortiman motora za kapije sa stručnim savjetovanjem.
    `,
    category: 'Motori za kapije',
    date: '2024-01-15',
    readTime: '5 min',
  },
  'vodic-za-led-rasvjetu-u-vrtu': {
    title: 'Vodič za LED Rasvjetu u Vrtu - Savjeti i Instalacija',
    content: `
# Vodič za LED Rasvjetu u Vrtu

LED rasvjeta je postala standard za vrtno osvjetljenje zbog svoje energetske efikasnosti i dugotrajnosti.

## Prednosti LED rasvjete

- **Energetska efikasnost**: Do 80% manje potrošnje energije
- **Dugotrajnost**: Do 50,000 sati rada
- **Ekološki prihvatljiva**: Bez štetnih materijala
- **Različite boje**: RGB opcije za kreativno osvjetljenje

## Tipovi LED rasvjete za vrt

### Zidne lampe
Idealne za osvjetljenje fasade i ulaza.

### Reflektori
Koriste se za akcentno osvjetljenje biljaka i arhitektonskih elemenata.

### LED trake
Fleksibilne trake za kreativno osvjetljenje stepenica i rubova.

## Instalacija

1. Planirajte pozicije svjetiljki
2. Provjerite napajanje i zaštitu (IP rating)
3. Koristite profesionalnu instalaciju za sigurnost

## Zaključak

LED rasvjeta transformira vaš vrt u noćno vrijeme, stvarajući magičnu atmosferu.
    `,
    category: 'LED Rasvjeta',
    date: '2024-01-10',
    readTime: '7 min',
  },
  'instalacija-bazenske-rasvjete': {
    title: 'Instalacija Bazenske Rasvjete - Korak po Korak',
    content: `
# Instalacija Bazenske Rasvjete

Bazenska rasvjeta stvara spektakularan efekat i poboljšava sigurnost korištenja bazena noću.

## Sigurnost prije svega

Bazenska rasvjeta mora imati **IP68 zaštitu** - potpuna vodootpornost i prašinoopornost.

## Koraci instalacije

1. **Planiranje pozicija**: Odredite optimalne pozicije za svjetiljke
2. **Priprema instalacije**: Provjerite električne konekcije
3. **Instalacija svjetiljki**: Postavite svjetiljke prema proizvođačkim uputama
4. **Testiranje**: Provjerite funkcionalnost prije punjenja bazena

## Tipovi bazenske rasvjete

- **Podvodne LED svjetiljke**: Najpopularniji izbor
- **RGB rasvjeta**: Za dinamične efekte
- **Bazenska rasvjeta za fontane**: Specijalizovane za vodene efekte

## Održavanje

Redovno provjeravajte:
- Čistoću svjetiljki
- Električne konekcije
- Zaštitu od vode

## Zaključak

Profesionalna instalacija bazenske rasvjete osigurava sigurnost i dugotrajnost.
    `,
    category: 'Bazenska Rasvjeta',
    date: '2024-01-05',
    readTime: '6 min',
  },
  'prednosti-led-rasvjete': {
    title: 'Prednosti LED Rasvjete - Zašto Odabrati LED?',
    content: `
# Prednosti LED Rasvjete

LED tehnologija je revolucionirala svijet osvjetljenja. Evo zašto je LED najbolji izbor.

## Energetska efikasnost

LED svjetiljke koriste do 80% manje energije od tradicionalnih žarulja, što znači značajne uštede na računima za struju.

## Dugotrajnost

Prosječna LED svjetiljka traje 25-50 puta duže od tradicionalnih žarulja, što znači manje zamjena i održavanja.

## Ekološki aspekti

LED svjetiljke ne sadrže štetne materijale poput žive, što ih čini ekološki prihvatljivim izborom.

## Kvaliteta svjetlosti

LED rasvjeta pruža:
- Prirodniju boju svjetlosti
- Mogućnost podešavanja intenziteta
- RGB opcije za kreativno osvjetljenje

## Finansijska isplativost

Iako su početne investicije veće, dugoročno LED rasvjeta donosi značajne uštede.

## Zaključak

LED rasvjeta je investicija u budućnost - efikasna, ekološka i ekonomična.
    `,
    category: 'LED Rasvjeta',
    date: '2024-01-01',
    readTime: '4 min',
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    return {
      title: 'Članak nije pronađen | Led Tehnika',
    };
  }

  return {
    title: `${post.title} | Led Tehnika Blog`,
    description: post.content.slice(0, 155).replace(/#/g, '').trim(),
    alternates: {
      canonical: `https://ledtehnika.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.content.slice(0, 155).replace(/#/g, '').trim(),
      url: `https://ledtehnika.com/blog/${slug}`,
      siteName: 'Led Tehnika',
      type: 'article',
      locale: 'bs_BA',
      publishedTime: post.date,
      section: post.category,
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }));
}

export default function BlogPostPage({ params }) {
  const { slug } = params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const breadcrumbItems = [
    { label: 'Blog', href: '/blog' },
    { label: post.title, href: '#' }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-12">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-blue-600 hover:text-blue-700 font-semibold mb-4 inline-block"
            >
              ← Nazad na blog
            </Link>
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                {post.category}
              </span>
              <span>{new Date(post.date).toLocaleDateString('bs-BA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readTime} čitanja</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
          </div>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return <h1 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.replace('# ', '')}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{line.replace('## ', '')}</h2>;
              } else if (line.startsWith('### ')) {
                return <h3 key={index} className="text-xl font-semibold text-gray-900 mt-4 mb-2">{line.replace('### ', '')}</h3>;
              } else if (line.startsWith('- ')) {
                return <li key={index} className="ml-6 mb-2 text-gray-700">{line.replace('- ', '')}</li>;
              } else if (line.trim() === '') {
                return <br key={index} />;
              } else {
                return <p key={index} className="text-gray-700 leading-relaxed mb-4">{line}</p>;
              }
            })}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Potrebna vam je pomoć?</h3>
              <p className="text-gray-700 mb-4">
                Naši stručnjaci su tu da vam pomognu s odabirom i instalacijom. Kontaktirajte nas za besplatno savjetovanje.
              </p>
              <Link
                href="/kontakt"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                Kontaktirajte nas
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
