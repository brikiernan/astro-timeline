import { useState } from 'react';
import { events, initial } from '../data/events';
import {
  RuxTimeline,
  RuxTimeRegion,
  RuxTrack,
  RuxRuler,
} from '@astrouxds/react';
import Zoom from './Zoom';

interface BetaTimelineProps {
  playhead: string;
}

const BetaTimeline: React.FC<BetaTimelineProps> = ({ playhead }) => {
  const [zoom, setZoom] = useState(initial.zoom);

  return (
    <>
      <RuxTimeline
        start={initial.start}
        end={initial.end}
        playhead={playhead}
        interval='hour'
        zoom={zoom}
      >
        <RuxTrack>
          <p slot='label'>Track 1</p>
          {events.map(({ avatar, end, id, start, status, title }) => (
            <RuxTimeRegion
              key={id}
              start={start}
              end={end}
              status={status as any}
            >
              <div className='time-region'>
                <p className='time-region-title'>{title}</p>
                <img
                  width={24}
                  height={24}
                  style={{ borderRadius: '50%' }}
                  src={avatar}
                  alt={avatar}
                />
              </div>
            </RuxTimeRegion>
          ))}
        </RuxTrack>

        <RuxTrack slot='ruler'>
          <Zoom {...{ setZoom, zoom }} isLabelSlot />
          <RuxRuler />
        </RuxTrack>
      </RuxTimeline>
      <br />
      {<p>Beta Zoom: {zoom}</p>}
    </>
  );
};

export default BetaTimeline;
