import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserContext from './UserContext/UserContext';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

// Create a React Query client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContext>
        <App />
      </UserContext>
    </QueryClientProvider>
  </React.StrictMode>
);

// Performance measurement (optional)
reportWebVitals();