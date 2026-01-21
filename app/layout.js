import "./globals.css";
import 'material-symbols';
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}