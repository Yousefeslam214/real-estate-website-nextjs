import Header from './components/Header';
import Hero from './components/Hero';
import Properties from './components/Properties';
import Services from './components/Services';
import About from './components/About';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Properties />
      <Services />
      <About />
      <News />
      <Contact />
      <Footer />
    </main>
  );
}