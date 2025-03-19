import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
    </div>
  );
}

export default App;