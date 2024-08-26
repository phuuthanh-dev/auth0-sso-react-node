// Author: TrungQuanDev | https://youtube.com/@trungquandev
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { RENDER_API_ENPOINT } from "./utils/constants.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-t4ml81w2dt2fr1z2.us.auth0.com"
    clientId="rLiZOdYNaUYPJBep9ZkZe7Y22jojpVjm"
    authorizationParams={{ 
      redirect_uri: window.location.origin,
      audience: RENDER_API_ENPOINT // cần thêm audience để nhận được valid token từ Auth0
    }}
    // Refresh token
    useRefreshTokens={true} // default is false
    useRefreshTokensFallback={true} // default is false

    // SSO
    // cacheLocation="localstorage"
    cacheLocation="memory" // default is memory, để sử dụng SSO thì cần chuyển về memory
    cookieDomain=".phuuthanh.local"
  >
    <App />
  </Auth0Provider>
);
