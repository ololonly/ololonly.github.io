import Background from "./components/Background";
import ScrollProgress from "./components/ScrollProgress";
import NavBar from "./components/NavBar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Credentials from "./sections/Credentials";
import Contact from "./sections/Contact";

export default function App() {
  return (
    <>
      <Background />
      <ScrollProgress />
      <NavBar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>
    </>
  );
}
