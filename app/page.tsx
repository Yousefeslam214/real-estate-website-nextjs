import Hero from "./components/Hero";
import Properties from "./components/Properties";
import Services from "./components/Services";
import About from "./components/About";
import News from "./components/News";
import Contact from "./components/Contact";
import { Suspense } from "react";
import { ButtonLoading } from "./components/ButtonLoading";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Hero />
      <Suspense fallback={<ButtonLoading />}>
        <Properties />
      </Suspense>
      <Services />
      <About />
      <News />
      <Contact />
    </main>
  );
}
