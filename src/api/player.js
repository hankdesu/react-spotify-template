import {
  ME_PLAYER,
  PLAYER_PLAY,
  PLAYER_PAUSE,
  PLAYER_CURRENT_PLAYING,
  PLAYER_DEVICES,
} from '../constants';
import { apiRequest } from '../utilities/apiRequest';

export function getPlayerState({ params }) {
  return apiRequest({ url: ME_PLAYER, params });
}

export function getCurrentPlaying(params) {
  return apiRequest({ url: PLAYER_CURRENT_PLAYING, params });
}

export function getAvailableDevices() {
  return apiRequest({ url: PLAYER_DEVICES });
}

export function putPlayerPlay({ data }) {
  return apiRequest({ url: PLAYER_PLAY, method: 'PUT', data });
}

export function putPlayerPause({ params }) {
  return apiRequest({ url: PLAYER_PAUSE, method: 'PUT', params });
}
