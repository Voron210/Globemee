import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./imprint.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function Imprint() {
  let [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const navigate = useNavigate();
  const location = useLocation();

  const handleBackClick = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/landing");
    }
  };

  return (
    <div className={styles.layout}>
      {lang === "en" ? (
        <>
          <div className={styles.container}>
            <button
              onClick={() => handleBackClick()}
              className={styles.back_btn}
            >
              <KeyboardBackspaceIcon color="inherit" />
              <p>Back to home page</p>
            </button>
            <div>
              <h3>Imprint</h3>
            </div>
            <div className="column">
              <br />
              <br />
              <h4>Information according to §5 TMG</h4>
              <br />
              <p>Globemee GmbH</p>
              <p>Zollhof 7</p>
              <br />
              <p>90443 Nuremberg</p>
              <br />
              <p>Registered office of the company: Nuremberg</p>
              <p>Managing directors: Christian Schieber and Sandra Schmitt</p>
              <br />
              <p>Registry court: Nuremberg Local Court</p>
              <p>Registration number: HRB 41844</p>
              <br />
              <p>
                Responsible for content according to § 55 II RStV: Sandra
                Schmitt, Christian Schieber (address see above)
              </p>
              <br />
              <p>VAT number: DE356305949</p>
              <p>
                Dispute resolution: We are not willing or obliged to participate
                in dispute resolution proceedings before a consumer arbitration
                board.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.back_btn}>
              <KeyboardBackspaceIcon color="inherit" />
              <p>Zurück zur Startseite</p>
            </button>
            <div>
              <h3 className="highlight">Impressum</h3>
            </div>
            <div className="column">
              <br />
              <br />
              <h4>Angaben gemäß §5 TMG</h4>
              <br />
              <p>Globemee GmbH</p>
              <p>Zollhof 7</p>
              <br />
              <p>90443 Nuremberg</p>
              <br />
              <p>Sitz der Gesellschaft: Nürnberg</p>
              <p>Geschäftsführer: Christian Schieber und Sandra Schmitt</p>
              <br />
              <p>
                Registergericht: Amtsgericht Nürnberg
                <br />
                Registernummer: HRB 41844
              </p>
              <br />
              <p>
                Inhaltlich Verantwortlicher gem. § 55 II RStV: Sandra Schmitt,
                Christian Schieber (Anschrift s.o.)
              </p>
              <br />
              <p>USt-IdNr.: DE356305949</p>
              <p>
                Streitschlichtung: Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
              <br />
              <p>Kontakt:</p>
              <p>Telefon: +49 1783 199468​</p>
              <p>E-Mail: sandra.schmitt@globemee.com</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Imprint;
