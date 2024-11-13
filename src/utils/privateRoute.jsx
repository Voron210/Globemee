import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/TalentContext/UserContext";

const PrivateRouter = () => {
  const { userData, authentication } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    authentication();
  }, []);

  useEffect(() => {
    if (!userData) return;
    const currentPath = location.pathname;

    /*Turn off redirect */

    if (currentPath === "/talent-login" || currentPath === "/talent-signup") {
      if (userData.registrationStep === 0) {
        navigate("/talent-onboarding");
      } else if (userData.registrationStep === 100) {
        navigate("/talent-home");
      }
    } else {
      switch (userData.registrationStep) {
        case 0:
          if (currentPath !== "/talent-onboarding") {
            navigate("/talent-onboarding");
          }
          break;
        case 100:
          if (currentPath === "/talent-onboarding") {
            navigate("/talent-home");
          }
          break;
        default:
          // console.log(currentPath);
          break;
      }
    }
  }, [userData, navigate]);

  return <Outlet />;
};

export default PrivateRouter;
