import { Timeline, TimelineElement } from './components/timeline/Timeline.js'
import { useEffect, useRef } from 'react';

const App: React.FC = () => {
  const timelineRef = useRef<TimelineElement>();

  useEffect(() => {
    const timeline = timelineRef.current;

    if (!timeline) {
      return
    }

    // add a track
    const track = timeline.addTrack({
      title: 'Brian Track 1',
    });

    // add an event to the track
    track.addEvent({
      title: 'Brian Event 1',
      startTime: '2022-01-01T00:30Z',
      endTime: '2022-01-01T05:00Z',
    });

    // add a subtrack
    const subtrack = track.addTrack({
      title: 'Brian Subtrack 1',
    });

    // add an event to the subtrack
    subtrack.addEvent({
      title: 'Brian Event 2',
      startTime: '2022-01-01T00:30Z',
      endTime: '2022-01-01T05:00Z',
    });
  }, []);

  return (
    <div>
      <h1>Hey now timeline!</h1>
      {/* I know I have to do more to impliment :-) */}
      <Timeline
        startTime="2022-01-01T00:00Z"
        endTime="2022-01-02T00:00Z"
        currentTime="2022-01-01T12:00Z"
        ref={timelineRef}
      />
    </div>
  );
};

export default App;
