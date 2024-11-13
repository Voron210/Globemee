import React from "react";
import JobOffer from "../../../components/JobOffer/JobOffer";
import { useNavigate } from "react-router-dom";

function CompanyJobDetail() {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/company-job-offers")}
        style={{ color: "var(--orange-100)" }}
        className="start"
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "16px" }}
        >
          arrow_back_ios
        </span>
        Zurück
      </button>
      <JobOffer type={"edit"} />
    </>
  );
}

export default CompanyJobDetail;
