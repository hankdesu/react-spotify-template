import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';

import IconCollection from '../../../assets/images/icon-collection.svg';
import IconCollectionActive from '../../../assets/images/icon-collection-active.svg';
import IconSearch from '../../../assets/images/icon-search.svg';
import IconSearchActive from '../../../assets/images/icon-search-active.svg';
import IconHome from '../../../assets/images/icon-home.svg';
import IconHomeActive from '../../../assets/images/icon-home-active.svg';

function ToolBar() {
  const homeMatch = useMatch('/home');
  const searchMatch = useMatch('/search');
  const collectionMatch = useMatch('/collection');

  return (
    <ul>
      <NavLink to="/home" className={({ isActive }) => (isActive ? 'text-white' : 'text-inherit')}>
        <li className="flex items-center px-[24px] h-[40px] gap-[16px] hover:text-white active:text-white">
          {homeMatch ? <IconHomeActive className="fill-current" /> : <IconHome className="fill-current" />}
          <span className="text-[0.875rem]">Home</span>
        </li>
      </NavLink>
      <NavLink to="/search">
        <li className="flex items-center px-[24px] h-[40px] gap-[16px] hover:text-white active:text-white">
          {searchMatch ? <IconSearchActive className="fill-current" /> : <IconSearch className="fill-current" />}
          <span className="text-[0.875rem]">Search</span>
        </li>
      </NavLink>
      <NavLink to="/collection">
        <li className="flex items-center px-[24px] h-[40px] gap-[16px] hover:text-white active:text-white">
          {collectionMatch ? <IconCollectionActive className="fill-current" /> : <IconCollection className="fill-current" />}
          <span className="text-[0.875rem]">Your Library</span>
        </li>
      </NavLink>
    </ul>
  );
}

export default ToolBar;
