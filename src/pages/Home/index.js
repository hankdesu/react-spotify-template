import React, { useContext, useMemo } from 'react';

import Shelf from '../../components/Shelf';
import { timeGreeting } from '../../utilities/helper';
import useUserTopItemsQuery from '../../hooks/Users/useUserTopItemsQuery';
import useUserRecentlyPlayedQuery from '../../hooks/Users/useUserRecentlyPlayedQuery';
import useUserTracksQuery from '../../hooks/Users/useUserTracksQuery';
import useNewReleasesQuery from '../../hooks/Albums/useNewReleasesQuery';
import useRecommendationsQuery from '../../hooks/Tracks/useRecommendationsQuery';
import { GenresContext } from '../../store/contextStore';

function Home() {
  const genres = useContext(GenresContext);
  const randomNumber = Math.floor(Math.random() * (126 - 0) + 0);
  const seedGenres = useMemo(() => (genres ? genres[randomNumber] : ''), [genres]);
  const { isLoading, data: topItemsData } = useUserTopItemsQuery({ type: 'tracks', params: { limit: 6 } });
  const {
    isLoading: isRecentlyPlayedLoading, data: recentlyPlayedData,
  } = useUserRecentlyPlayedQuery({ params: { limit: 8 } });
  const {
    isLoading: isUserTracksLoading, data: userTracksData,
  } = useUserTracksQuery({ params: { limit: 8 } });
  const {
    isLoading: isNewReleasesLoading, data: newReleasesData,
  } = useNewReleasesQuery({ params: { limit: 8 } });
  const {
    isLoading: isRecommendationsLoading, data: recommendationsData,
  } = useRecommendationsQuery({
    params: { seed_genres: seedGenres, limit: 8 }, enabled: !!seedGenres,
  });
  const timeGreetingTitle = timeGreeting();

  if (
    isLoading
    || isRecentlyPlayedLoading
    || isUserTracksLoading
    || isNewReleasesLoading
    || isRecommendationsLoading
  ) return null;

  return (
    <div className="relative max-w-[1955px]">
      <main>
        <div className="absolute h-full w-full -z-10" />
        <div className="grid gap-[24px] pt-[24px] px-[32px]">
          <Shelf data={topItemsData} orientation="horizontal" title={timeGreetingTitle} />
          <Shelf data={recentlyPlayedData} orientation="vertical" title="Recently played" />
          <Shelf data={userTracksData} orientation="vertical" title="Your Tracks" />
          <Shelf data={newReleasesData} orientation="vertical" title="New Releases" />
          <Shelf data={recommendationsData} orientation="vertical" title={seedGenres} />
        </div>
      </main>
    </div>
  );
}

export default Home;
