import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PropertiesSidebar } from "./components/PropertiesSidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import { Toaster } from "@/components/ui/toaster";
// import PropertiesSidebar from "./components/PropertiesSidebar";
import { Toaster } from "react-hot-toast";

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
            <Header />
            {children}

                    {/* <Toaster position="top-right" reverseOrder={false} /> */}
                    <Toaster position="top-right" reverseOrder={false} />

            <PropertiesSidebar />
            <Footer />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
