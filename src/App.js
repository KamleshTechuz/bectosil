// css
import "./App.css";

// modules
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "boxicons";

// layouts
import { ContentLayout } from "./components/layouts/Content-layout/Content.layout";
import { FullLayout } from "./components/layouts/full-layout/Full.layout";

// routes
import { AuthRoutes } from "./components/auth/Auth.routes";
import { PagesRoutes } from "./components/pages/Pages.routes";

// guards
import PageGuard from "./shared/guards/PageGuard";
import AuthGuard from "./shared/guards/AuthGuard";

// variable
import { customTheme } from "./shared/global-data/Global.data";

customTheme();

export const App = () => {
  
  // setting page title
  const location = useLocation();
  const urlArr = location.pathname.split("/");
  const title = urlArr[urlArr.length - 1];
  document.title = title ? title.toUpperCase() + " | Bectosil" : "Bectosil";

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<AuthGuard element={ContentLayout} />}>
          <Route path="auth/*" element={<AuthRoutes />} />
        </Route>

        <Route path="/" element={<PageGuard element={FullLayout} />}>
          <Route path="/*" element={<PagesRoutes />} />
        </Route>
      </Routes>
    </div>
  );
};
