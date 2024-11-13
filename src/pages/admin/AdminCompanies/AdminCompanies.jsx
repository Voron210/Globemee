import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../../../context/AdminContext/AdminContext";
import styles from "./AdminCompanies.module.css";
import BubbleList from "../../../components/BubbleList/BubbleList";
import DropdownWithSearch from "../../../components/DropdownWithSearch/DropdownWithSearch";
import Fuse from "fuse.js";

// {
//   "companyId": "f8cfbe8f-99d6-44d2-a21e-3402f29a9e03",
//   "facts": {
//       "address": "home",
//       "industry": "Personalvermittlung",
//       "name": "Globemee GmbH ",
//       "sector": "",
//       "type": ""
//   },
//   "numberHiring": 0,
//   "numberJobOffers": 2,
//   "priority": 1
// }

const sectorOption = [
  { id: "radio_sector_null", label: "Alle", status: "" },
  {
    id: "radio_sector_1",
    label: "Öffentlicher Dienst",
    status: "Öffentlicher Dienst",
  },
  {
    id: "radio_sector_2",
    label: "Privatwirtschaft",
    status: "Privatwirtschaft",
  },
];

const typeOption = [
  { id: "radio_type_null", label: "Alle", status: "" },
  { id: "radio_type_1", label: "Startup", status: "Startup" },
  { id: "radio_type_2", label: "Kleinunternehmen", status: "Kleinunternehmen" },
  { id: "radio_type_3", label: "Mittelstand", status: "Mittelstand" },
  { id: "radio_type_4", label: "Konzern", status: "Konzern" },
];

function AdminCompanies() {
  const { company } = useAdmin();
  const [searchName, setSearchName] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const reset = () => {
    setSearchName("");
    setSelectedIndustry([]);
    setSelectedLocation([]);
    setSelectedSector("");
    setSelectedType("");
  };

  const navigate = useNavigate();

  if (!company) {
    return <>Loading...</>;
  }

  const uniqueIndustries = [
    ...new Set(company.map((item) => item.facts.industry)),
  ];

  const uniqueLocations = [
    ...new Set(
      company.flatMap((item) =>
        Array.isArray(item.facts.address)
          ? item.facts.address
          : [item.facts.address]
      )
    ),
  ];

  const SortableTable = () => {
    const [data, setData] = useState(company);
    const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
    const navigate = useNavigate();

    const fuseOptions = {
      keys: ["facts.name"],
      threshold: 0.3,
    };

    const fuse = new Fuse(data, fuseOptions);

    const fuzzyFilteredData = searchName
      ? fuse.search(searchName).map((result) => result.item)
      : data;

    const filteredData = fuzzyFilteredData.filter((item) => {
      const matchesIndustry =
        selectedIndustry.length === 0
          ? true
          : selectedIndustry.includes(item.facts.industry);

      const matchesLocation =
        selectedLocation.length === 0
          ? true
          : Array.isArray(item.facts.address)
          ? item.facts.address.some((address) =>
              selectedLocation.includes(address)
            )
          : selectedLocation.includes(item.facts.address);

      const matchesSector =
        selectedSector === "" ? true : item.facts.sector === selectedSector;

      const matchesType =
        selectedType === "" ? true : item.facts.type === selectedType;

      return matchesIndustry && matchesLocation && matchesSector && matchesType;
    });

    const handleSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }

      const sortedData = [...filteredData].sort((a, b) => {
        const valueA = getValueByKey(a, key);
        const valueB = getValueByKey(b, key);

        if (valueA < valueB) {
          return direction === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });

      setData(sortedData);
      setSortConfig({ key, direction });
    };

    const getValueByKey = (item, key) => {
      switch (key) {
        case "priority":
          return item.priority;
        case "name":
          return item.facts.name;
        case "industry":
          return item.facts.industry;
        case "address":
          return item.facts.address;
        case "numberJobOffers":
          return item.numberJobOffers;
        default:
          return "";
      }
    };

    return (
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th
                className={styles.table_prio}
                onClick={() => handleSort("priority")}
              >
                Prio
              </th>
              <th
                className={styles.table_name}
                onClick={() => handleSort("name")}
              >
                Unternehmen
              </th>
              <th
                className={styles.table_industry}
                onClick={() => handleSort("industry")}
              >
                Branche
              </th>
              <th
                className={styles.table_location}
                onClick={() => handleSort("address")}
              >
                Standort
              </th>
              <th
                className={styles.table_offers}
                onClick={() => handleSort("numberJobOffers")}
              >
                Stellenanzeigen
              </th>
              <th className={styles.table_hired}>Einstellungen</th>
              <th className={styles.table_settings}></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.companyId}>
                <td className={styles.cell50}>{item.priority}</td>
                <td className={styles.cellfree}>{item.facts.name}</td>
                <td className={styles.cellfree}>{item.facts.industry}</td>
                <td className={styles.cellfree}>{item.facts.address}</td>
                <td className={styles.cell100}>{item.numberJobOffers}</td>
                <td className={styles.cell100}>0</td>
                <td>
                  <button
                    onClick={() =>
                      navigate(`/admin-companies?company_id=${item.companyId}`)
                    }
                    className="primary circle"
                  >
                    <i
                      className="material-symbols-outlined"
                      style={{ fontSize: "16px" }}
                    >
                      arrow_forward_ios
                    </i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <>
      <div className="column gap-32">
        <div className="row gap-32 center start">
          <h2>Unternehmen</h2>
          <button
            className="secondary medium"
            onClick={() => window.open("/company-signup", "_blank")}
          >
            Neues Unternehmen anlegen
          </button>
        </div>
        <div className={styles.filterWrapper}>
          <div className="row gap-32">
            <h3>Filter</h3>
            <button
              className="secondary small"
              type="button"
              onClick={() => reset()}
            >
              Filter zurücksetzen
            </button>
          </div>
          <form>
            <div className={styles.filterContainer}>
              <div className={styles.fiterColumn}>
                {/* INDUSRTY */}
                <div className="content-part">
                  <p className="text-m-semibold">Branchen</p>
                  <DropdownWithSearch
                    options={uniqueIndustries}
                    onSelect={(value) =>
                      setSelectedIndustry((prev) => {
                        if (prev.includes(value)) {
                          return prev.filter((item) => item !== value);
                        } else {
                          return [...prev, value];
                        }
                      })
                    }
                    selectedValue={selectedIndustry}
                  />
                  <BubbleList
                    list={selectedIndustry}
                    onDelete={(value) =>
                      setSelectedIndustry((prev) =>
                        prev.filter((item) => item !== value)
                      )
                    }
                  />
                </div>

                {/* LOCATION */}
                <div className="content-part">
                  <p className="text-m-semibold">Standort</p>
                  <DropdownWithSearch
                    options={uniqueLocations}
                    onSelect={(value) =>
                      setSelectedLocation((prev) => {
                        if (prev.includes(value)) {
                          return prev.filter((item) => item !== value);
                        } else {
                          return [...prev, value];
                        }
                      })
                    }
                    selectedValue={selectedLocation}
                  />
                  <BubbleList
                    list={selectedLocation}
                    onDelete={(value) =>
                      setSelectedLocation((prev) =>
                        prev.filter((item) => item !== value)
                      )
                    }
                  />
                </div>
              </div>
              <div className={styles.fiterColumn}>
                {/* SECTOR */}
                <div className="content-part">
                  <div className="column minGap">
                    <p className="text-m-semibold">Sektor</p>
                    <div className="row space-between">
                      {sectorOption.map((option) => (
                        <div key={option.id}>
                          <input
                            className="real-radio"
                            type="radio"
                            id={option.id}
                            value={option.status}
                            name="sector"
                            checked={selectedSector === option.status}
                            onChange={(e) => setSelectedSector(e.target.value)}
                          />
                          <span className="custom-radio"></span>
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* TYPE */}
                <div className="content-part">
                  <div className="column minGap">
                    <p className="text-m-semibold">Typ</p>
                    <div
                      className="row space-between"
                      style={{ flexWrap: "wrap", gap: "20px" }}
                    >
                      {typeOption.map((option) => (
                        <div key={option.id}>
                          <input
                            className="real-radio"
                            type="radio"
                            id={option.id}
                            value={option.status}
                            name="type"
                            checked={selectedType === option.status}
                            onChange={(e) => setSelectedType(e.target.value)}
                          />
                          <span className="custom-radio"></span>
                          <label htmlFor={option.id}>{option.label}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="content-part">
          <p className="text-m-semibold">Name</p>
          <input
            type="text"
            placeholder="Suchen"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <SortableTable />
      </div>
    </>
  );
}

export default AdminCompanies;
