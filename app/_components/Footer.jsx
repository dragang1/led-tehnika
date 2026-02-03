import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Phone, MapPin, Mail, Truck, Shield, CreditCard, Headphones, ArrowRight } from 'lucide-react'

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <>
            {/* Trust Badges Section - Separate from Footer */}
            <section className="bg-gradient-to-b from-gray-50 to-white border-y border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {/* Brza dostava - Blue */}
                        <div className="group flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3 text-center sm:text-left p-3 sm:p-4 rounded-xl bg-white border border-blue-100 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-400/20 rounded-xl blur-md group-hover:bg-blue-400/30 transition-all duration-300" />
                                <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-gray-800 font-semibold text-xs sm:text-sm group-hover:text-blue-600 transition-colors">Brza dostava</h4>
                                <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">Gradiška, Banja Luka, Laktaši, Srbac, Prnjavor, Prijedor, BiH</p>
                            </div>
                        </div>
                        
                        {/* Garancija - Green */}
                        <div className="group flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3 text-center sm:text-left p-3 sm:p-4 rounded-xl bg-white border border-green-100 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="relative">
                                <div className="absolute inset-0 bg-green-400/20 rounded-xl blur-md group-hover:bg-green-400/30 transition-all duration-300" />
                                <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-gray-800 font-semibold text-xs sm:text-sm group-hover:text-green-600 transition-colors">Garancija</h4>
                                <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">Na sve proizvode</p>
                            </div>
                        </div>
                        
                        {/* Sigurna kupovina - Purple */}
                        <div className="group flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3 text-center sm:text-left p-3 sm:p-4 rounded-xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-400/20 rounded-xl blur-md group-hover:bg-purple-400/30 transition-all duration-300" />
                                <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-gray-800 font-semibold text-xs sm:text-sm group-hover:text-purple-600 transition-colors">Sigurna kupovina</h4>
                                <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">Plaćanje pouzećem</p>
                            </div>
                        </div>
                        
                        {/* Podrška - Orange */}
                        <div className="group flex flex-col sm:flex-row items-center sm:items-center gap-2.5 sm:gap-3 text-center sm:text-left p-3 sm:p-4 rounded-xl bg-white border border-orange-100 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100/50 transition-all duration-300 hover:-translate-y-1">
                            <div className="relative">
                                <div className="absolute inset-0 bg-orange-400/20 rounded-xl blur-md group-hover:bg-orange-400/30 transition-all duration-300" />
                                <div className="relative w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                                    <Headphones className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                            </div>
                            <div>
                                <h4 className="text-gray-800 font-semibold text-xs sm:text-sm group-hover:text-orange-600 transition-colors">Podrška</h4>
                                <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5">Stručni savjeti</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pre-footer za SEO – linkovi i kratki tekst točno prije footera */}
            <section className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                        {/* Internal linkovi – kategorije i stranice */}
                        <div>
                            <h2 className="text-gray-900 font-semibold text-lg mb-4">
                                Led Tehnika – motori za kapiju, LED i bazenska rasvjeta
                            </h2>
                            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm" aria-label="Kategorije i stranice">
                                <Link href="/motori-za-kapiju" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Motori za kapiju
                                </Link>
                                <Link href="/kategorije/automatizacija" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Automatizacija
                                </Link>
                                <Link href="/kategorije/bazenska-rasvjeta" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Bazenska rasvjeta
                                </Link>
                                <Link href="/kategorije/home-dekor" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Home dekor
                                </Link>
                                <Link href="/proizvodi" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Svi proizvodi
                                </Link>
                                <Link href="/kontakt" className="text-gray-600 hover:text-blue-600 transition-colors">
                                    Kontakt
                                </Link>
                            </nav>
                        </div>
                        {/* Kratki SEO tekst */}
                        <div className="text-gray-600 text-sm leading-relaxed">
                            <p className="mb-3">
                                Led Tehnika je ekskluzivni uvoznik motora za kapije, LED rasvjete i bazenske opreme u Bosni i Hercegovini. Nudimo motore za klizne i krilne kapije, LED rasvjetu i prateću opremu za automatizaciju, uz garanciju i dostavu na teritoriji cijele BiH.
                            </p>
                            <p>
                                Dostava: Gradiška, Banja Luka, Laktaši, Doboj, Brcko, Prnjavor, Prijedor i ostala mjesta u BiH. Za savjet i narudžbu kontaktirajte nas putem telefona ili kontakt forme.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-slate-900 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 -left-40 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                </div>

                {/* Main Footer Content */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
                        
                        {/* Company Info */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div className="relative w-[140px] h-[45px] mb-5">
                                <Image 
                                    src="/logo-black.png" 
                                    fill
                                    alt="LED Tehnika logo"
                                    className="brightness-0 invert"
                                    sizes="140px"
                                    priority
                                />
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed mb-5 max-w-sm">
                                Ekskluzivni uvoznik motora za kapije, LED rasvjete i bazenske opreme u Bosni i Hercegovini.
                            </p>
                            
                            {/* Social Links */}
                            <div className="flex gap-3">
                                <Link
                                    href="https://www.facebook.com/p/LED-Tehnika-100063252848248/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 bg-white/10 hover:bg-blue-600 text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-blue-500"
                                    aria-label="Facebook"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                                    </svg>
                                </Link>
                                <Link
                                    href="https://www.instagram.com/led_tehnika/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 text-slate-200 hover:text-white rounded-lg flex items-center justify-center transition-all duration-300 border border-white/10 hover:border-pink-500/50"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h4 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                                <span className="w-6 h-0.5 bg-blue-400 rounded-full" />
                                Kontakt
                            </h4>
                            
                            <div className="space-y-4">
                                {/* Phone Numbers */}
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-400/20">
                                        <Phone className="w-4 h-4 text-blue-300" />
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-x-3 gap-y-0.5">
                                        <a href="tel:+38766676620" className="text-white hover:text-blue-300 text-sm font-medium transition-colors">
                                            066/676-620
                                        </a>
                                        <a href="tel:+38765983652" className="text-white hover:text-blue-300 text-sm font-medium transition-colors">
                                            065/983-652
                                        </a>
                                    </div>
                                </div>
                                
                                {/* Address */}
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-blue-400/20">
                                        <MapPin className="w-4 h-4 text-blue-300" />
                                    </div>
                                    <span className="text-slate-200 text-sm pt-2">Sime Matavulja 144,<br />Nova Topola 78418</span>
                                </div>
                                
                                {/* Email/Contact Button */}
                                <Link 
                                    href="/kontakt" 
                                    className="group inline-flex items-center gap-2 mt-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-all duration-300"
                                >
                                    <Mail className="w-4 h-4" />
                                    Pošalji upit
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Working Hours */}
                        <div>
                            <h4 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                                <span className="w-6 h-0.5 bg-blue-400 rounded-full" />
                                Radno vrijeme
                            </h4>
                            
                            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-4 space-y-2">
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                                        <span className="text-white text-sm font-medium">Pon - Pet</span>
                                    </div>
                                    <span className="text-white text-sm font-semibold">08:00 - 17:00</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/10">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                                        <span className="text-white text-sm font-medium">Subota</span>
                                    </div>
                                    <span className="text-white text-sm font-semibold">08:00 - 14:00</span>
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-red-400 rounded-full" />
                                        <span className="text-slate-300 text-sm">Nedjelja</span>
                                    </div>
                                    <span className="text-slate-300 text-sm">Zatvoreno</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="relative border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <p className="text-slate-300 text-sm text-center sm:text-left">
                                &copy; {currentYear} <span className="text-white font-medium">LED Tehnika</span> · Sva prava zadržana
                            </p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-5 text-sm">
                               
                                <Link href="/politika-privatnosti" className="text-slate-300 hover:text-white transition-colors">
                                    Politika privatnosti
                                </Link>
                                <span className="text-slate-400 text-xs">
                                    Design by{' '}
                                    <a
                                        href="https://www.novawebstudio.co/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-slate-300 hover:text-white transition-colors underline"
                                    >
                                        Nova Web Studio
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
