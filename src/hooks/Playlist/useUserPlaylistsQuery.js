import { useQuery } from 'react-query';
import { getUserPlaylists } from '../../api/playlists';

export function useUserPlaylistsQuery(userId) {
  return useQuery(['user_playlists', userId], getUserPlaylists, { enabled: !!userId, retry: false });
}
