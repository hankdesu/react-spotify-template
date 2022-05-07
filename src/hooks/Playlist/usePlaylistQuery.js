import { useQuery } from 'react-query';
import { getPlaylist } from '../../api/playlists';

export function usePlaylistQuery(playlistId) {
  return useQuery(['current_playlist', playlistId], getPlaylist);
}
