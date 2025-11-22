import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manuel de Veille Médiatique Audiovisuelle",
  description: "Système de gestion pour la veille médiatique audiovisuelle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
