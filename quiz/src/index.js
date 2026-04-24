import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-4qvcpdg6vfkv0i6p.us.auth0.com"
    clientId="hcJRAPLxpdCypA7156u5l0VkVMdtmB7H"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience:'https://quiz-api.local',
      scope: "openid profile email"
    }}
  >

      <App />
  
  </Auth0Provider>
);