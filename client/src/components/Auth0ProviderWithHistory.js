import React from 'react';
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-kunji.uk.auth0.com";
  const clientId = "XbiA3jYGuPSsRyr0D3d4lBXxDJjhYKLw";

  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/admin/users",
        audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://www.prisonhelpline.org/"
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;