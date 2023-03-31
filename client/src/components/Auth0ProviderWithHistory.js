import React from 'react';
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-smy0lct7oni31spt.us.auth0.com";
  const clientId = "49LiusOQku1efCsU4Pw01K9XzQ8nxK4l";

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
        audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://starter-kit-j5ar.onrender.com/api/"
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;