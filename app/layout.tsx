import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import PropertiesSidebar from "./components/PropertiesSidebar";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Egyptian Real Estate Portal | البوابة المصرية للعقارات",
  description:
    "Official Egyptian Government Real Estate Portal | البوابة الرسمية للحكومة المصرية للعقارات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${cairo.className}`}>
        <LanguageProvider>
          <ThemeProvider>
            {children}
            <PropertiesSidebar />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
