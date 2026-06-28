import Hero from "../components/Hero";
import IntroLoader from "../components/IntroLoader";
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
      <IntroLoader />
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
