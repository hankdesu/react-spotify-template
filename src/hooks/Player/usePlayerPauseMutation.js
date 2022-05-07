import { useQueryClient, useMutation } from 'react-query';

import { putPlayerPause } from '../../api/player';

export default function usePlayerPauseMutation() {
  const queryClient = useQueryClient();

  return useMutation(putPlayerPause, {
    onSuccess: () => {
      queryClient.setQueryData('player_state', (prevState) => ({ ...prevState, is_playing: false }));
    },
  });
}
