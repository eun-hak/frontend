import './styles/globalStyle.css';

import axios from 'axios';
import AsyncBoundary from 'components/AsyncBoundary';
import { CACHE_TIME } from 'constants/cacheTime';
import { BadGateway } from 'pages';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initialize } from 'react-ga';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import App from './App';
initialize('UA-74092126-2');

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: CACHE_TIME.MINUTE_5,
      staleTime: CACHE_TIME.MINUTE_5,
    },
  },
});
const PROXY_URL = window.location.hostname === 'localhost' ? '' : '/proxy';

axios.defaults.baseURL = PROXY_URL;
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AsyncBoundary pendingFallback={<></>} rejectedFallback={() => <BadGateway />}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <App />
          <ReactQueryDevtools />
        </RecoilRoot>
      </QueryClientProvider>
    </AsyncBoundary>
  </React.StrictMode>
);
