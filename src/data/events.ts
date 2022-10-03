const setIso = (time: number) => new Date(time).toISOString();
const setHours = (hours: number) => 1000 * 60 * 60 * hours;
const time = new Date().getTime();
const trackTime = 24;

export const initial = {
  end: setIso(time + setHours(trackTime)),
  playhead: setIso(time + setHours(2.5)),
  start: setIso(time),
  zoom: 3,
  trackTime,
};

export const events = [
  {
    id: 1,
    start: setIso(time + setHours(0.75)),
    end: setIso(time + setHours(1.75)),
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    title: 'reprehenderit est deserunt velit ipsam',
    status: 'critical',
    subEvent: {
      start: setIso(time + setHours(1.5)),
      end: setIso(time + setHours(3)),
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      status: 'caution',
    },
  },
  {
    id: 2,
    start: setIso(time + setHours(1.5)),
    end: setIso(time + setHours(2)),
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    title: 'accusamus beatae ad facilis cum similique qui sunt',
    status: 'caution',
    subEvent: {
      start: setIso(time + setHours(4)),
      end: setIso(time + setHours(5)),
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      status: 'critical',
    },
  },
  {
    id: 3,
    start: setIso(time + setHours(3)),
    end: setIso(time + setHours(3.75)),
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
    title: 'officia porro iure quia iusto qui ipsa ut modi',
    status: 'normal',
    subEvent: {
      start: setIso(time + setHours(2.25)),
      end: setIso(time + setHours(4)),
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      status: 'caution',
    },
  },
  {
    id: 4,
    start: setIso(time + setHours(9)),
    end: setIso(time + setHours(11.25)),
    avatar: 'https://randomuser.me/api/portraits/women/19.jpg',
    title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
    status: 'serious',
    subEvent: {
      start: setIso(time + setHours(12)),
      end: setIso(time + setHours(15)),
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      status: 'standby',
    },
  },
  {
    id: 5,
    start: setIso(time + setHours(4.25)),
    end: setIso(time + setHours(5.5)),
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    title: 'natus nisi omnis corporis facere molestiae rerum in',
    status: 'standby',
    subEvent: {
      start: setIso(time + setHours(5)),
      end: setIso(time + setHours(8)),
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      status: 'caution',
    },
  },
];
