import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext/AdminContext";

const PrivateRouteAdmin = () => {
  const { authentication, jobOffers } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    authentication();
  }, []);

  useEffect(() => {
    if (!jobOffers) return;
    const currentPath = location.pathname;

    if (currentPath === "/adminportal") {
      navigate("/admin-dashboard");
    }
  }, [jobOffers, navigate]);

  useEffect(() => {}, [navigate]);

  return <Outlet />;
};

export default PrivateRouteAdmin;
