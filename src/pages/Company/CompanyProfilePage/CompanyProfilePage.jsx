import React, { useEffect, useState } from "react";
import styles from "./CompanyProfilePage.module.css";
import { LinearProgress } from "@mui/material";
import { useCompany } from "../../../context/CompanyContext/CompanyContext";
import axiosInstance from "../../../lib/axios/AxiosConfig";
import Modal from "../../../components/Modal/Modal";
import CompanyProfileFormWrapper from "../../../components/CompanyProfileFormWrapper/CompanyProfileFormWrapper";
import benefits from "../../../common/benefits";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import UploadIcon from "../../../assets/UploadIcon.svg";
import CircularProgress from "@mui/material/CircularProgress";
import { addGlobalNotification } from "../../../context/ModalContext/ModalContext";
import ReactPlayer from "react-player";
import { Tooltip } from "react-tooltip";
// import YouTube from "react-youtube";

function CompanyProfilePage() {
  const [progress, setProgress] = useState(50);
  const {
    companyProfile,
    getCompanyProfile,
    companyPhotos,
    setCompanyPhotos,
    getPhotos,
  } = useCompany();
  const [isDragActive, setIsDragActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const benefitsToShow = showAll
    ? companyProfile?.facts?.benefits || []
    : companyProfile?.facts?.benefits?.slice(0, 6) || [];

  const toggleShowAll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAll(!showAll);
  };
  // console.log(companyProfile);

  const openModal = (props) => {
    if (companyProfile) {
      setModalContent(props);
      setModalActive(true);
    }
  };

  // profile progress tracker
  // useEffect(() => {
  //   calculateProgress();
  // }, [companyProfile]);

  // const calculateProgress = () => {
  //   if (!companyProfile || !companyProfile.facts) return;

  //   let progressCount = 0;
  //   const totalFields = 10;

  //   if (companyProfile.facts.name) progressCount++;
  //   if (companyProfile.facts.sector) progressCount++;
  //   if (companyProfile.facts.address && companyProfile.facts.address.length > 0)
  //     progressCount++;
  //   if (companyProfile.facts.documents && companyProfile.facts.documents.logo)
  //     progressCount++;
  //   if (
  //     companyProfile.facts.documents &&
  //     companyProfile.facts.documents.photos &&
  //     companyProfile.facts.documents.photos.length > 0
  //   )
  //     progressCount++;
  //   if (companyProfile.facts.videos && companyProfile.facts.videos.length > 0)
  //     progressCount++;
  //   if (companyProfile.facts.values && companyProfile.facts.values.length > 0)
  //     progressCount++;
  //   if (
  //     companyProfile.facts.contact &&
  //     companyProfile.facts.contact.contactName
  //   )
  //     progressCount++;
  //   if (
  //     companyProfile.facts.benefits &&
  //     companyProfile.facts.benefits.length > 0
  //   )
  //     progressCount++;
  //   if (companyProfile.facts.type) progressCount++;

  //   const progressPercentage = (progressCount / totalFields) * 100;
  //   setProgress(progressPercentage);
  // };

  //Photo upload controls
  const handleUpload = async (event) => {
    event.preventDefault();
    setIsDragActive(false);

    let newFiles = [];
    if (event.dataTransfer) {
      newFiles = Array.from(event.dataTransfer.files).filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );
      event.dataTransfer.clearData();
    } else if (event.target) {
      newFiles = Array.from(event.target.files).filter(
        (file) => file.type === "image/jpeg" || file.type === "image/png"
      );
      event.target.value = null;
    }

    // Конвертируем файлы в Base64
    const base64Files = await Promise.all(
      newFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>
            resolve({ name: file.name, file: reader.result });
          reader.onerror = (error) => reject(error);
        });
      })
    );

    try {
      // console.log(base64Files);
      const response = await axiosInstance.post(
        "/c_company/many_photos",
        {
          photos: [...base64Files],
        },
        {
          notification: {
            successMessage: "Upload successful",
            waitingMessage: "Uploading...",
          },
        }
      );
      const uploadedPhotos = response.data.photos;
      const newPhotos = base64Files.map((file, index) => ({
        documentId: uploadedPhotos[index].documentId,
        file: file.file,
        name: file.name,
      }));
      // console.log(companyPhotos);
      setCompanyPhotos((prev) => {
        return { ...prev, photos: [...prev.photos, ...newPhotos] };
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragActive(true);
  };
  const handleDragLeave = () => {
    setIsDragActive(false);
  };
  const handleRemovePhoto = async (documentId) => {
    try {
      await axiosInstance.delete(
        `c_company/one_photo?documentId=${documentId}`,
        { notification: "Delete successful" }
      );
      // console.log("setCompanyPhotos");
      setCompanyPhotos((prev) => {
        // Создаем новый объект с обновленным массивом photos
        const updatedPhotos = prev.photos.filter(
          (photo) => photo.documentId !== documentId
        );
        // Возвращаем новый объект с обновленным массивом photos
        return { ...prev, photos: updatedPhotos };
      });
    } catch (error) {
      console.error(error);
    }
  };

  // const opts = {
  //   height: "100%",
  //   width: "100%",
  //   playerVars: {
  //     // autoplay: 1,
  //     controls: 1,
  //   },
  // };

  // function getYouTubeVideoId(url) {
  //   try {
  //     const urlObj = new URL(url);
  //     return urlObj.searchParams.get("v");
  //   } catch (e) {
  //     console.error("Invalid URL", e);
  //     return null;
  //   }
  // }

  //  Logo update
  const handleUpdateLogo = (event) => {
    const file = event.target.files[0];

    if (file) {
      const maxSize = 10 * 1024 * 1024; // 10 MB
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      if (file.size > maxSize) {
        addGlobalNotification("Datei zu groß. Max 10MB.", "warning");
        event.target.value = null;
        return;
      }

      if (!allowedTypes.includes(file.type)) {
        alert("Bitte laden Sie die Datei im Format JPEG, JPG oder PNG hoch.");
        addGlobalNotification("Datei zu groß. Max 10MB.", "warning");
        event.target.value = null;
        return;
      }

      openModal(
        <CompanyProfileFormWrapper
          type="company_logo"
          onClose={() => setModalActive(false)}
          logo={file}
        />
      );
    }

    event.target.value = null;
  };

  return (
    <>
      <div className="column gap">
        <div className="column minGap">
          <h3>Unternehmensprofil</h3>
          {/* <div className={styles.progressContainer}>
          <LinearProgress
            sx={{ height: 20 }}
            color="inherit"
            variant="determinate"
            value={progress}
            className={styles.progress}
          />
          <span className={styles.progressText}>{`${progress}%`}</span>
        </div> */}
          <p>
            Je detaillierter Sie Ihr Unternehmensprofil ausfüllen, desto genauer
            können die passenden Kandidat:innen für Ihre gesuchten Stellen
            gefunden werden.
          </p>
        </div>
        {/* General info */}
        <div className={styles.generalInfoWrapper}>
          {/* <div
            className={styles.logoColumn}
            onClick={(e) => e.stopPropagation()}
          > */}
          <div
            className={styles.logo_wrapper}
            onClick={(e) => {
              e.stopPropagation();
              companyProfile && document.getElementById("logoInput").click();
            }}
          >
            {companyPhotos && companyPhotos.logo.file ? (
              <img
                src={companyPhotos.logo.file}
                alt="Company Logo"
                className={styles.logo}
              />
            ) : (
              <div className={styles.logo_field}>
                <p className="center text-xxs">Unternehmenslogo hochladen</p>
              </div>
            )}
            <div className={styles.logo_upload}>
              <p className="center text-xxs">Unternehmenslogo hochladen</p>
            </div>
          </div>
          <input
            type="file"
            id="logoInput"
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            onChange={handleUpdateLogo}
          />
          {/* </div> */}
          <div
            className="content_block gap click"
            onClick={() =>
              openModal(
                <CompanyProfileFormWrapper
                  type="general_info"
                  onClose={() => setModalActive(false)}
                />
              )
            }
          >
            <div style={{ marginTop: "52px" }}>
              <h4 className="highlight_full">Allgemeine Informationen</h4>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <p className={`${styles.info} text-m-semibold`}>
                  {companyProfile?.facts.name}
                </p>
                <p>Unternehmensname</p>
              </div>
              <div className={styles.column}>
                <p className={`${styles.info} text-m-semibold`}>
                  {companyProfile?.facts.sector}
                </p>
                <p>Sektor</p>
              </div>
              <div className={styles.column}>
                <p className={`${styles.info} text-m-semibold`}>
                  {Array.isArray(companyProfile?.facts?.address)
                    ? companyProfile?.facts?.address
                        .map((address) => address.split(",")[0])
                        .join(", ")
                    : companyProfile?.facts?.address}
                </p>
                <p>Standort(e)</p>
              </div>
              <div className={styles.column}>
                <p className={`${styles.info} text-m-semibold`}>
                  {companyProfile?.facts.website}
                </p>
                <p>Link zur Website</p>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                <p className={`${styles.info} text-m-semibold`}>
                  {companyProfile?.facts.industry}
                </p>
                <p>Branche</p>
              </div>
              <div className={styles.column}>
                <p className={`${styles.info} text-m-semibold`}>
                  {companyProfile?.facts.type}
                </p>
                <p>Typ</p>
              </div>
              <div className={styles.column}>
                <p className={`${styles.info} text-m-semibold`}>
                  {companyProfile?.facts.employeesNumber}
                </p>
                <p>Anzahl Mitarbeiter</p>
              </div>
              <div className={styles.column}>
                <p className={`${styles.info} text-m-semibold`}>
                  {companyProfile?.facts.companyNumber}
                </p>
                <div className="row">
                  <p>Betriebsnummer</p>
                  <i
                    className="material-symbols-outlined"
                    style={{ fontSize: "22px" }}
                    data-tooltip-id="Betriebsnummer"
                  >
                    info
                  </i>
                  <Tooltip id="Betriebsnummer" place="bottom">
                    <div className="column">
                      <p>
                        Ihre Betriebsnummer benötigen wir spätestens zur
                        Visabeantragung, im Falle einer Einstellung.
                      </p>
                    </div>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="row">
              <div className={styles.textColumn}>
                <p className="text-m-semibold">Kurzbvorstellung</p>
                <p>{companyProfile?.facts.briefIntroduction}</p>
              </div>
            </div>
            <DriveFileRenameOutlineIcon
              className={styles.edit_icon}
              color="inherit"
              fontSize="large"
            />
          </div>
        </div>

        {/* Contact */}
        <div
          className="content_block gap click"
          onClick={() =>
            openModal(
              <CompanyProfileFormWrapper
                type="contact"
                onClose={() => setModalActive(false)}
              />
            )
          }
        >
          <div>
            <h4 className="highlight_full">Kontakt</h4>
          </div>
          <div className="column">
            <p className="text-m-semibold">
              {companyProfile?.facts.contact.contactName}
            </p>
            <p>Kontaktperson</p>
          </div>
          <div className="column">
            <p className="text-m-semibold">
              {companyProfile?.facts?.contact?.contactEmail
                ?.map((address) => address?.split(",")[0] ?? "")
                ?.join("; ") ?? ""}
            </p>
            <p>Benachrichtungen bei neuen Matches</p>
          </div>
          <DriveFileRenameOutlineIcon
            className={styles.edit_icon}
            color="inherit"
            fontSize="large"
          />
        </div>

        {/* Benefits */}
        <div
          className="content_block gap click"
          onClick={() =>
            openModal(
              <CompanyProfileFormWrapper
                type="benefits"
                onClose={() => setModalActive(false)}
              />
            )
          }
        >
          <div>
            <h4 className="highlight_full">Benefits</h4>
          </div>
          <div className={styles.benefit_grid}>
            {benefitsToShow.map((item, index) => {
              const benefit = benefits.find(
                (benefit) => benefit.name === item.benefitName
              );
              return (
                <div key={index} className="column">
                  <div className="row">
                    {benefit && (
                      <img src={benefit.icon} className={styles.benefit_icon} />
                    )}
                    <p className="orange text-m-semibold">{item.benefitName}</p>
                  </div>
                  <p>{item.benefitDescription}</p>
                </div>
              );
            })}
          </div>
          {companyProfile?.facts?.benefits.length > 6 && (
            <button onClick={(e) => toggleShowAll(e)} type="button">
              {showAll
                ? "Weniger Benefits anzeigen \u25B2"
                : "Alle Benefits anzeigen \u25BC"}
            </button>
          )}

          <DriveFileRenameOutlineIcon
            className={styles.edit_icon}
            color="inherit"
            fontSize="large"
          />
        </div>

        {/* Corporate values */}
        <div
          className="content_block gap click"
          onClick={() =>
            openModal(
              <CompanyProfileFormWrapper
                type="values"
                onClose={() => setModalActive(false)}
              />
            )
          }
        >
          <div>
            <h4 className="highlight_full">Unternehmenswerte</h4>
          </div>
          <div className={styles.flex_list}>
            {companyProfile?.facts?.values.map((item, index) => (
              <div key={index} className={styles.flex_item}>
                <p className="text-m-semibold">{item}</p>
              </div>
            ))}
          </div>

          <DriveFileRenameOutlineIcon
            className={styles.edit_icon}
            color="inherit"
            fontSize="large"
          />
        </div>

        {/* Photos */}
        <div className="content_block gap">
          <div>
            <h4 className="highlight_full">Fotos</h4>
          </div>
          <div className="column">
            <p>Zeigen Sie sich von Ihrer besten Seite!</p>
            <p>
              Fügen Sie Fotos, Videos oder Links zu Youtube-Clips hinzu, um
              Ihren Kandidat:innen einen Eindruck von Ihrem Unternehmen zu
              vermitteln.
            </p>
          </div>
          <div
            className={`${styles.uploadZone} ${
              isDragActive ? styles.active : ""
            } center`}
            onDrop={handleUpload}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept="image/jpeg, image/png"
              multiple
              onChange={handleUpload}
              className={styles.fileInput}
            />
            <div className="column gap center">
              <img src={UploadIcon} style={{ width: "50px" }} />
              <p>
                Ziehen Sie Bilder hierher oder klicken Sie hier, um sie
                hochzuladen
              </p>
            </div>
          </div>
          <div className={styles.photo_list}>
            {companyPhotos
              ? companyPhotos.photos.map((item, index) => (
                  <div key={index} className={styles.photoItem}>
                    <img src={item.file} className={styles.photo} />
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemovePhoto(item.documentId)}
                    >
                      &times;
                    </button>
                  </div>
                ))
              : companyProfile?.facts?.documents.photos.map((item, index) => (
                  <div
                    key={index}
                    className={styles.photoItem}
                    style={{ position: "relative" }}
                  >
                    <img src={item.file} className={styles.photo} />
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <CircularProgress />
                    </div>
                    {/* <button
                      className={styles.removeButton}
                      onClick={() => handleRemovePhoto(index)}
                    >
                      &times;
                    </button> */}
                  </div>
                ))}
          </div>
        </div>

        {/* Video */}
        <div
          className="content_block gap click"
          onClick={() =>
            openModal(
              <CompanyProfileFormWrapper
                type="video"
                onClose={() => setModalActive(false)}
              />
            )
          }
        >
          <div>
            <h4 className="highlight_full">Videos</h4>
          </div>
          <p>
            Fügen Sie Videos zu Ihrem Unternehmensprofil hinzu, um den Talenten
            einen noch besseren Eindruck von Ihrem Unternehmen zu vermitteln.
          </p>
          <div className={styles.video_list}>
            {companyProfile?.facts?.videos.map((item, index) => (
              <div
                key={index}
                className={styles.video_item}
                onClick={(e) => e.stopPropagation()}
              >
                {/* <YouTube videoId={getYouTubeVideoId(item)} opts={opts} /> */}
                <ReactPlayer
                  url={item}
                  light
                  playing
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            ))}
          </div>
          <DriveFileRenameOutlineIcon
            className={styles.edit_icon}
            color="inherit"
            fontSize="large"
          />
        </div>
      </div>

      <Modal
        active={modalActive}
        setActive={setModalActive}
        children={modalContent}
        width={"680px"}
      />
    </>
  );
}

export default CompanyProfilePage;
