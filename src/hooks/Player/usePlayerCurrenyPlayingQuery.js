import { useQuery } from 'react-query';
import { getCurrentPlaying } from '../../api/player';

function transformData(data) {
  const { item = {} } = data;
  const { album, name = '', artists = [] } = item;
  const albumImage = album?.images?.[2]?.url || '';
  const artistNames = artists.map(({ name: artistName }) => artistName).join(', ');
  return {
    albumImage,
    name,
    artistNames,
  };
}

export default function usePlayerCurrentPlayingQuery({ enabled = true } = {}) {
  return useQuery('current_playing', getCurrentPlaying, { select: transformData, enabled });
}
