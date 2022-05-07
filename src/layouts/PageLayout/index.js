import React from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import NowPlayer from '../../components/NowPlayer';

function PageLayout() {
  return (
    <div className="h-screen grid grid-rows-layout grid-cols-layout">
      <nav className="w-[262px]">
        <NavBar />
      </nav>
      <div className="min-h-0 overflow-y-scroll scrollbar">
        <div className="w-full sticky h-[64px] top-0" />
        <Outlet />
      </div>
      <footer className="h-[90px] row-start-2 col-span-3 bg-[#181818] border-t-[1px] border-solid border-[#282828]">
        <NowPlayer />
      </footer>
    </div>
  );
}

export default PageLayout;
