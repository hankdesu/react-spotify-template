import { AVAILABLE_GENRE_SEEDS } from '../constants';
import { apiRequest } from '../utilities/apiRequest';

export function getAvailableGenreSeeds() {
  return apiRequest({ url: AVAILABLE_GENRE_SEEDS });
}
