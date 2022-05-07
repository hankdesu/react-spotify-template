import { useQuery } from 'react-query';
import { getUserProfile } from '../../api/users';

export function useMeQuery() {
  return useQuery('user', getUserProfile, { retry: false });
}
