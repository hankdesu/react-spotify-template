import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Playlist from '../pages/Playlist';
import Collection from '../pages/Collection';
import Empty from '../pages/Empty';
import AuthProvider from '../provider/AuthProvider';
import GenresProvider from '../provider/GenresProvider';
import PageLayout from '../layouts/PageLayout';

function AppRouter() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route element={<GenresProvider><PageLayout /></GenresProvider>}>
          <Route path="/home" element={<Home />} />
          <Route path="/playlist/:id" element={<Playlist />} />
          <Route path="/collection/:type" element={<Collection />} />
          <Route path="*" element={<Empty />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default AppRouter;
