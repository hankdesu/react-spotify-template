import { useQuery } from 'react-query';
import { getUserRecentlyPlayed } from '../../api/users';

function transformUserRecentlyPlayed(data) {
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
    const artistNames = artists.slice(0, 3).map(({ name: artistName }) => artistName);

    if (artistsCount > 3) artistNames.push('and more');

    return {
      id,
      name,
      image: album?.images[0]?.url || '',
      artistNames: artistNames.join(', '),
    };
  });
  return itemsData;
}

export default function useUserRecentlyPlayedQuery({ params }) {
  return useQuery(['user_recently_played', params], getUserRecentlyPlayed, { retry: false, select: transformUserRecentlyPlayed });
}
