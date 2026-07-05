import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { HowIWork } from "./components/how-i-work";
import { Navbar } from "./components/navbar";
import { Projects } from "./components/projects";
import { Services } from "./components/services";
import { TechStack } from "./components/tech-stack";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <TechStack />
        <Experience />
        <HowIWork />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
