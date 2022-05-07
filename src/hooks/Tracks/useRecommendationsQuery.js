import { useQuery } from 'react-query';
import { getRecommendations } from '../../api/tracks';

function transformRecommendations(data) {
  const { tracks = [] } = data;
  const itemsData = tracks.map((item) => {
    const {
      album = {},
      id = '',
      name = '',
      artists = [],
    } = item;
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

export default function useRecommendationsQuery({ params, enabled }) {
  return useQuery(['recommendations', params], getRecommendations, { retry: false, enabled, select: transformRecommendations });
}
