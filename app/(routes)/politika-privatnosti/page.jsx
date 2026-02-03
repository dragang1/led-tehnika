import Link from 'next/link';

export const metadata = {
  title: 'Politika privatnosti i uslovi korištenja | Led Tehnika',
  description: 'Politika privatnosti i uslovi korištenja web stranice Led Tehnika. Privatnost, lični podaci, kolačići i autorska prava.',
  alternates: {
    canonical: 'https://ledtehnika.com/politika-privatnosti',
  },
  openGraph: {
    title: 'Politika privatnosti i uslovi korištenja | Led Tehnika',
    description: 'Politika privatnosti i uslovi korištenja web stranice Led Tehnika.',
    url: 'https://ledtehnika.com/politika-privatnosti',
    siteName: 'Led Tehnika',
    type: 'website',
    locale: 'bs_BA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Politika privatnosti i uslovi korištenja | Led Tehnika',
    description: 'Politika privatnosti i uslovi korištenja web stranice Led Tehnika.',
  },
};

export default function PolitikaPrivatnostiPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
        Politika privatnosti i uslovi korištenja
      </h1>
      <p className="text-gray-500 text-sm mb-10">
        Posljednje ažuriranje: Januar 2026
      </p>

      <p className="text-gray-700 leading-relaxed mb-10">
        Dobrodošli na web stranicu Led tehnika. Korištenjem ove web stranice prihvatate dole navedene uslove i pravila. Molimo vas da ih pročitate.
      </p>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Privatnost i lični podaci</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Web stranica Led tehnika poštuje privatnost svojih korisnika i ne prikuplja lične podatke bez njihove saglasnosti.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Lični podaci mogu biti prikupljeni isključivo putem:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-1 ml-2">
          <li>kontakt forme (ime, email adresa, broj telefona – ako ih korisnik dobrovoljno unese)</li>
          <li>direktne email komunikacije</li>
        </ul>
        <p className="text-gray-700 leading-relaxed mb-4">
          Podaci se koriste isključivo za:
        </p>
        <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4 space-y-1 ml-2">
          <li>odgovor na upite korisnika</li>
          <li>komunikaciju u vezi proizvoda ili usluga</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">
          Lični podaci se ne dijele trećim stranama i ne koriste se u marketinške svrhe.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Čuvanje i zaštita podataka</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Svi podaci se čuvaju na siguran način i dostupni su isključivo vlasniku web stranice.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Podaci se čuvaju samo onoliko dugo koliko je potrebno za ostvarenje svrhe zbog koje su prikupljeni.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Kolačići (Cookies)</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Web stranica Led tehnika ne koristi kolačiće za praćenje korisnika, analitiku ili oglašavanje.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Ukoliko se u budućnosti uvedu kolačići, korisnici će o tome biti blagovremeno obaviješteni.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Informacije na web stranici</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Sav sadržaj na web stranici služi isključivo u informativne svrhe.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Zadržavamo pravo izmjene informacija, opisa proizvoda i cijena bez prethodne najave.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Led tehnika ne snosi odgovornost za eventualne greške ili zastarjele informacije.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Autorska prava</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Svi tekstovi, slike i ostali sadržaji na web stranici su vlasništvo Led tehnika, osim ako nije drugačije navedeno.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Zabranjeno je kopiranje, distribucija ili korištenje sadržaja bez prethodne saglasnosti.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Odgovornost korisnika</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Korisnici su dužni koristiti web stranicu na zakonit i korektan način.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Zabranjena je zloupotreba kontakt forme ili bilo kakve funkcionalnosti web stranice.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Izmjene uslova</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Zadržavamo pravo izmjene ove stranice u bilo kojem trenutku.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Sve izmjene stupaju na snagu danom objave na web stranici.
        </p>
      </section>

      <div className="pt-6 border-t border-gray-200">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          ← Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
