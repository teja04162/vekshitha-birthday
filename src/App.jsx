import React, { useState } from 'react';
import Preloader from './components/Preloader';
import AudioPlayer from './components/AudioPlayer';
import BackgroundDecoration from './components/BackgroundDecoration';
import Hero from './components/Hero';
import PreciousMoments from './components/PreciousMoments';
import Gallery from './components/Gallery';
import HeartfeltLetter from './components/HeartfeltLetter';
import Reasons from './components/Reasons';
import Timeline from './components/Timeline';
import Wishes from './components/Wishes';
import FinalSurprise from './components/FinalSurprise';

function App() {
  const [loading, setLoading] = useState(true);

  const handleExplore = () => {
    // Scroll to the memories section smoothly
    const memoriesSection = document.getElementById('memories');
    if (memoriesSection) {
      memoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {!loading && (
        <div className="relative w-full text-gray-800 selection:bg-rose-200">
          <BackgroundDecoration />
          <AudioPlayer />

          <main className="relative flex flex-col items-center">
            <Hero onExplore={handleExplore} />
            <PreciousMoments />
            <Gallery />
            <HeartfeltLetter />
            <Reasons />
            <Timeline />
            <Wishes />
            <FinalSurprise />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
