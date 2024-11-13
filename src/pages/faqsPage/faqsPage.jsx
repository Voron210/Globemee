import React, { useState } from "react";
import faqsConfig from "../../common/faqs";
import styles from "./faqsPage.module.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import faqHelpicon from "../../assets/faqHelpIcon.svg";
import HeadphonesIcon from "../../assets/HeadphonesIcon.svg";
import MailIcon from "../../assets/MailIcon.svg";
import Modal from "../../components/Modal/Modal";
import HelpRquest from "../../components/HelpRquest/HelpRquest";

const FaqsPage = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [modalActive, setModalActive] = useState(false);

  const toggleItem = (index) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [index]: !prevExpandedItems[index],
    }));
  };

  return (
    <>
      <h3>
        {/* <img src={faqHelpicon} className={styles.icon} /> */}
        FAQ & Help
      </h3>
      <div className={styles.row}>
        <div className={styles.faqs}>
          <div className={styles.container}>
            <ul className={styles.list}>
              {faqsConfig.talentFaqs.map((item, index) => (
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
          </div>
        </div>
        <div className={styles.sideInfo}>
          <h4>Still questions?</h4>
          <div
            className={styles.sideInfo_item}
            onClick={() => setModalActive(true)}
          >
            <img src={HeadphonesIcon} />
            <p>Request a callback</p>
          </div>
          <div className={styles.sideInfo_item}>
            <img src={MailIcon} />
            <p>support@globemee.com</p>
          </div>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive} width={"500px"}>
        <HelpRquest onClose={() => setModalActive(false)} type="talent" />
      </Modal>
    </>
  );
};

export default FaqsPage;
