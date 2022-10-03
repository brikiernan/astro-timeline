import { useEffect } from 'react';
import { initial } from './data/events';
import { usePlayhead } from './hooks/use-playhead';
import ExperimentalTimeline from './components/ExperimentalTimeline';
import BetaTimeline from './components/BetaTimeline';

const App: React.FC = () => {
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
      <h3>Track's time: {initial.trackTime} hours</h3>
      <br />
      <ExperimentalTimeline playhead={playhead} />
      <br />
      <hr />
      <br />
      <BetaTimeline playhead={playhead} />
    </main>
  );
};

export default App;
