import React, { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import styles from "./AdminNavBar.module.css";
import { useAdmin } from "../../context/AdminContext/AdminContext";
import AdminTalentView from "../AdminTalentView/AdminTalentView";
import AdminJobOfferView from "../AdminJobOfferView/AdminJobOfferView";
import AdminCompanyView from "../AdminCompanyView/AdminCompanyView";

const AdminNavBar = () => {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();
  // const isModalOpen = location.pathname.includes("/t/");
  // const { talentId } = useParams();
  const [searchParams] = useSearchParams();
  const talentId = searchParams.get("talentId");
  const joboffer_id = searchParams.get("joboffer_id");
  const company_id = searchParams.get("company_id");

  useEffect(() => {
    if (joboffer_id || talentId || company_id) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      if (!joboffer_id && !talentId && !company_id) {
        document.documentElement.style.overflow = "";
      }
    };
  }, [joboffer_id, talentId, company_id]);

  const buttons = [
    { label: "Dashboard", path: "/admin-dashboard" },
    { label: "Matching-Tool", path: "/admin-matching-tool" },
    { label: "Talente", path: "/admin-talents" },
    { label: "Stellenanzeigen", path: "/admin-job-offers" },
    { label: "Unternehmen", path: "/admin-companies" },
  ];

  return (
    <>
      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.headerContainer}>
            <div className={styles.headerlogo}>
              <h5>globemee</h5>
              <p
                className="text-xs-medium"
                style={{ textAlign: "right", color: "var(--orange-80)" }}
              >
                ADMINPORTAL
              </p>
            </div>
            {buttons.map((button, index) => (
              <div
                key={index}
                className={`${styles.headerBtn} ${
                  location.pathname === button.path && styles.selectedBtn
                }`}
                onClick={() => {
                  // window.scrollTo({ top: 0, behavior: 'smooth' });
                  window.scrollTo({ top: 0 });
                  navigate(button.path);
                }}
              >
                {button.label}
              </div>
            ))}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => logout()}
            >
              <i className="material-symbols-outlined">logout</i>
              <p variant="body2" color="inherit">
                Logout
              </p>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <Outlet />
          {talentId && <AdminTalentView talentId={talentId} />}
          {joboffer_id && <AdminJobOfferView />}
          {company_id && <AdminCompanyView company_id={company_id} />}
        </div>
      </div>
    </>
  );
};
export default AdminNavBar;
