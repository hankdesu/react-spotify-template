import { BROWSE_NEW_RELEASE } from '../constants';
import { apiRequest } from '../utilities/apiRequest';

export function getNewReleases({ queryKey }) {
  const [, params] = queryKey;
  return apiRequest({ url: BROWSE_NEW_RELEASE, params });
}
