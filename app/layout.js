import { Outfit } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from './_components/CartContext';
import MenuItems from "./_components/MenuItems";
import ScrollToTop from "./_components/ScrolltoTop";

const inter = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: "Led Tehnika – Motor za kapiju, LED rasvjeta, Bazenska rasvjeta",
    template: "%s | Led Tehnika"
  },
  description:
    "Led Tehnika je ekskluzivni uvoznik i distributer motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja. Kvalitetni proizvodi po najboljim cijenama.",
  alternates: {
    canonical: "https://ledtehnika.com",  
  },
  metadataBase: new URL("https://ledtehnika.com"), 
  openGraph: {
    title: "Led Tehnika – Motor za kapiju, LED i bazenska rasvjeta",
    description:
      "motor za kapiju,Led rasvjeta,Bazenska rasvjeta,Kaloliferi,Grijanje,motori za kapije,Led traka,zidna lampa",
    url: "https://ledtehnika.com",
    siteName: "Led Tehnika",
    images: [
      {
        url: "https://ledtehnika.com/logo-black.png",
        width: 1200,
        height: 630,
        alt: "Led Tehnika - Motor za kapiju, LED rasvjeta",
      },
    ],
    type: "website",
    locale: "bs_BA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Led Tehnika – Motor za kapiju, LED rasvjeta",
    description: "Ekskluzivni uvoznik motora za kapije, LED i bazenske rasvjete",
    images: ["https://ledtehnika.com/logo-black.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LED Tehnika",
  "url": "https://ledtehnika.com",
  "logo": "https://ledtehnika.com/logo-black.png",
  "telephone": "+38766676620",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sime Matavulja 144",
    "addressLocality": "Nova Topola",
    "postalCode": "78418",
    "addressCountry": "BA"
  },
  "sameAs": [
    "https://www.facebook.com/p/LED-Tehnika-100063252848248/",
    "https://www.instagram.com/led_tehnika/"
  ]
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://ledtehnika.com/#localbusiness",
  "name": "LED Tehnika",
  "image": "https://ledtehnika.com/logo-black.png",
  "url": "https://ledtehnika.com",
  "telephone": "+38766676620",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sime Matavulja 144",
    "addressLocality": "Nova Topola",
    "postalCode": "78418",
    "addressCountry": "BA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.0",
    "longitude": "17.0"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "08:00",
    "closes": "17:00"
  },
  "sameAs": [
    "https://www.facebook.com/p/LED-Tehnika-100063252848248/",
    "https://www.instagram.com/led_tehnika/"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Led Tehnika",
  "url": "https://ledtehnika.com",
  "description": "Led Tehnika je ekskluzivni uvoznik i distributer motora za kapije, LED rasvjete, bazenske rasvjete, kalolifera i grijanja.",
  "publisher": {
    "@type": "Organization",
    "name": "Led Tehnika",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ledtehnika.com/logo-black.png"
    }
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://ledtehnika.com/proizvodi?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="bs">
      <body className={inter.className}>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <CartProvider>
          <Header />
          <div className="pt-24">
            <ScrollToTop />
            {children}
          </div>
          <Toaster duration={1000} richColors />
          <MenuItems />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
