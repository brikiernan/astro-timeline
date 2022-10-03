import { events, initial } from '../data/events';
import {
  RuxTimeline,
  RuxTimeRegion,
  RuxTrack,
  RuxRuler,
  RuxIcon,
  RuxSlider,
} from '@astrouxds/react';

interface BetaTimelineProps {
  playhead: string;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  zoom: number;
}

const BetaTimeline: React.FC<BetaTimelineProps> = props => {
  const { playhead, setZoom, zoom } = props;

  const handleClick = (e: React.MouseEvent) => {
    // @ts-ignore
    const icon = e.target.icon;

    if (icon === 'add') {
      setZoom(prev => {
        if (prev >= 10) return prev;
        return prev + 1;
      });
    }

    if (icon === 'remove') {
      setZoom(prev => {
        if (prev <= 0) return prev;
        return prev - 1;
      });
    }

    return;
  };

  return (
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
        <div className='zoom' slot='label'>
          <RuxIcon icon='remove' size='1.5rem' onClick={handleClick} />

          <RuxSlider
            min={0}
            max={10}
            value={zoom}
            onRuxinput={e => setZoom(e.target.value)}
          />

          <RuxIcon icon='add' size='1.5rem' onClick={handleClick} />
        </div>
        <RuxRuler />
      </RuxTrack>
    </RuxTimeline>
  );
};

export default BetaTimeline;
