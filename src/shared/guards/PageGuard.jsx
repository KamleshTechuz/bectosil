import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../components/base/base";
import { CONSTANTS } from "../services/constant.service";

export const PageGuard = (props) => {
  const Component = props.element;
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken("loggedInUser");
    if (!token) {
      navigate(CONSTANTS.navigateToLogin);
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
};

export default PageGuard;
