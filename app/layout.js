import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from './_components/CartContext'; // Adjust the path accordingly
import MenuItems from "./_components/MenuItems";
import ScrollToTop from "./_components/ScrolltoTop";


const inter = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: "Led Tehnika – Ekskluzivni uvoznik LED rasvjete",
  description:
    "Led Tehnika je ekskluzivni uvoznik bazenske rasvjete, LED rasvjete, motora za kapije, kalolifera, grijanja i još mnogo toga.",
  keywords: [
    "LED rasvjeta",
    "bazenska rasvjeta",
    "motori za kapije",
    "grijanje",
    "kaloliferi",
    "uvoznik rasvjete",
    "Led Tehnika"
  ],
  metadataBase: new URL("https://ledtehnika.com"), 
  openGraph: {
    title: "Led Tehnika",
    description:
      "Ekskluzivni uvoznik LED i bazenske rasvjete, motora za kapije, grijanja i kalolifera.",
    url: "https://ledtehnika.com",
    siteName: "Led Tehnika",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Led Tehnika cover",
      },
    ],
    type: "website",
  },
 
 icons: {
  icon: "/favicon.ico",             
  shortcut: "/favicon.ico",          
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
     {
      url: "/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      url: "/favicon.png",
      sizes: "48x48",
      type: "image/png",
    },
  ],
},

  
};
;



export default function RootLayout({ children }) {
  return (
    <html lang="en">
    
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <div className="pt-24">
            <ScrollToTop />

            {children}
          </div>
          <Toaster duration={1000} richColors  />
          <MenuItems />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
