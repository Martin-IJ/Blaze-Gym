import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/react";
import Toast from "@/components/Toast/Toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  style: ["italic", "normal"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Blaze Gym Fitness",
  description:
    "Join Blaze Gym Fitness and ignite your fitness journey with expert coaching and top-tier equipment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Blaze Gym Fitness - Ignite Your Fitness Journey</title>
        <meta
          name="description"
          content="Join Blaze Gym Fitness and ignite your fitness journey with expert coaching and top-tier equipment."
        />
        <meta
          property="og:title"
          content="Blaze Gym Fitness - Ignite Your Fitness Journey"
        />
        <meta
          property="og:description"
          content="Join Blaze Gym Fitness and ignite your fitness journey with expert coaching and top-tier equipment."
        />
        <meta property="og:image" content="https://www.blazegymfitness.fit/images/og-image.jpg" />
        <meta property="og:url" content="https://www.blazegymfitness.fit" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Blaze Gym Fitness - Ignite Your Fitness Journey"
        />
        <meta
          name="twitter:description"
          content="Join Blaze Gym Fitness and ignite your fitness journey with expert coaching and top-tier equipment."
        />
        <meta name="twitter:image" content="https://www.blazegymfitness.fit/images/twitter-image.png" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Gym",
            name: "Blaze Gym Fitness",
            description:
              "Join Blaze Gym Fitness and ignite your fitness journey with expert coaching and top-tier equipment.",
            url: "https://www.blazegymfitness.fit",
            address: {
              "@type": "PostalAddress",
              streetAddress: "3 Alhaji hammed abokede street",
              addressLocality: "Ojo",
              addressRegion: "Lagos",
              postalCode: "100242",
              addressCountry: "NG",
            },
            telephone: "+2348089700589",
          })}
        </script>
      </head>
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
