"use client";

import Hero from "../components/Hero";
import Properties from "../components/PropertiesComponents/Properties";
import Services from "../components/Services";
import About from "../components/About";
import News from "../components/NewsComponents/News";
import Contact from "../components/Contact";
export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Hero />
      <Properties />
      <Services />
      <About />
      <News />
      <Contact />
    </main>
  );
}
