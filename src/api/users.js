import {
  ME,
  ME_TOP,
  RECENTLY_PLAYED,
  USER_TRACKS,
} from '../constants';
import { apiRequest } from '../utilities/apiRequest';

export function getUserProfile() {
  return apiRequest({ url: ME });
}

export function getUserTopItems({ queryKey }) {
  const [, { type = 'tracks', params }] = queryKey;
  return apiRequest({ url: `${ME_TOP}/${type}`, params });
}

export function getUserRecentlyPlayed({ queryKey }) {
  const [, params] = queryKey;
  return apiRequest({ url: RECENTLY_PLAYED, params });
}

export function getUserTracks({ queryKey }) {
  const [, params] = queryKey;
  return apiRequest({ url: USER_TRACKS, params });
}

export function getUserTracksByPage({ pageParam = { limit: 50 } }) {
  return apiRequest({ url: USER_TRACKS, params: pageParam });
}
