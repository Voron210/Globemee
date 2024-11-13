import React, { useState } from "react";
import styles from "./AdminHistory.module.css";
import DropdownWithSearch from "../DropdownWithSearch/DropdownWithSearch";
import { useNavigate } from "react-router-dom";

const dictionary = {
  "0,0": { label: "Talent Rejected", color: "red" },
  "1,1": { label: "Talent matched to", color: "orange" },
  "10,10": { label: "Talent is interested in", color: "blue" },
  "20,20": { label: "Company is interested about Talent", color: "blue" },
  "20,30": { label: "Got an interview offer", color: "yellow" },
  "30,30": { label: "Talent has interview about", color: "yellow" },
  "30,40": { label: "Another Example", color: "green" },
  "30,50": { label: "Talent is hired", color: "green" },
};

const getStatusClass = (talentMatchStatus, companyMatchStatus) => {
  if (companyMatchStatus === 0 || talentMatchStatus === 0) {
    return dictionary["0,0"];
  }
  const key = `${companyMatchStatus},${talentMatchStatus}`;
  return dictionary[key] || { label: "Default", color: "defaultColor" };
};

const AdminHistory = ({ histories }) => {
  const navigate = useNavigate();
  const getUniqueCompaniesAndJobOffers = (data) => {
    const uniqueCompanies = {};
    const uniqueJobOffers = {};

    data.forEach((item) => {
      // Добавляем уникальные компании
      if (!uniqueCompanies[item.companyId]) {
        uniqueCompanies[item.companyId] = {
          companyName: item.companyName,
          companyId: item.companyId,
        };
      }

      // Добавляем уникальные предложения о работе
      if (!uniqueJobOffers[item.jobOfferId]) {
        uniqueJobOffers[item.jobOfferId] = {
          jobOfferId: item.jobOfferId,
          jobTitle: item.jobTitle,
        };
      }
    });

    return {
      uniqueCompanies: Object.values(uniqueCompanies),
      uniqueJobOffers: Object.values(uniqueJobOffers),
    };
  };
  const result = getUniqueCompaniesAndJobOffers(histories);
  //   console.log(result.uniqueCompanies);
  //   console.log(result.uniqueJobOffers);
  const [selectedValue, setSelectedValue] = useState("");
  return (
    <div className={styles.historyWrapper}>
      <div className="row space-between">
        <h3>Aktivität</h3>
        <div style={{ width: "400px" }}>
          <DropdownWithSearch
            selectedValue={selectedValue}
            onSelect={(value) => setSelectedValue(value)}
            options={result.uniqueJobOffers}
            display={"jobTitle"}
            placeholder="Search for positions or companies"
          />
        </div>
      </div>
      <div className={styles.historyList}>
        {histories
          .filter((item) =>
            selectedValue ? item.jobOfferId === selectedValue.jobOfferId : item
          )
          .map((item, index) => (
            <div key={index} className={styles.historyItem}>
              <div
                className={`${styles.icon} ${
                  styles[
                    getStatusClass(
                      item.companyMatchStatus,
                      item.talentMatchStatus
                    ).color
                  ]
                }`}
              >
                <span
                  className="material-symbols-outlined white"
                  style={{ fontSize: "20px" }}
                >
                  {item.role === "admin"
                    ? "join_inner"
                    : item.role === "talent"
                    ? "person"
                    : "domain"}
                </span>
              </div>
              <div className="column">
                <p>
                  {
                    getStatusClass(
                      item.companyMatchStatus,
                      item.talentMatchStatus
                    ).label
                  }{" "}
                  job offer{" "}
                  <span
                    style={{ color: "#FF7E55", cursor: "pointer" }}
                    onClick={() => navigate(`?joboffer_id=${item.jobOfferId}`)}
                  >{`${item.jobTitle}`}</span>{" "}
                  from{" "}
                  <span
                    onClick={() => navigate(`?company_id=${item.companyId}`)}
                    style={{ color: "#FF7E55", cursor: "pointer" }}
                  >{`${item.companyName}`}</span>
                </p>
                <p>{item.timestamp}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminHistory;
