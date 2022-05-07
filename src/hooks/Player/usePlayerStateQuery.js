import { useQuery } from 'react-query';
import { getPlayerState } from '../../api/player';

export default function usePlayerStateQuery() {
  return useQuery('player_state', getPlayerState, { retry: false });
}
