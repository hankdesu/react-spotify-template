import { useQuery } from 'react-query';
import { getNewReleases } from '../../api/albums';

function transformNewReleases(data) {
  const { albums = {} } = data;
  const { items = [] } = albums;
  const itemsData = items.map((item) => {
    const {
      id = '',
      name = '',
      images = [],
      artists = [],
    } = item;
    const artistsCount = artists.length;
    const artistNames = artistsCount > 3
      ? artists.slice(0, 3).map(({ name: artistName }) => artistName).push('and more')
      : artists.map(({ name: artistName }) => artistName || '');
    return {
      id,
      name,
      image: images[0]?.url || '',
      artistNames: artistNames.join(', '),
    };
  });
  return itemsData;
}

export default function useNewReleasesQuery({ params }) {
  return useQuery(['albums_new_release', params], getNewReleases, { retry: false, select: transformNewReleases });
}
