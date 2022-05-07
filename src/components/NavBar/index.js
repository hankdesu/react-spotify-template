import React from 'react';
import { Link } from 'react-router-dom';

import Banner from '../Banner';
import ToolBar from '../ToolBar';
import NavList from '../NavList';
import { useMeQuery } from '../../hooks/Users/useMeQuery';
import { useUserPlaylistsQuery } from '../../hooks/Playlist/useUserPlaylistsQuery';

function NavBar() {
  const { data: userData } = useMeQuery();
  const userId = userData?.id;
  const { data: userPlaylistsData } = useUserPlaylistsQuery(userId);
  const playlists = userPlaylistsData?.items;

  return (
    <div className="flex flex-col text-base-grey bg-black h-full pt-[24px]">
      <div>
        <Link to="/home">
          <Banner />
        </Link>
      </div>
      <div>
        <ToolBar />
      </div>
      <div>
        <NavList playlists={playlists} />
      </div>
    </div>
  );
}

export default NavBar;
