import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/react"
import Toast from "@/components/Toast/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Blaze Gym Fitness",
  description: "Blaze Gym Fitness: Ignite Your Fitness Journey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toast />
        <main className="font-normal">
          <Header />
          {children}
          <Footer />
        </main>
      </body>
      <Analytics />
    </html>
  );
}
