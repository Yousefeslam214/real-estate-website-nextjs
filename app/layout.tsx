import "./globals.css";
import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PropertiesSidebar } from "./components/PropertiesComponents/PropertiesSidebar";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
// import { Toaster } from "@/components/ui/toaster";
// import PropertiesSidebar from "./components/PropertiesSidebar";
import { Toaster } from "react-hot-toast";
// import { Toast } from "@radix-ui/react-toast";
import { ToastProvider } from "./contexts/ToastContext";

const inter = Inter({ subsets: ["latin"] });
const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Palmline Properties | المصرية للعقارات",
  description:
    "Discover premium real estate opportunities with Palmline Properties. البوابة الرسمية للحكومة المصرية للعقارات - اعثر على أفضل العقارات في مصر.",
  keywords: [
    "Palmline Properties",
    "Egyptian Real Estate",
    "عقارات مصرية",
    "Buy Property Egypt",
    "بيع العقارات",
    "شقق للبيع",
    "فلل للبيع",
    "عقارات القاهرة",
    "عقارات الإسكندرية",
  ],
  authors: [{ name: "Palmline Properties Team", url: "https://palmline.com" }],
  openGraph: {
    title: "Palmline Properties | المصرية للعقارات",
    description:
      "Explore the official for Egyptian real estate. Find apartments, villas, and commercial properties across Egypt.",
    url: "https://palmline.com",
    siteName: "Palmline Properties",
    images: [
      {
        url: "https://palmline.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Palmline Properties - المصرية للعقارات",
      },
    ],
    locale: "en_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Palmline Properties | المصرية للعقارات",
    description:
      "Official Egyptian Palmline Properties Real Estate. Find your dream property in Egypt.",
    images: ["https://palmline.com/twitter-image.jpg"],
  },
  viewport: "width=device-width, initial-scale=1",
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
            <ToastProvider>{children}</ToastProvider>

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
