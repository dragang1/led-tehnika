import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/app/_components/Breadcrumbs';

export const metadata = {
  title: 'Blog i Vodiči - LED Rasvjeta, Motori za Kapije | Led Tehnika',
  description: 'Korisni vodiči i članci o LED rasvjeti, motorima za kapije, bazenskoj rasvjeti i instalaciji. Savjeti stručnjaka na Led Tehnika.',
  alternates: {
    canonical: 'https://ledtehnika.com/blog',
  },
  openGraph: {
    title: 'Blog i Vodiči - Led Tehnika',
    description: 'Korisni vodiči o LED rasvjeti, motorima za kapije i bazenskoj rasvjeti',
    url: 'https://ledtehnika.com/blog',
    siteName: 'Led Tehnika',
    type: 'website',
    locale: 'bs_BA',
  },
};

// Blog posts data - can be moved to CMS/API later
const blogPosts = [
  {
    slug: 'kako-odabrati-motor-za-kapiju',
    title: 'Kako Odabrati Motor za Kapiju - Kompletan Vodič',
    excerpt: 'Sve što trebate znati o odabiru motora za kapiju. Snaga, tipovi, instalacija i održavanje.',
    category: 'Motori za kapije',
    date: '2024-01-15',
    readTime: '5 min',
  },
  {
    slug: 'vodic-za-led-rasvjetu-u-vrtu',
    title: 'Vodič za LED Rasvjetu u Vrtu - Savjeti i Instalacija',
    excerpt: 'Kako pravilno postaviti LED rasvjetu u vašem vrtu. Tipovi rasvjete, pozicioniranje i energetska efikasnost.',
    category: 'LED Rasvjeta',
    date: '2024-01-10',
    readTime: '7 min',
  },
  {
    slug: 'instalacija-bazenske-rasvjete',
    title: 'Instalacija Bazenske Rasvjete - Korak po Korak',
    excerpt: 'Detaljan vodič za instalaciju bazenske rasvjete. Sigurnost, pozicioniranje i održavanje.',
    category: 'Bazenska Rasvjeta',
    date: '2024-01-05',
    readTime: '6 min',
  },
  {
    slug: 'prednosti-led-rasvjete',
    title: 'Prednosti LED Rasvjete - Zašto Odabrati LED?',
    excerpt: 'Energetska efikasnost, dugotrajnost i ekološki aspekti LED rasvjete. Zašto je LED budućnost osvjetljenja.',
    category: 'LED Rasvjeta',
    date: '2024-01-01',
    readTime: '4 min',
  },
];

export default function BlogPage() {
  const breadcrumbItems = [
    { label: 'Blog', href: '#' }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Blog i Vodiči
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Korisni vodiči, savjeti i članci o LED rasvjeti, motorima za kapije, bazenskoj rasvjeti i instalaciji
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span>{new Date(post.date).toLocaleDateString('bs-BA', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <span>•</span>
                  <span>{post.readTime} čitanja</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-blue-600 font-semibold group-hover:underline">
                  Pročitaj više →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Tražite specifičan vodič ili imate pitanje?
          </p>
          <Link
            href="/kontakt"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            Kontaktirajte nas
          </Link>
        </div>
      </div>
    </>
  );
}
