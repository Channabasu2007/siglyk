import "./globals.css";
import 'material-symbols';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Providers>
        <Navbar />
        {children}
        <Footer />
        </Providers>
      </body>
    </html>
  );
}