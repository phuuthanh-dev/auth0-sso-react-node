// Author: TrungQuanDev | https://youtube.com/@trungquandev
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { RENDER_API_ENPOINT } from "../utils/constants";
import customAxiosInstance from "../utils/customAxios";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [privateUsers, setPrivateUsers] = useState(null);

  useEffect(() => {
    const fetchPrivateUsers = async () => {
      const res = await customAxiosInstance.get(`${RENDER_API_ENPOINT}/api-v1/users/private/get_all`);
      setPrivateUsers(res.data);
    }
    if (isAuthenticated) fetchPrivateUsers()
  }, [isAuthenticated])

  if (!isAuthenticated) return null
  
  return (
    <div className="dashboard">
      <div className="user-from-auth0">
        <div className="title">Current user from Auth0:</div>
        <div className="preview-user">
          {isLoading  
            ? <div className="loading">Loading...</div>
            : <>
              <img
                className="user-avatar"
                src={user?.picture}
                alt={user?.name}
              />
              <div className="user-info">
                <p>
                  Sub: <span className="value">{user?.sub}</span>
                </p>
                <p>
                  Email: <span className="value">{user?.email}</span>
                </p>
                <p>
                  Name: <span className="value">{user?.name}</span>
                </p>
              </div>
            </>
          }
        </div>
        {user &&
          <div className="more-info">
            <ReactJson
              enableClipboard={false}
              collapsed={true}
              theme={"google"}
              src={user}
            />
          </div>
        }
      </div>

      <div className="user-from-our-database">
        <div className="title">All user from our database:&nbsp;
          <span className="highlight">
            {privateUsers?.length}
          </span>
        </div>
        <img className="user-avatar"
            src={"https://raw.githubusercontent.com/phuuthanh-dev/tour-management/d756b6b9c8815dbc90940e835a9f9fd4d0b5ed60/public/images/logo.svg"}
            alt={"trungquandev"}
          />
          {!privateUsers
            ? <div className="loading">Loading...</div>
            : <div className="more-info">
                <ReactJson
                  enableClipboard={false}
                  collapsed={true}
                  theme={"google"}
                  src={privateUsers}
                />
              </div>
          }
      </div>
    </div>
  );
};

export default Dashboard;
