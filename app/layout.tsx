import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import CustomCursor from "@/components/ui/CustomCursor";
import LoadingScreen from "@/components/ui/LoadingScreen";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const jost = Jost({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "ALVINA | Haute Couture & Ready-to-Wear",
  description: "Wear the Silence of Luxury. ALVINA — luxury Turkish haute couture & ready-to-wear.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="font-sans antialiased transition-colors duration-300">
        <LoadingScreen />
        <CustomCursor />
        <Navbar />
        {children}
        <CartDrawer />
        <Footer />
      </body>
    </html>
  );
}
