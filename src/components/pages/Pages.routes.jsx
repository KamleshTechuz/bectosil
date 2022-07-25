import { Routes, Route } from "react-router-dom";
import { WorkinHours } from "./WorkingHours/WorkingHours";
import { Ranking } from "./Ranking/Ranking";
import { User } from "./User/User";
import { LeaveReport } from "./LeaveReport/LeaveReport";
import { WinnersReport } from "./WinnersReport/WinnersReport";
import { LeavesDetails } from "./LeaveReport/LeavesDetails";
import { Award } from "./Ranking/Award";
import { NotFound } from "../../shared/components/not-found/Not-Found";

export const PagesRoutes = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/user" element={<User />} />
        <Route exact path="/working-hours-report" element={<WorkinHours />} />
        <Route exact path="/leaves-report" element={<LeaveReport />} />
        <Route exact path="/leaves-report/detail" element={<LeavesDetails />} />
        <Route exact path="/winners-report" element={<WinnersReport />} />
        <Route exact path="/ranking" element={<Ranking />} />
        <Route exact path="/ranking/award" element={<Award />} />
        <Route path="*" exact={true} element={<NotFound />} />
      </Routes>
    </div>
  );
};
