import React, { useRef, useCallback } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { getUserTracksByPage } from '../../api/users';
import Table from '../../components/Table';
import { useMeQuery } from '../../hooks/Users/useMeQuery';
import IconPlay from '../../../assets/images/icon-play.svg';
import IconPause from '../../../assets/images/icon-pause.svg';
import usePlayer from '../../hooks/Player/usePlayer';

function transformTracksData(data) {
  let total = 0;
  const tracksTableData = data.pages.reduce((acc, cur) => {
    total = cur.total;
    const items = cur?.items || [];
    items.forEach(({ added_at: addedAt, track = {} }) => {
      const addedAtStr = addedAt ? new Date(addedAt).toDateString() : '';
      const id = track?.id || '';
      const title = track?.name || '';
      const albumName = track?.album?.name || '';
      const albumCover = track?.album?.images?.[2]?.url || '';
      const durationMs = track?.duration_ms || 0;
      const durationMin = Math.floor(durationMs / 1000 / 60);
      const durationSec = String(Math.floor((durationMs / 1000) % 60)).padStart(2, '0');
      const duration = `${durationMin}:${durationSec}`;
      const uri = track?.uri;
      const artistsName = track.artists.map(({ name }) => name).join(', ');

      acc.push({
        addedAt: addedAtStr,
        id,
        title,
        albumName,
        duration,
        uri,
        albumCover,
        artistsName,
      });
    });
    return acc;
  }, []);
  return { total, tableData: tracksTableData };
}

function TracksComponent() {
  const observer = useRef();
  const { isPlayerStateLoading, isPlaying, play } = usePlayer();
  const { isLoading: isUserLoading, data: userData } = useMeQuery();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    status,
  } = useInfiniteQuery('liked_songs', getUserTracksByPage, {
    select: transformTracksData,
    getNextPageParam: (lastPage) => (
      lastPage.next ? { offset: lastPage.offset + 50, limit: 50 } : undefined
    ),
  });

  const loadMoreRef = useCallback((node) => {
    if (status === 'loading') return;
    if (observer.current) {
      observer.current.disconnect();
    }
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (node) observer.current.observe(node);
  }, [hasNextPage]);

  const onPlayBtnClick = useCallback((e) => {
    e.preventDefault();
    const playerData = { context_uri: e.currentTarget.value };
    play(playerData);
  }, [isPlayerStateLoading]);

  if (isUserLoading || isPlayerStateLoading) return null;

  return (
    <div>
      <div />
      {status === 'loading'
        ? null
        : (
          <section className="mt-[-64px] relative">
            <div className="flex h-[30vh] relative pb-[24px] px-[32px] max-w-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[rgba(80,56,160)]" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-half-black" />
              <div className="h-[232px] w-[232px] mr-[24px] self-end z-0">
                <img src="https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png" className="h-full w-full" alt="liked songs" />
              </div>
              <div className="flex flex-col z-0 content-between justify-end text-white">
                <h2 className="text-[12px] mt-[4px]">PLAYLIST</h2>
                <h1 className="text-[96px] leading-[96px] font-black overflow-hidden break-words py-[0.8rem]">Liked Songs</h1>
                <div className="flex items-center mt-[8px] tex-white text-sm leading-4">
                  <div className="grid gap-1 grid-flow-col items-center">
                    <img src={userData?.images?.[0]?.url || ''} className="h-[24px] w-[24px] rounded-[50%]" alt="avatar" />
                    <span className="font-bold">{userData?.display_name || ''}</span>
                  </div>
                  <span className="before:content-['•'] before:mx-[4px]">
                    {data?.total}
                    songs
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute w-full h-[232px] bg-[rgba(80,56,160)] bg-gradient-to-b from-[rgba(0,0,0,.6)] to-[#121212] -z-10" />
            <div className="flex py-[24px] px-[32px]">
              <button type="button" value={userData.uri ? `${userData.uri}:collection` : ''} className="relative mr-[32px]" onClick={onPlayBtnClick}>
                <div className="bg-[#1ed760] w-[56px] h-[56px] rounded-[500px] hover:bg-[#1fdf64] hover:scale-[1.04] active:bg-[#169c46] active:scale-100">
                  {isPlaying
                    ? <IconPause className="fill-current absolute top-[14px] right-[14px]" />
                    : <IconPlay className="fill-current absolute top-[14px] right-[14px]" />}
                </div>
              </button>
            </div>
            <div className="px-[32px] max-w-[1955px]">
              <Table data={data?.tableData} loadMoreRef={loadMoreRef}>
                <Table.Cell
                  name="title"
                  dataKey="title"
                  render={({ rowData, dataKey }) => (
                    <div key={`${dataKey}}-${rowData.id}`} className="flex items-center">
                      <img className="h-[40px] w-[40px] mr-4" src={rowData.albumCover} alt="album cover" />
                      <div className="flex flex-col pr-2">
                        <span className="text-white overflow-hidden text-ellipsis break-all">{rowData.title}</span>
                        <span className="text-sm overflow-hidden text-ellipsis break-all">{rowData.artistsName}</span>
                      </div>
                    </div>
                  )}
                />
                <Table.Cell name="album" dataKey="albumName" />
                <Table.Cell name="date added" dataKey="addedAt" />
              </Table>
            </div>
          </section>
        )}
    </div>
  );
}

function Collection() {
  const { type: collectionType } = useParams();
  const componentMapping = {
    tracks: TracksComponent,
  };

  const ContentComponent = componentMapping[collectionType];

  return <ContentComponent />;
}

export default Collection;
