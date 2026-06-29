import Hero from "../components/Hero";
import Gate from "../components/Gate";
import Transition from "../components/Transition";
import Cursor from "../components/Cursor";
import HeadingReveals from "../components/HeadingReveals";
import PinnedStack from "../components/PinnedStack";
import {
  Marquee,
  Collection,
  Atelier,
  Contact,
  Footer,
} from "../components/Sections";

export default function Home() {
  return (
    <>
      <Gate />
      <Transition />
      <Cursor />
      <HeadingReveals />

      <Hero />

      <main>
        <Marquee />
        <Collection />
        <Atelier />
        <PinnedStack />
        <Contact />
      </main>

      <Footer />

      <div className="vignette" />
      <div className="grain" />
    </>
  );
}
