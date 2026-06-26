import Hero from "../components/Hero";
import {
  Marquee,
  Stats,
  Collection,
  Atelier,
  Stack,
  Contact,
  Footer,
} from "../components/Sections";

export default function Home() {
  return (
    <>
      <Hero defaultModel="/statue.glb" />

      <main>
        <Marquee />
        <Stats />
        <Collection />
        <Atelier />
        <Stack />
        <Contact />
      </main>

      <Footer />

      <div className="vignette" />
      <div className="grain" />
    </>
  );
}
