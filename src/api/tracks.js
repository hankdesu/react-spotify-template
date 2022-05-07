import { RECOMMENDATIONS } from '../constants';
import { apiRequest } from '../utilities/apiRequest';

export function getRecommendations({ queryKey }) {
  const [, params] = queryKey;
  return apiRequest({ url: RECOMMENDATIONS, params });
}
