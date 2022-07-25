import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CONSTANTS } from "../services/constant.service";
import { getToken } from "../components/base/base";

export const AuthGuard = (props) => {
  const Component = props.element;
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken("loggedInUser");
    if (token) {
      navigate(CONSTANTS.navigateToUser);
    }
  });

  return (
    <div>
      <Component />
    </div>
  );
};

export default AuthGuard;
