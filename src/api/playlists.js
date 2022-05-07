import { PLAYLISTS, USERS } from '../constants';
import { apiRequest } from '../utilities/apiRequest';

export function getUserPlaylists({ queryKey }) {
  const [, userId] = queryKey;
  return apiRequest({ url: `${USERS}/${userId}${PLAYLISTS}`, params: { limit: 50 } });
}

export function getPlaylist({ queryKey }) {
  const [, playlistId] = queryKey;
  return apiRequest({ url: `${PLAYLISTS}/${playlistId}` });
}
