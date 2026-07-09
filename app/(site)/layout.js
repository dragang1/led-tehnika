import Header from "../_components/Header";
import Footer from "../_components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from '../_components/CartContext';
import MenuItems from "../_components/MenuItems";
import ScrollToTop from "../_components/ScrolltoTop";

export default function SiteLayout({ children }) {
  return (
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
  );
}
