import ContactForm from './ContactForm';

export const metadata = {
  title: 'Kontakt - Led Tehnika | Motor za kapiju, LED rasvjeta',
  description: 'Kontaktirajte Led Tehnika - ekskluzivni uvoznik motora za kapije, LED i bazenske rasvjete. Dostava: Gradiška, Banja Luka, Laktaši, Srbac, Prnjavor, Prijedor, BiH. Telefon: 066/676-620 ili 065/983-652. Adresa: Sime Matavulja 144, Nova Topola.',
  alternates: {
    canonical: 'https://ledtehnika.com/kontakt',
  },
  openGraph: {
    title: 'Kontakt - Led Tehnika',
    description: 'Kontaktirajte Led Tehnika - ekskluzivni uvoznik motora za kapije, LED i bazenske rasvjete.',
    url: 'https://ledtehnika.com/kontakt',
    siteName: 'Led Tehnika',
    type: 'website',
    locale: 'bs_BA',
    images: [{
      url: 'https://ledtehnika.com/logo-black.png',
      width: 1200,
      height: 630,
      alt: 'Kontakt - Led Tehnika',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt - Led Tehnika',
    description: 'Kontaktirajte Led Tehnika - ekskluzivni uvoznik motora za kapije, LED i bazenske rasvjete.',
    images: ['https://ledtehnika.com/logo-black.png'],
  },
};

export default function ContactPage() {
  return <ContactForm />;
}
