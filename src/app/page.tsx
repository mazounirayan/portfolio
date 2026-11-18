import SmoothScroll from '@/components/SmoothScroll';
import Intro from '@/components/Intro';
import Hero from '@/components/Hero';
import Portal from '@/components/Portal';
import Work from '@/components/Work';
import Interests from '@/components/Interests';
import FilmStrip from '@/components/FilmStrip';
import Contact from '@/components/Contact';
import LoopEnd from '@/components/LoopEnd';
import PlayerProvider from '@/components/player/PlayerProvider';
import Playlist from '@/components/player/Playlist';
import NowPlaying from '@/components/player/NowPlaying';

export default function Home() {
  return (
    <PlayerProvider>
      <SmoothScroll>
        <Intro />
        <main>
          <Hero />
          <Portal />
          <Work />
          <Interests />
          <FilmStrip />
          <Playlist />
          <Contact />
          <LoopEnd />
        </main>
        <NowPlaying />
      </SmoothScroll>
    </PlayerProvider>
  );
}
