import React, { useCallback } from 'react';

import usePlayer from '../../hooks/Player/usePlayer';
import usePlayerCurrentPlayingQuery from '../../hooks/Player/usePlayerCurrenyPlayingQuery';
import IconPlay from '../../../assets/images/icon-play.svg';
import IconPause from '../../../assets/images/icon-pause.svg';
import IconMusic from '../../../assets/images/icon-music.svg';

function NowPlayer() {
  const { isPlayerStateLoading, isPlaying, play } = usePlayer();
  const {
    isLoading: isCurrentPlayingLoading, data: currentPlayingData,
  } = usePlayerCurrentPlayingQuery();

  const onPlayBtnClick = useCallback((e) => {
    e.preventDefault();
    play({});
  }, [isPlaying]);

  if (isPlayerStateLoading || isCurrentPlayingLoading) return null;

  return (
    <div className="h-full flex justify-between px-[16px] items-center">
      <div className="flex items-center w-[30%]">
        <div className="relative bg-[#282828] h-[56px] w-[56px]">
          <div>
            <div className="absolute top-[35%] right-[35%] left-[35%] bottom-[35%]">
              <IconMusic viewBox="0 0 80 81" className="h-full w-full text-white" />
            </div>
          </div>
          {isPlaying ? <img src={currentPlayingData.albumImage} alt="album cover" className="absolute" /> : null}
        </div>
        <div className="flex flex-col mx-[12px]">
          {isPlaying ? (
            <>
              <span className="text-white text-sm">{currentPlayingData.name}</span>
              <span className="text-[#b3b3b3] text-xs">{currentPlayingData.artistNames}</span>
            </>
          ) : null}
        </div>
      </div>
      <div className="w-2/5">
        <div className="flex">
          <div />
          <button type="button" className="h-[32px] w-[32px] rounded-[32px] bg-white flex items-center justify-center" onClick={onPlayBtnClick}>
            {isPlaying ? <IconPause className="fill-current h-[20px] w-[20px]" /> : <IconPlay className="fill-current h-[20px] w-[20px]" />}
          </button>
          <div className="w-[30%]" />
        </div>
      </div>
      <div />
    </div>
  );
}

export default NowPlayer;
