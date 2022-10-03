import { useEffect, useState } from 'react';
import { initial } from '../data/events';

export const usePlayhead = () => {
  const [playhead, setPlayhead] = useState(initial.playhead);

  useEffect(() => {
    const tickIntereval = 1000 * 5; // 5 seconds

    const interval = setInterval(() => {
      setPlayhead(prev => {
        const tick = new Date(prev).getTime() + tickIntereval;
        return new Date(tick).toISOString();
      });
    }, tickIntereval);

    return () => clearInterval(interval);
  }, []);

  return playhead;
};
