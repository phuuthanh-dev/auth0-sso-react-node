// Author: TrungQuanDev | https://youtube.com/@trungquandev
import "./App.css";
import Dashboard from "./pages/Dashboard";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { injectFn } from "./utils/customAxios";
import { useEffect } from "react";

function App() {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  // Inject function getAccessTokenSilently vào customAxios
  injectFn(getAccessTokenSilently);

  // Kiểm tra trạng thái đăng nhập SSO: chỉ thực hiện 1 lần khi load trang
  useEffect(() => {
    const checkSSO = async () => {
      try {
        await getAccessTokenSilently();
      } catch (error) {
        console.log("[Silent Auth]", error);
        // Điều hướng đến trang đăng nhập
        // await loginWithRedirect();
      }
    }
    checkSSO();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="app-container">
      <div className="fixed-box">
        <h1>Auth0 SSO 01</h1>
        <div className="actions">
          {/* 2 Button Login và Logout tùy điều kiện hiển thị */}
          {isLoading ? (
            <div className="loading">Loading...</div>
          ) : !isAuthenticated ? (
            <LoginButton />
          ) : (
            <LogoutButton />
          )}
        </div>
        {/* Phần dashboard sau khi đăng nhập */}
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
