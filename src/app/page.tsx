import Hero from "../components/Hero";
import Meander from "../components/Meander";
import {
  Stats,
  Collection,
  Atelier,
  Arsenal,
  Contact,
  Footer,
} from "../components/Sections";

export default function Home() {
  return (
    <>
      <Hero defaultModel="/statue.glb" />

      <main>
        <div className="wrap" style={{ paddingTop: 40 }}>
          <Meander />
        </div>

        <div className="wrap" style={{ marginTop: 40 }}>
          <Stats />
        </div>

        <Collection />

        <div className="wrap" style={{ marginTop: 90 }}>
          <Meander />
        </div>

        <Atelier />
        <Arsenal />
        <Contact />
      </main>

      <div className="wrap">
        <Footer />
      </div>

      <div className="grain" />
    </>
  );
}
