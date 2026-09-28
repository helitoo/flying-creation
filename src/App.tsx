import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Works from "./sections/Works";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const App = () => {
  return (
    <div id="app" className="min-h-screen w-full bg-white text-neutral-900 selection:bg-neutral-900 selection:text-white">
      {/* Floating Pill Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="w-full">
        <Home />
        <Works />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default App;
