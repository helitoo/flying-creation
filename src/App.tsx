import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import Works from "./sections/Works";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";

const App = () => {
  return (
    <ThemeProvider>
      <div
        id="app"
        className="min-h-screen w-full bg-white dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors duration-300"
      >
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
    </ThemeProvider>
  );
};

export default App;
