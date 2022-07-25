import { Outlet } from "react-router-dom";
import SideBar from "../../../shared/components/side-bar/SideBar";

export const FullLayout = () => {
  return (
    <div>
      <SideBar />
      <div className="home_content">
        <Outlet />
      </div>
    </div>
  );
};
