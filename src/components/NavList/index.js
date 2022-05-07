import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import IconLovedSongs from '../../../assets/images/icon-loved-songs.svg';
import IconAddPlaylist from '../../../assets/images/icon-add-playlist.svg';

function ListItems({ id, name }) {
  return (
    <NavLink to={`/playlist/${id}`} className={({ isActive }) => (isActive ? 'text-white' : 'text-inherit')}>
      <li className="flex px-[24px] h-[32px] items-center justify-start hover:text-white active:text-white">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap block text-[14px]">
          {name}
        </span>
      </li>
    </NavLink>
  );
}

function NavList({ playlists }) {
  return (
    <div className="flex flex-col mt-[24px]">
      <div className="flex items-center px-[24px] h-[40px] gap-[16px] opacity-70 cursor-pointer hover:opacity-100 text-white transition-opacity duration-200 ease-linear p-[8px]">
        <div className="bg-white rounded-[1px] h-[24px] w-[24px] flex items-center justify-center">
          <IconAddPlaylist className="fill-current text-black" />
        </div>
        <span className="text-[14px] cursor-not-allowed">Create Playlist</span>
      </div>
      <NavLink to="/collection/tracks">
        {({ isActive }) => (
          <div className={`flex items-center px-[24px] h-[40px] gap-[16px] ${isActive ? '' : 'opacity-70'} cursor-pointer hover:opacity-100 text-white transition-opacity duration-200 ease-linear p-[8px]`}>
            <div className="bg-gradient-to-br from-[#450af5] to-[#c4efd9] rounded-[1px] h-[24px] w-[24px] flex items-center justify-center">
              <IconLovedSongs className="fill-current" />
            </div>
            <span className="text-[14px]">Liked Songs</span>
          </div>
        )}
      </NavLink>
      <div>
        <hr className="h-[1px] bg-[#282828] mt-[8px] mx-[24px] border-none" />
        <div className="h-[16px]" />
      </div>
      <ul>
        {playlists ? playlists.map(({ id, name }) => <ListItems key={`list-${id}`} id={id} name={name} />) : null}
      </ul>
    </div>
  );
}

ListItems.defaultProps = {
  id: '',
  name: '',
};

ListItems.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};

NavList.defaultProps = {
  playlists: [],
};

NavList.propTypes = {
  playlists: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string, name: PropTypes.string })),
};

export default NavList;
