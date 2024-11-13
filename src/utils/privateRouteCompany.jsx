import { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCompany } from "../context/CompanyContext/CompanyContext";
import axiosInstance from "../lib/axios/AxiosConfig";

const PrivateRouter = () => {
  const {
    getCompanyData,
    companyData,
    getCompanyProfile,
    getPhotos,
    getCompanyMatch,
    authentication,
  } = useCompany();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const emailResetToken = searchParams.get("emailResetToken");
  const passwordResetToken = searchParams.get("passwordResetToken");

  const loginByToken = async () => {
    try {
      //get session
      await axiosInstance.post("/c_authentication/login_by_token", {
        emailResetToken: emailResetToken,
        passwordResetToken: passwordResetToken,
      });

      setSearchParams({});
      authentication();
    } catch (error) {}
  };

  // const authorization = async () => {
  //   if (emailResetToken && passwordResetToken) {
  //     loginByToken();
  //     setSearchParams({});
  //   }
  //   getCompanyData();
  //   getCompanyProfile();
  //   getCompanyMatch();
  //   getPhotos();
  // };

  useEffect(() => {
    if (
      location.pathname !== "/company-login" &&
      location.pathname !== "/company-signup" &&
      emailResetToken &&
      passwordResetToken
    ) {
      loginByToken();
    } else {
      authentication();
    }

    // authorization();
  }, []);

  useEffect(() => {
    if (!companyData) return;
    const currentPath = location.pathname;

    if (currentPath === "/company-login" || currentPath === "/company-signup") {
      navigate("/company-profile");
    }
  }, [companyData, navigate]);

  return <Outlet />;
};

export default PrivateRouter;
