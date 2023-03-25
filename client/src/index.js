import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";

createRoot(document.getElementById("root")).render(
	<Auth0Provider
		domain="dev-smy0lct7oni31spt.us.auth0.com"
		clientId="49LiusOQku1efCsU4Pw01K9XzQ8nxK4l"
    authorizationParams={{
			redirect_uri: window.location.origin + "/admin/users",
			audience: process.env.NODE_ENV === "development" ? "http://localhost:3000/api/" : "https://starter-kit-j5ar.onrender.com/api/"
    }}
  >
		<BrowserRouter>
			<App />
		</BrowserRouter>
  </Auth0Provider>
);
