import React from "react";
import RetryIcon from "../../assets/RetryIcon.svg";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const location = useLocation();
  const isTalentRoute = location.pathname.startsWith("/talent");
  const isCompanyRoute = location.pathname.startsWith("/company");
  const isAdminRoute = location.pathname.startsWith("/admin");
  // const navigate = useNavigate();
  return (
    <>
      <div className="column gap">
        <img src={RetryIcon} className="modal_img" />
        {isTalentRoute && (
          <>
            <h3 className="center">Session expired</h3>
            <div className="column">
              <p className="center text-m-semibold">
                You have been inactive for a while.
              </p>
              <p className="center text-m-semibold">
                To protect your data, we have logged you out.
              </p>
            </div>
            <div className="center">
              <button
                className="secondary medium"
                type="button"
                onClick={() => (window.location.href = "/talent-login")}
              >
                Back to Login
              </button>
            </div>
          </>
        )}
        {isCompanyRoute && (
          <>
            <h3 className="center">Sitzung abgelaufen</h3>
            <div className="column">
              <p className="center text-m-semibold">
                Sie waren eine Zeit lang inaktiv.
              </p>
              <p className="center text-m-semibold">
                Um Ihre Daten zu schützen, haben wir Sie abgemeldet.
              </p>
            </div>
            <div className="center">
              <button
                className="secondary medium"
                type="button"
                onClick={() => (window.location.href = "/company-login")}
              >
                Zurück zu Login
              </button>
            </div>
          </>
        )}
        {isAdminRoute && (
          <>
            <h3 className="center">Sitzung abgelaufen</h3>
            <div className="column">
              <p className="center text-m-semibold">
                Sie waren eine Zeit lang inaktiv.
              </p>
              <p className="center text-m-semibold">
                Um Ihre Daten zu schützen, haben wir Sie abgemeldet.
              </p>
            </div>
            <div className="center">
              <button
                className="secondary medium"
                type="button"
                onClick={() => (window.location.href = "/adminportal")}
              >
                Zurück zu Login
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SessionExpired;
