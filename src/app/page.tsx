import Hero from "../components/Hero";
import Gate from "../components/Gate";
import Transition from "../components/Transition";
import StickyImages from "../components/StickyImages";
import Cursor from "../components/Cursor";
import HeadingReveals from "../components/HeadingReveals";
import {
  Marquee,
  Collection,
  Atelier,
  Stack,
  Contact,
  Footer,
} from "../components/Sections";

export default function Home() {
  return (
    <>
      <Gate />
      <Transition />
      <StickyImages />
      <Cursor />
      <HeadingReveals />

      <Hero />

      <main>
        <Marquee />
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
