'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      toast.error('Ime je obavezno');
      return;
    }

    try {
      const res = await fetch('https://formspree.io/f/xeoqjwzn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success('Poruka uspešno poslata!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error('Greška pri slanju. Pokušaj ponovo.');
      }
    } catch (error) {
      toast.error('Došlo je do greške.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white bg-opacity-40 backdrop-blur-md rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col md:flex-row gap-12">
        {/* Kontakt info */}
        <div className="md:w-1/3 flex flex-col justify-center space-y-10 text-indigo-900">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">Kontakt - Led Tehnika</h1>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Phone
                className="text-amber-600"
                aria-hidden="true"
                size={24}
              />
              <a
                href="tel:+38166676620"
                className="text-lg sm:text-xl font-semibold hover:text-amber-800 transition"
                aria-label="Pozovi broj 066 676 620"
              >
                066/676-620
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Phone
                className="text-amber-600"
                aria-hidden="true"
                size={24}
              />
              <a
                href="tel:+38165983652"
                className="text-lg sm:text-xl font-semibold hover:text-amber-800 transition"
                aria-label="Pozovi broj 065 983 652"
              >
                065/983-652
              </a>
            </div>
            <div className="flex items-center gap-4">
              <MapPin
                className="text-amber-600"
                aria-hidden="true"
                size={24}
              />
              <p className="text-lg sm:text-xl font-semibold max-w-xs">
                Sime Matavulja 144, Nova Topola 78418
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="md:w-2/3 bg-white bg-opacity-80 rounded-2xl p-8 sm:p-10 shadow-lg"
          noValidate
        >
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="block py-3 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer transition"
              placeholder=" "
            />
            <label
              htmlFor="name"
              className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-amber-600"
            >
              Ime i Prezime
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block py-3 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer transition"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-amber-600"
            >
              Email
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <textarea
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="block py-3 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amber-600 peer resize-none transition"
              placeholder=" "
            />
            <label
              htmlFor="message"
              className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-amber-600"
            >
              Poruka
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600  text-white font-bold py-4 rounded-xl hover:bg-amber-700 shadow-lg transition duration-300 ease-in-out"
          >
            Pošalji
          </button>
        </form>
      </div>
    </div>
  );
}
