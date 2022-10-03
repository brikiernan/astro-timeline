import { RuxIcon, RuxSlider } from '@astrouxds/react';

interface ZoomProps {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  zoom: number;
  isLabelSlot?: boolean;
  max?: number;
  min?: number;
}

const Zoom: React.FC<ZoomProps> = ({
  setZoom,
  zoom,
  isLabelSlot = false,
  max = 10,
  min = 0,
}) => {
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
    <div className='zoom' slot={isLabelSlot ? 'label' : undefined}>
      <RuxIcon icon='remove' size='1.5rem' onClick={handleClick} />

      <RuxSlider
        min={min}
        max={max}
        value={zoom}
        onRuxinput={e => setZoom(e.target.value)}
      />

      <RuxIcon icon='add' size='1.5rem' onClick={handleClick} />
    </div>
  );
};

export default Zoom;
