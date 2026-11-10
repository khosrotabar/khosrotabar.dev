import { About } from "./components/sections/about";
import { BrandsStrip } from "./components/sections/brands-strip";
import { Capabilities } from "./components/sections/capabilities";
import { Contact } from "./components/sections/contact";
import { Domains } from "./components/sections/domains";
import { Experience } from "./components/sections/experience";
import { Hero } from "./components/sections/hero";
import { Interactive } from "./components/sections/interactive";
import { Principles } from "./components/sections/principles";
import { ProcessReel } from "./components/sections/process-reel";
import { Services } from "./components/sections/services";
import { TechOrbit } from "./components/sections/tech-orbit";
import { Terminal } from "./components/sections/terminal";
import { Work } from "./components/sections/work";
import { Writing } from "./components/sections/writing";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsStrip />
      <About />
      <Services />
      <TechOrbit />
      <Work />
      <ProcessReel />
      <Capabilities />
      <Domains />
      <Experience />
      <Principles />
      <Writing />
      <Terminal />
      <Interactive />
      <Contact />
    </main>
  );
}
