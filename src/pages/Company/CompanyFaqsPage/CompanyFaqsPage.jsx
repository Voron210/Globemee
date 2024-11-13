import React, { useState } from "react";
import faqsConfig from "../../../common/faqs";
import styles from "./CompanyFaqsPage.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import faqHelpicon from "../../../assets/faqHelpIcon.svg";
import HeadphonesIcon from "../../../assets/HeadphonesIcon.svg";
import MailIcon from "../../../assets/MailIcon.svg";
import Modal from "../../../components/Modal/Modal";
import HelpRquest from "../../../components/HelpRquest/HelpRquest";
import PhoneIcon from "../../../assets/PhoneIcon.svg";

const CompanyFaqsPage = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [modalActive, setModalActive] = useState(false);

  const toggleItem = (categoryIndex, faqIndex) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [`${categoryIndex}-${faqIndex}`]:
        !prevExpandedItems[`${categoryIndex}-${faqIndex}`],
    }));
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.faqs}>
          <h3 className="highlight_full">
            <img src={faqHelpicon} className={styles.icon} />
            FAQ & Hilfe
          </h3>
          <div className={styles.container}>
            {faqsConfig.companyFaqs.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className={styles.category}
                id={`category-${categoryIndex}`}
              >
                <ul className={styles.list}>
                  <h4>{category.category}</h4>
                  {category.faqs.map((faq, faqIndex) => (
                    <li
                      key={faqIndex}
                      className={styles.item}
                      onClick={() => toggleItem(categoryIndex, faqIndex)}
                    >
                      <div className="row space-between">
                        <p className="text-m-semibold">{faq.name}</p>
                        <button className="primary circle">
                          {expandedItems[`${categoryIndex}-${faqIndex}`] ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </button>
                      </div>
                      <div
                        className={`${styles.answer} ${
                          expandedItems[`${categoryIndex}-${faqIndex}`]
                            ? styles.expanded
                            : ""
                        }`}
                      >
                        <p style={{ whiteSpace: "pre-wrap" }}>{faq.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            {/* {faqsConfig.companyFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className={styles.category}>
                <ul className={styles.list}>
                  <h4>{category.category}</h4>
                  {category.faqs.map((faq, faqIndex) => (
                    <li
                      key={faqIndex}
                      className={styles.item}
                      onClick={() => toggleItem(categoryIndex, faqIndex)}
                    >
                      <div className="row space-between">
                        <p className="text-m-semibold">{faq.name}</p>
                        <button className="primary circle">
                          {expandedItems[`${categoryIndex}-${faqIndex}`] ? (
                            <ExpandLessIcon />
                          ) : (
                            <ExpandMoreIcon />
                          )}
                        </button>
                      </div>
                      <div
                        className={`${styles.answer} ${
                          expandedItems[`${categoryIndex}-${faqIndex}`]
                            ? styles.expanded
                            : ""
                        }`}
                      >
                        <p style={{ whiteSpace: "pre-wrap" }}>{faq.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))} */}
          </div>
          {/* <div className={styles.container}>
            <ul className={styles.list}>
              {faqsConfig.companyFaqs.map((item, index) => (
                <li
                  key={index}
                  className={styles.item}
                  onClick={() => toggleItem(index)}
                >
                  <div className="row space-between">
                    <p className="text-m-semibold">{item.name}</p>
                    <button className="primary circle">
                      {expandedItems[index] ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </button>
                  </div>
                  <div
                    className={`${styles.answer} ${
                      expandedItems[index] ? styles.expanded : ""
                    }`}
                  >
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div> */}
        </div>
        <div className={styles.sideInfo}>
          <h4>Noch Fragen?</h4>
          <div
            className={styles.sideInfo_item}
            onClick={() => setModalActive(true)}
          >
            <img src={HeadphonesIcon} />
            <p>Request a callback</p>
          </div>
          <div className={styles.sideInfo_item}>
            <img src={PhoneIcon} />
            <p>+49 178 319 94 68</p>
          </div>
          <div className={styles.sideInfo_item}>
            <img src={MailIcon} />
            <p>support@globemee.com</p>
          </div>

          <h4>Übersicht</h4>
          <ul>
            {faqsConfig.companyFaqs.map((item, index) => (
              <li key={index}>
                <a href={`#category-${index}`} className={styles.navLink}>
                  {item.category}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive} width={"500px"}>
        <HelpRquest onClose={() => setModalActive(false)} type={"company"} />
      </Modal>
    </>
  );
};

export default CompanyFaqsPage;
