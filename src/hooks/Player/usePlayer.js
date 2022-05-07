import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

import usePlayerStateQuery from './usePlayerStateQuery';
import usePlayerPlayMutation from './usePlayerPlayMutation';
import usePlayerPauseMutation from './usePlayerPauseMutation';
import usePlayerCurrentPlayingQuery from './usePlayerCurrenyPlayingQuery';

export default function usePlayer() {
  const queryClient = useQueryClient();
  const { isLoading: isPlayerStateLoading, data: playerStateData } = usePlayerStateQuery();
  const { mutate: pauseMutate } = usePlayerPauseMutation();
  const { refetch: currentPlayingRefetch } = usePlayerCurrentPlayingQuery({ enabled: false });
  const { mutate: playMutate } = usePlayerPlayMutation(currentPlayingRefetch);

  const play = useCallback((data) => {
    const playerState = queryClient.getQueryData('player_state');
    const isPlaying = playerState?.is_playing || false;
    if (!isPlaying) {
      playMutate({ data });
    } else {
      pauseMutate({});
    }
  }, [playerStateData]);

  return {
    isPlayerStateLoading,
    playerStateData,
    isPlaying: playerStateData?.is_playing || false,
    play,
  };
}
