import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { createRoot } from 'react-dom/client';
import { persistor, store } from './store/store';
import reportWebVitals from './reportWebVitals';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <React.StrictMode>
    <Auth0Provider
      clientId={process.env.REACT_APP_AUTH0_ID as string}
      domain={process.env.REACT_APP_AUTH0_DOMAIN as string}
      authorizationParams={{
        redirect_uri:
          process.env.NODE_ENV === 'production'
            ? 'file://callback'
            : window.location.origin,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      }}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div>
            <Toaster position="top-center" />
          </div>
          <App />
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
