import { useQueryClient, useMutation } from 'react-query';

import { putPlayerPlay } from '../../api/player';

export default function usePlayerPlayMutation(currentPlayingRefetch) {
  const queryClient = useQueryClient();

  return useMutation(putPlayerPlay, {
    onSuccess: () => {
      currentPlayingRefetch();
      queryClient.setQueryData('player_state', (prevState) => ({ ...prevState, is_playing: true }));
    },
  });
}
