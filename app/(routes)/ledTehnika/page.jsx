'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Waves, DoorOpen, Flame } from 'lucide-react';
import Head from 'next/head';

export default function AboutPage() {
  return (
    <>

    <Head>
  <title>O nama | Led Tehnika</title>
  <meta name="description" content="Led Tehnika je ekskluzivni uvoznik LED rasvjete, bazenske rasvjete, motora za kapije i druge opreme." />
  <link rel="canonical" href="https://ledtehnika.com/ledTehnika" />

  <meta property="og:title" content="O nama | Led Tehnika" />
  <meta property="og:description" content="Saznajte više o nama – našoj misiji, vrijednostima i iskustvu u oblasti LED i bazenske rasvjete." />
  <meta property="og:url" content="https://ledtehnika.com/ledTehnika" />
</Head>

    <div className="bg-gray-50 min-h-screen pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Naslov */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            O nama
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            <span className="font-semibold text-gray-900">Led Tehnika</span> je ekskluzivni uvoznik i distributer
            visokokvalitetne <span className="text-blue-700 font-medium">bazenske rasvjete</span>,
            <span className="text-green-700 font-medium"> motora za kapije</span>,
            <span className="text-yellow-600 font-medium"> LED rasvjete</span> i <span className="text-red-600 font-medium">grijnih sistema i kalorifera</span>.
            Posvećeni smo modernim rješenjima, funkcionalnosti i profesionalnoj podršci.
          </p>
        </motion.div>

        {/* Sekcija sa uslugama */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {[
            {
              icon: <Waves size={40} className="text-blue-600" />,
              title: 'Bazenska rasvjeta',
              desc: 'Elegantna, pouzdana i vodootporna rasvjeta za svaki bazen.'
            },
            {
              icon: <DoorOpen size={40} className="text-green-600" />,
              title: 'Motori za kapije',
              desc: 'Pametna i snažna rješenja za vašu sigurnost i udobnost.'
            },
            {
              icon: <Lightbulb size={40} className="text-yellow-500" />,
              title: 'LED rasvjeta',
              desc: 'Savremeni dizajn i ušteda energije za svaki prostor.'
            },
            {
              icon: <Flame size={40} className="text-red-500" />,
              title: 'Grijanje i kaloriferi',
              desc: 'Učinkovita toplotna rješenja za dom i poslovni prostor.'
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Naša misija */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-200 rounded-2xl shadow-sm p-8 sm:p-12 max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-2xl font-bold text-blue-800 mb-4 tracking-tight">Naša misija</h2>
          <p className="text-gray-700 text-md sm:text-lg leading-relaxed">
            Težimo ka tome da tržištu ponudimo inovativna i pouzdana tehnološka rješenja –
            uz brzu isporuku, fer cijene i profesionalan odnos prema svakom klijentu.
            Naš tim svakodnevno radi na unaprjeđenju ponude i korisničkog iskustva.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
            Želite da sarađujemo?
          </h3>
          <a
            href="/kontakt"
            className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition"
          >
            Kontaktirajte nas
          </a>
        </motion.div>
      </div>
    </div>
    </>
  );
}
