import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import AppRouter from './router';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter basename="/react-spotify-template">
        <AppRouter />
      </HashRouter>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

root.render(<App tab="home" />);
