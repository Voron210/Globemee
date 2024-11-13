import React from "react";
import { useCompany } from "../../../context/CompanyContext/CompanyContext";
import styles from "./CompanyJobOffers.module.css";
import { useNavigate } from "react-router-dom";

function CompanyJobOffers() {
  const { companyData, jobOffers } = useCompany();
  const navigate = useNavigate();

  if (!companyData || !jobOffers) {
    return <div>Loading...</div>;
  }

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Matching läuft...";
      case 2:
        return "Gespeichert";
      case 0:
        return "Deaktiviert";
      case 10:
        return "Gematcht";
      case 150:
        return "Eingestellt";
      default:
        return "Unbekannt";
    }
  };

  const renderTable = (status) => {
    const filteredJobOffers = jobOffers.filter(
      (job) => job.jobOfferStatus === status
    );

    if (filteredJobOffers.length === 0) return null;

    return (
      <div className="content_block">
        <div>
          <h4>Ihre </h4>
          <h4 className="highlight_full">
            {status === 1 && "aktuellen Stellen"}
            {status === 2 && "gespeicherten Stellen"}
            {status === 0 && "deaktivierten Stellen"}
          </h4>
        </div>
        <div className={styles.jobTable}>
          <table>
            <thead>
              <tr>
                <th className="text-m-semibold">Position</th>
                <th style={{ textAlign: "center" }} className="text-m-semibold">
                  Veröffentlicht
                </th>
                <th style={{ textAlign: "center" }} className="text-m-semibold">
                  Matches
                </th>
                <th className="text-m-semibold"></th>
              </tr>
            </thead>
            <tbody>
              {filteredJobOffers.map((job, index) => (
                <tr key={index}>
                  <td>{job.hardFacts.jobDescription.jobTitle}</td>
                  <td style={{ textAlign: "center" }}>{job.creationDate}</td>
                  <td style={{ textAlign: "center" }}>{job.matchCount}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      className="tertiary"
                      type="button"
                      onClick={() =>
                        navigate(
                          `/company-job-detail?joboffer_id=${job.jobOfferId}`
                        )
                      }
                    >
                      Stelle bearbeiten
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div onClick={() => navigate("/create-job-offer")}>
        <button className="primary medium">Neue Stelle anlegen</button>
      </div>
      {renderTable(1)}
      {renderTable(2)}
      {renderTable(0)}
    </div>
  );
}

export default CompanyJobOffers;
