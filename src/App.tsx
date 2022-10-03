import { useEffect, useState } from 'react';
import { initial } from './data/events';
import { usePlayhead } from './hooks/use-playhead';
import ExperimentalTimeline from './components/ExperimentalTimeline';
import BetaTimeline from './components/BetaTimeline';

const App: React.FC = () => {
  const [zoom, setZoom] = useState(initial.zoom);
  const playhead = usePlayhead();

  /**
   * React.useEffect runs twice on initial load in development with
   * React.StrictMode. To disable this behavior comment out or
   * remove React.StrictMode in index.tsx
   *
   * React.useEffect also runs on each save in development
   */
  useEffect(() => console.log('Logging...'), []);

  return (
    <main>
      <ExperimentalTimeline {...{ playhead, zoom }} />
      <br />
      <BetaTimeline {...{ playhead, setZoom, zoom }} />
      <br />
      <p>Zoom: {zoom}</p>
      <br />
      <p>Track time: {initial.trackTime} hours</p>
    </main>
  );
};

export default App;
