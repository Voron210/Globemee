import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminJobOfferView.module.css";
import JobOffer from "../JobOffer/JobOffer";

const jobOfferProps = { type: "edit", role: "admin" };

const AdminJobOfferView = () => {
  return (
    <div className={styles.modalBackground}>
      {/* <div className={styles.jobHead}>Talent Name & Surname</div> */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <JobOffer {...jobOfferProps} />
      </div>
    </div>
  );
};

export default AdminJobOfferView;
