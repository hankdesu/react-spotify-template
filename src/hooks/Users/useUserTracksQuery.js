import { useQuery } from 'react-query';
import { getUserTracks } from '../../api/users';

function transformUserTracks(data) {
  const { items = [] } = data;
  const itemsData = items.map((item) => {
    const { track = {} } = item;
    const {
      album = {},
      id = '',
      name = '',
      artists = [],
    } = track;
    const artistsCount = artists.length;
    const artistNames = artistsCount > 3
      ? artists.slice(0, 3).map(({ name: artistName }) => artistName).push('and more')
      : artists.map(({ name: artistName }) => artistName || '');
    return {
      id,
      name,
      image: album?.images[0]?.url || '',
      artistNames: artistNames.join(', '),
    };
  });
  return itemsData;
}

export default function useUserTracksQuery({ params, useSelector = true, selectorFn }) {
  return useQuery(['user_tracks', params], getUserTracks, { retry: false, ...(useSelector ? { select: selectorFn || transformUserTracks } : {}) });
}
