import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { withRouter } from "../../navigator/Navigator";
import { CONSTANTS } from "../../services/constant.service";
import { getToken, logout } from "../base/base";

const navItems = [
  {
    id: 1,
    name: "Ranking",
    icon: "bx bx-star",
    url: CONSTANTS.navigateToRanking,
  },
  {
    id: 2,
    name: "Users",
    icon: "bx bx-user",
    url: CONSTANTS.navigateToUser,
  },
  {
    id: 3,
    name: "Working Hours",
    icon: "bx bx-time-five",
    url: CONSTANTS.navigateToWorkingHours,
  },
  {
    id: 4,
    name: "Leaves Report",
    icon: "bx bx-file",
    url: CONSTANTS.navigateToLeavesReport,
  },
  {
    id: 5,
    name: "Winners Report",
    icon: "bx bx-file",
    url: CONSTANTS.navigateToWinnersReport,
  },
];

export const SideBar = () => {
  const [userName, setUserName] = useState("Unknown User");

  const navigate = useNavigate();
  const logOut = () => {
    logout();
    navigate(CONSTANTS.navigateToLogin);
  };

  useEffect(() => {
    const token = getToken("loggedInUser");
    setUserName(token.name);
  }, []);

  return (
    <div>
      <div className="sidebar">
        <div className="logo_content">
          <div className="logo">
            <div className="login-key" style={{ fontSize: "50px" }}>
              Bectosil
            </div>
          </div>
        </div>
        <ul className="nav_list">
          <li>
            <i className="bx bx-search"></i>
            <input type="email" placeholder="Search..." />
          </li>
          {navItems.map((item) => {
            return (
              <li key={item.id}>
                <Link to={item.url}>
                  <i className={item.icon}></i>
                  <span className="links_name">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="profile_content">
          <div className="profile">
            <div className="profile_deatils">
              <div className="avatar">
                <span
                  className="avatar-content"
                  style={{ height: "50px", width: "50px" }}
                >
                  {userName.charAt(0).toUpperCase() +
                    userName.split(" ")[1].charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="name_job">
                <div className="name">{userName}</div>
              </div>
            </div>
            <button type="button" className="btn" onClick={logOut}>
              <i className="bx bx-log-out" id="log_out"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SideBar);
