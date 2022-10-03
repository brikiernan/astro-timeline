import { useEffect, useRef } from 'react';
import { events, initial } from '../data/events';
import {
  Timeline,
  TimelineElement,
  TimelineEventElement,
} from './timeline/Timeline';

interface ExperimentalTimelineProps {
  playhead: string;
  zoom: number;
}

const ExperimentalTimeline: React.FC<ExperimentalTimelineProps> = props => {
  const { playhead, zoom } = props;
  const timelineRef = useRef<TimelineElement | null>(null);

  /**
   * This React.useEffect will always run twice on initial load in development
   * when using React.StrictMode. This behavior falls away in production.
   *
   * This also runs on each save in development.
   *
   * Because we are using React.useEffect (a side effet in React's eyes) to
   * render to the dom, on initial load we will get 2 timlines unless
   * React.StrictMode is removed at index.tsx.
   *
   * Plus, an additional timeline will be rendered on each save irregardless
   * of React.StrictMode being enabled or not.
   */
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    let event: TimelineEventElement;
    const logTimelineEvent = (ev: TimelineEventElement) => console.log(ev);

    // add a track
    const track = timeline.addTrack({
      title: 'Track 1',
    });

    events.forEach(({ end, start, status, title }) => {
      // add an event to the track
      event = track.addEvent({
        title,
        startTime: start,
        endTime: end,
        status: status as any,
        // subtitle seems to break the layout
        // subtitle: 'This is the sub title.',
      });

      event.addEventListener('mouseenter', () => logTimelineEvent(event));

      const div = document.createElement('div');
      div.innerText = 'Added to event.';
      event.appendChild(div);
    });

    // add a subtrack
    const subtrack = track.addTrack({
      title: 'Subtrack 1',
    });

    events.forEach(({ subEvent: { end, start, status, title } }) => {
      // add an event to the subtrack
      subtrack.addEvent({
        title,
        startTime: start,
        endTime: end,
        status: status as any,
        // subtitle seems to break the layout
        // subtitle: 'This is the sub title.',
      });
    });

    return () => {
      event.removeEventListener('mouseenter', () => logTimelineEvent(event));
    };
  }, []);

  return (
    <Timeline
      ref={timelineRef}
      startTime={initial.start}
      endTime={initial.end}
      currentTime={playhead}
      zoom={zoom}
    />
    // <Timeline
    //   ref={timelineRef}
    //   startTime={initial.start}
    //   endTime={initial.end}
    //   currentTime={playhead}
    //   zoom={zoom}
    // >
    //   <div slot='track'>Track 1</div> or a component with props
    //   <div slot='event'>Event 1</div> or a component with props
    // </Timeline>
  );
};

export default ExperimentalTimeline;
