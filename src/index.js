import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import './reset.css';
import './common.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router/router';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <App />
        </PersistGate>
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
