import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Table from '../../components/Table';

import { usePlaylistQuery } from '../../hooks/Playlist/usePlaylistQuery';
import IconMusic from '../../../assets/images/icon-music.svg';
import IconPlay from '../../../assets/images/icon-play.svg';
import IconPause from '../../../assets/images/icon-pause.svg';
import usePlayer from '../../hooks/Player/usePlayer';

const coverColors = {
  0: 'bg-144-24-48',
  1: 'bg-72-160-176',
  2: 'bg-184-96-0',
  3: 'bg-240-24-48',
  4: 'bg-80-32-32',
  5: 'bg-144-144-152',
  6: 'bg-160-80-80',
  7: 'bg-48-56-80',
  8: 'bg-128-72-72',
  9: 'bg-112-152-216',
  10: 'bg-72-32-40',
  11: 'bg-83-83-83',
  12: 'bg-48-48-64',
  13: 'bg-16-136-184',
  14: 'bg-216-16-136',
};

function Playlist() {
  const { id: playlistId } = useParams();
  const { isPlayerStateLoading, isPlaying, play } = usePlayer();
  const { isLoading: isPlaylistLoading, data: playlistData } = usePlaylistQuery(playlistId);
  const [tableData, setTableData] = useState([]);
  const [coverBackgroundColor, setCoverBackgroundColor] = useState('');

  const playlistImage = playlistData?.images?.[0]?.url;
  const name = playlistData?.name;
  const description = playlistData?.description;
  const ownerName = playlistData?.owner?.display_name;
  const followerCount = playlistData?.followers?.total;
  const totalSongs = playlistData?.tracks?.total;

  useEffect(() => {
    if (playlistData) {
      const randomNumber = Math.floor(Math.random() * (Object.keys(coverColors).length - 0) + 0);
      const items = playlistData?.tracks?.items || [];
      const data = items.map(({ added_at: addedAt, track = {} }) => {
        const addedAtStr = addedAt ? new Date(addedAt).toDateString() : '';
        const id = track?.id || '';
        const title = track?.name || '';
        const albumName = track?.album?.name || '';
        const durationMs = track?.duration_ms || 0;
        const durationMin = Math.floor(durationMs / 1000 / 60);
        const durationSec = String(Math.floor((durationMs / 1000) % 60)).padStart(2, '0');
        const duration = `${durationMin}:${durationSec}`;
        const uri = track?.uri;

        return {
          addedAt: addedAtStr,
          id,
          title,
          albumName,
          duration,
          uri,
        };
      });
      setTableData(data);
      setCoverBackgroundColor(coverColors[randomNumber]);
    }
  }, [playlistData]);

  const onPlayBtnClick = useCallback((e) => {
    e.preventDefault();
    const playerData = { context_uri: e.currentTarget.value };
    play(playerData);
  }, [isPlayerStateLoading]);

  if (isPlaylistLoading) return null;

  return (
    <section className="mt-[-64px] relative">
      <div className="flex h-[30vh] relative pb-[24px] px-[32px] max-w-none">
        <div className={`absolute top-0 left-0 w-full h-full ${coverBackgroundColor}`} />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-half-black" />
        <div className="h-[232px] w-[232px] mr-[24px] self-end z-0 bg-[#282828] shadow-3xl flex items-center justify-center text-[#7f7f7f]">
          <IconMusic className="fill-current" />
          {playlistImage && <img src={playlistImage} className="h-full w-full" alt="playlist" />}
        </div>
        <div className="flex flex-col z-0 content-between justify-end text-white">
          <h2 className="text-[12px] mt-[4px]">PLAYLIST</h2>
          <h1 className="text-[96px] leading-[96px] font-black overflow-hidden break-words">{name}</h1>
          <h2 className="mt-[8px] text-[rgba(255,255,255,.7)] text-[14px] leading-[16px] overflow-hidden break-words">
            {description}
          </h2>
          <div className="flex items-center mt-[8px] tex-white text-sm leading-4">
            <span className="font-bold">{ownerName}</span>
            <span className="before:content-['•'] before:mx-[4px]">
              {followerCount}
              likes
            </span>
            <span className="before:content-['•'] before:mx-[4px]">
              {totalSongs}
              songs
            </span>
          </div>
        </div>
      </div>
      <div className={`absolute w-full h-[232px] ${coverBackgroundColor} bg-gradient-to-b from-[rgba(0,0,0,.6)] to-[#121212] -z-10`} />
      <div className="flex py-[24px] px-[32px]">
        {tableData.length > 0 && (
          <button type="button" value={playlistData?.uri || ''} className="relative mr-[32px]" onClick={onPlayBtnClick}>
            <div className="bg-[#1ed760] w-[56px] h-[56px] rounded-[500px] hover:bg-[#1fdf64] hover:scale-[1.04] active:bg-[#169c46] active:scale-100">
              {isPlaying
                ? <IconPause className="fill-current absolute top-[14px] right-[14px]" />
                : <IconPlay className="fill-current absolute top-[14px] right-[14px]" />}
            </div>
          </button>
        )}
      </div>
      <div className="px-[32px] max-w-[1955px]">
        <Table data={tableData}>
          <Table.Cell name="title" dataKey="title" />
          <Table.Cell name="album" dataKey="albumName" />
          <Table.Cell name="date added" dataKey="addedAt" />
        </Table>
      </div>
    </section>
  );
}

// value={userData.uri ? `${userData.uri}:collection` : ''}

export default Playlist;
