import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);
const store = setupStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


