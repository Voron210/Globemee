import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./agb.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function Agb() {
  let [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang");
  const location = useLocation();
  const navigate = useNavigate();

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
            <button onClick={() => navigate(-1)} className={styles.back_btn}>
              <KeyboardBackspaceIcon color="inherit" />
              <p>Back to home page</p>
            </button>
            <div>
              <h3>General Terms and condittions for applicants</h3>
            </div>
            <div className="column">
              <p>Last updated: June 2023</p>
              <br />
              <h4>Contact Information:</h4>
              <br />
              Globemee GmbH
              <br />
              Zollhof 7
              <br />
              90443 Nürnberg
              <br />
              <br />
              Registered in the commercial register: On 05.06.2023
              <br />
              Register court: Local court Nuremberg
              <br />
              Registration number: HRB 41844
              <br />
              <br />
              Represented by
              <br />
              Managing Director:in: Christian Schieber and Sandra Schmitt
              <br />
              <br />
              <h5>Contact:</h5>
              E-Mail: sandra.schmitt@globemee.com
              <br />
              <br />
              <h5>Sales tax ID:</h5>
              Sales tax identification number according to § 27a sales tax law:
              DE356305949
              <br />
              <br />
              <br />
              <br />
              <h4>Preamble</h4>
              <br />
              These General Terms and Conditions are the binding rules that
              apply between Globemee GmbH, Zollhof 7, 90443 Nuremberg, Germany,
              (hereinafter referred to as "GLOBEMEE") and the users of GLOBEMEE
              as applicants* (hereinafter referred to as "Applicant" or
              "Candidate").
              <br />
              <br />
              GLOBEMEE enables an access to international talents of specialists
              and academics by means of offered so-called applicant pool
              platform (hereinafter referred to as "PLATTFORM") and works
              against the existing shortage of specialists with the help of a
              global working world. For this purpose, among other things, with
              the help of a self-developed algorithm (hereinafter referred to as
              "ALGORITHMUS"), the high-quality evaluation of candidates based on
              qualifications and personality for the companies concerned as
              possible future employers (hereinafter referred to as "CUSTOMERS")
              is carried out in order to enable professional cooperation.
              GLOBEMEE further assists in the process necessary for the
              successful cooperation such as visa support and obtaining the work
              permit, in questions of professional recognition as well as
              supports the candidates on site in Germany for the possible future
              entry into the profession.
              <br />
              <br />
              GLOBEMEE provides a PLATFORM by means of website and the like as
              well as by using the ALGORITHMUS and thereby creates a platform
              for job and career information related to possible RECIPIENTS and
              CLIENTS (hereinafter jointly referred to as "PARTIES"). Therefore,
              no employment and/or contract relationship, employment agency
              relationship, brokerage relationship or commercial agent
              relationship, partnership or civil law partnership or similar
              relationship is established between GLOBEMEE and RECIPIENT. The
              fulfillment of all obligations arising from a possible contract
              concluded between the RECIPIENT and possible subsequent CUSTOMERS
              shall be the sole responsibility of the subsequent PARTIES.
              <br />
              <br />
              <br />
              <h4>§ 1 Scope and subject matter of these business agreements</h4>
              <br />
              (1) The present General Terms and Conditions (GTC) regulate the
              relationship between GLOBEMEE and the APPLICANT. The relationship
              between GLOBEMEE and CUSTOMER or between the PARTIES is explicitly
              not part of these GTC and is not indirectly covered by them.
              Subject of these GTC is the relationship between GLOBEMEE and
              APPLICANT as well as the offer of use of the PLATFORM by GLOBEMEE.{" "}
              <br />
              <br />
              (2) GLOBEMEE provides services to the APPLICANT exclusively on the
              basis of these GTC in connection with possible regulations which
              may be referred to in these GTC. By registering to use the offer
              of GLOBEMEE, APPLICANT agrees to the validity of these GTC.
              <br />
              <br />
              <br />
              <h4>§ 2 Description of services</h4>
              <br />
              (1) On the website with the internet domain
              https://www.globemee.com as well as on the respective platforms
              with subdomain GLOBEMEE provides the APPLICANT with the PLATFORM
              free of charge. GLOBEMEE offers the possibility to post an own
              applicant profile with CV on the PLATFORM free of charge in order
              to get in contact with potential CUSTOMERS.
              <br />
              <br />
              (2) To use GLOBEMEE, the APPLICANT registers with a current e-mail
              address and the desired password. By registering, the APPLICANT
              confirms that he/she is legally competent (in particular of legal
              age) and able to enter into legally binding agreements under
              German law. Registration constitutes an offer to GLOBEMEE to enter
              into a contract for the use of the PLATTFORM. The contract is only
              concluded with the acceptance of the offer by GLOBEMEE. Upon
              acceptance of the offer by the APPLICANT, the APPLICANT will
              receive an e-mail to the e-mail address provided by him. This
              e-mail contains a link with which the APPLICANT can confirm his
              e-mail address. Upon confirmation by e-mail address, the PLATFORM
              will be made available to the APPLICANT by GLOBEMEE free of
              charge. By concluding the contract, no employment relationship is
              created between the RECIPIENT and GLOBEMEE (not even de facto) or
              any other contractual relationship, no employment agency
              relationship, brokerage relationship or commercial agent
              relationship is concluded. Furthermore, no partnership or civil
              law partnership or similar relationship is established. GLOBEMEE
              shall provide the APPLICANT with the PLATFORM including the
              ALGORITHMUS, but shall not have any right to give instructions to
              the APPLICANT, in particular not with regard to duties and risks
              which may result from a possible later employment relationship
              with the CUSTOMER. The contractual performance on the part of
              GLOBEMEE refers solely to the offering of the PLATFORM.
              <br />
              <br />
              (3) After completion of the registration process the APPLICANT can
              create his respective applicant profile. Here, corresponding
              preferences such as salary requirements, desired CUSTOMERS,
              position, field of work, etc. can be selected. The applicant
              profile appears anonymous to the potential CUSTOMER, in particular
              without indication of the picture, first and last name, sex, age
              etc.. Only the specified performance data (grades, titles,
              degrees, previous work experience, etc.) are displayed to the
              potential CUSTOMER. Only when the APPLICANT expresses interest in
              a position with the CLIENT, the personal data (picture, first and
              last name, gender, age) will be made accessible to the CLIENT and
              the contact data, self-presentation and CV will be transmitted to
              the potential CLIENT. The accessibility as well as the
              transmission will only take place after prior consent by the
              APPLICANT, which will be given by clicking on the corresponding
              declaration of consent.
              <br />
              <br />
              <br />
              <h4>§ 3 Duties GLOBEMEE</h4>
              <br />
              (1) GLOBEMEE provides the PLATFORM on the website with the
              internet domain https://www.globemee.com and the mobile apps of
              GLOBEMEE to APPLICANT free of charge according to the service
              description presented above.
              <br />
              <br />
              (2) The PLATFORM as well as the services offered there by GLOBEMEE
              are subject to continuous further development, which is why the
              form and nature of the PLATFORM as well as the services and
              functions offered may change to a reasonable extent for the
              APPLICANT. GLOBEMEE reserves the right, at its sole discretion,
              but with due regard to the interests of the APPLICANTS, to impose
              restrictions on the use and storage capacities of the PLATFORM and
              to make changes thereto. The APPLICANT shall be notified of any
              such changes with a reasonable lead time. If necessary, the
              APPLICANT shall be responsible for saving the data stored on the
              PLATFORM elsewhere as a backup copy. The EMPLOYER thus ensures to
              have access to the posted data even if GLOBEMEE might lose them
              due to a technical malfunction or settings of the service as well
              as partial settings of the same.
              <br />
              <br />
              (3) The technical availability of the PLATTFORM may be limited in
              times when the servers fluctuate due to routine and previously
              announced maintenance work or malfunctions. Furthermore, the
              number of possible CUSTOMERS as well as their vacancies available
              on the PLATTFORM may be subject to fluctuations. GLOBEMEE does not
              guarantee that CUSTOMERS and their vacancies will be available on
              the PLATFORM and at GLOBEMEE, because GLOBEMEE has no influence on
              this. GLOBEMEE alone offers the PLATFORM and participates, if
              desired, in the possible further communication between the
              APPLICANT and the CUSTOMER, if this service is explicitly desired.
              <br />
              <br />
              (4) By the PLATFORM but especially individually by respective
              information GLOBEMEE informs the RECIPIENT upon initiation of a
              possible cooperation between RECIPIENT and CLIENT each in the own
              language of the RECIPIENT as well as at the expense of GLOBEMEE
              about: a) the name and address of the CLIENT, b) the envisaged
              date of commencement and the envisaged duration of the possible
              employment relationship between the RECIPIENT and the CLIENT, c)
              the place of work or, if, the RECIPIENT is not to be employed at
              only one particular place of work, about an indication that the
              RECIPIENT may be employed at different places, d) the activity to
              be performed, e) the contractual working hours, f) the contractual
              remuneration for work, including any deductions, g) the duration
              of the contractual vacation, h) the periods of notice for
              termination of the employment relationship between the EMPLOYER
              and the CLIENT, i) a general reference to the collective
              bargaining agreements, works agreements or service agreements
              applicable to the employment relationship between the EMPLOYER and
              the CLIENT, and j) the possibility of making use of the advisory
              services of the social partners and government agencies; GLOBEMEE
              shall, at least by way of example, name the advisory services
              according to § 23a of the German Employee Dispatch Act
              (Arbeitnehmerentsendungsgesetz) and provide the current contact
              details of the mentioned advisory services.
              <br />
              <br />
              <br />
              <h4>§ 4 Duties of APPLICANT</h4>
              <br />
              APPLICANT remains the legal owner of all contents posted by him on
              the PLATFORM and transmitted to GLOBEMEE. In order to operate the
              PLATFORM and to pass on the contact to the CUSTOMER, GLOBEMEE must
              reproduce the contents posted by APPLICANT and, if necessary, make
              them public within the framework of the PLATFORM in compliance
              with the provisions of data protection law, in particular
              concretized and determined by the privacy policy of GLOBEMEE which
              can be viewed at https://www.globemee.com/datenschutz. GLOBEMEE
              shall be entitled to use the contents of the PLATFORM for any
              purpose. For this purpose, by posting the contents on the
              PLATFORM, APPLICANT grants GLOBEMEE a non-exclusive, revocable
              right of use, limited to the duration of this contract and
              non-transferable, but for the purpose of transfer to potential
              CUSTOMERS sub-licensable, to the contents transferred by APPLICANT
              on the PLATFORM and to GLOBEMEE otherwise. APPLICANT is
              responsible that rights of third parties do not conflict with this
              grant of use.
              <br />
              <br />
              <br />
              <h4>§ 5 Data Protection</h4>
              <br />
              Information on what data is processed by GLOBEMEE, how, for what
              purposes and to what extent, and what rights APPLICANTS or the
              persons affected by the data processing have in this respect, can
              be found in the respective current data protection information of
              GLOBMEE, which is available at
              https://www.globemee.com/datenschutz.
              <br />
              <br />
              <br />
              <h4>§ 6 Liability and Disclaimer</h4>
              <br />
              (1) GLOBEMEE shall be liable in contract and tort a) for damages
              due to gross negligence and intent and for damages resulting from
              injury to life, body and health; b) for damages resulting from the
              breach of contractual obligations, the fulfillment of which is
              essential for the proper performance of the contract and on the
              compliance with which the APPLICANT regularly relies and may rely
              (so-called "essential contractual obligations"); in this respect,
              however, the liability is limited to the amount of the foreseeable
              damage, the occurrence of which must typically be expected.
              <br />
              <br />
              (2) The above limitations of liability also apply in favor of the
              employees, organs and vicarious agents of GLOBEMEE. GLOBEMEE shall
              not be liable for the conduct of its vicarious agent if this agent
              is the USER or a person appointed by the USER with this function.
              Furthermore, GLOBEMEE is not liable for any damages resulting from
              the provision of inaccurate data and information by the APPLICANT.
              Mandatory legal liability provisions remain unaffected by the
              above provisions.
              <br />
              <br />
              (3) GLOBEMEE is not liable for the content and the execution of
              the contractual relationship between the CUSTOMER and the
              APPLICANT including the data and information provided by the
              CUSTOMER and the APPLICANT.
              <br />
              <br />
              (4) Statutory warranty claims and claims of the USER under the
              Product Liability Act as well as a possible direct claim as a
              contractual partner of the USER are not affected by the above
              liability provisions.
              <br />
              <br />
              (5) GLOBEMEE further assumes no liability for unauthorized access
              to personal data of registered USERS by third parties (e.g. by
              unauthorized access of hackers to the database of GLOBEMEE).
              <br />
              <br />
              <br />
              <h4>§ 7 Right of revocation</h4>
              <br />
              (1) USER may revoke the contract with GLOBEMEE within fourteen
              (14) days without giving any reason. The revocation period is
              fourteen (14) days from the day of the conclusion of the contract.
              To exercise the right of withdrawal USER is instructed as follows
              regarding his right of withdrawal:
              <br />
              <br />
              <br />
              - Cancellation Policy -
              <br />
              <br />
              <p>Right of withdrawal:</p>
              You have the right to withdraw from this contract within fourteen
              days without giving any reason. The revocation period is fourteen
              days from the day on which you or a third party designated by you
              took or has taken possession of the products and the offer of
              GLOBEMEE in the form of registration on the PLATFORM. To exercise
              your right of withdrawal, you must inform us ([company GLOBEMEE,
              address and e-mail contact]) by means of a clear statement (for
              example, a letter sent by mail or e-mail) about your decision to
              withdraw from this contract. You can use the attached sample
              withdrawal form for this purpose, but it is not mandatory. To
              comply with the revocation period, it is sufficient that you send
              the notification of the exercise of the right of revocation before
              the expiry of the revocation period. <br />
              <br />
              <p>Consequences of revocation:</p>
              If you revoke this contract, we must delete all details in the
              form of data and information that we have received from you,
              including the user account, immediately and at the latest within
              fourteen days from the day on which we received the notification
              of the revocation of this contract, unless a temporary retention
              is required by law. We will inform you about this.
              <br />
              <br />
              - End of the cancellation policy -
              <br />
              <br />
              <br />
              Sample cancellation form:
              <br />
              <br />
              To Globemee GmbH
              <br />
              Zollhof 7
              <br />
              90443 Nuremberg
              <br />
              <br />
              Herewith
              <br />
              I/we (*) hereby revoke the contract concluded by me/us (*) for the
              use of the offered platform and the associated services of
              Globemee GmbH.
              <br />
              Name of the consumer(s) &nbsp;
              <br />
              Address of the consumer(s)
              <br />
              Date, signature of the consumer(s) (only in case of communication
              on paper)
              <br />
              (*) Delete as applicable.
              <br />
              <br />
              <br />
              <h4>§ 8 ermination of use</h4>
              <br />
              (1) Irrespective of the right of revocation, both PARTIES are
              entitled to terminate the contract in text form at any time
              without stating reasons. The termination can be sent, for example,
              by mail to Globemee GmbH, Zollhof 7, 90443 Nuremberg, Germany, or
              by e-mail to sandra.schmitt@globemee.com. In addition, GLOBEMEE
              provides a cancellation button on the PLATFORM. In order to
              protect the data of the APPLICANT from unauthorized third parties,
              GLOBEMEE reserves the right to establish the identity of the
              APPLICANT, e.g. by requesting the user name and the e-mail address
              deposited by the APPLICANT with GLOBEMEE.
              <br />
              (2) If the contract is terminated, whether by the APPLICANT or by
              GLOBEMEE, GLOBEMEE will delete the personal applicant data of the
              APPLICANT (including name, e-mail, telephone number, messages,
              uploaded files, etc.), unless GLOBEMEE is legally obligated to
              store them.
              <br />
              <br />
              <br />
              <h4>§ 9 Modification of these General Terms and Conditions</h4>
              <br />
              (1) GLOBEMEE reserves the right to update these General Terms and
              Conditions according to the following regulations with effect for
              the future and to include them in the contractual relationship
              with APPLICANTS, if changes of the legal situation or the supreme
              court jurisdiction, changes of the market conditions or currency
              conversions make an adjustment necessary and namely according to
              the extent then in the parts which are affected by such changes,
              and/or changed circumstances.
              <br />
              <br />
              (2) These amendments shall only become part of the contract if the
              APPLICANT agrees to them or does not object to them within a
              period of two weeks after notification of the amendments. For a
              notification it is sufficient that GLOBEMEE sends the new version
              of the GTC to the EMPLOYER to the email address deposited with
              GLOBEMEE with a separate reference to the
              consequences/significance of the behavior of the EMPLOYER. If no
              objection to the inclusion of the aforementioned changes of the
              GTC in the contractual relationship is made in text form and
              within a period of two weeks, the consent shall be deemed granted.
              <br />
              <br />
              (3) There shall be no possibility to object if the changes merely
              benefit the APPLICANT or if they do not entail any legal or
              economic disadvantages for the APPLICANT. In all other cases, the
              incorporation of amended GTC into the contractual relationship
              with the APPLICANT shall only be possible with the APPLICANT's
              consent.
              <br />
              <br />
              (4) If the APPLICANT exercises its right of objection, the request
              for modification shall be deemed rejected. In this case the user
              account of the APPLICANT will be continued without the proposed
              changes or the registration and subsequently the contractual
              relationship between the APPLICANT and GLOBEMEE will be
              terminated. The right of the contracting parties to terminate the
              contract remains unaffected.
              <br />
              <br />
              <br />
              <h4>§ 10 Miscellaneous</h4>
              <br />
              (1) The contractual relations between GLOBEMEE and the APPLICANT
              as well as any disputes arising in connection therewith shall be
              governed exclusively by the laws of the Federal Republic of
              Germany to the exclusion of the UN Convention on Contracts for the
              International Sale of Goods. This shall only not apply insofar as
              the CUSTOMER, who is a consumer, is free to invoke more favorable
              consumer protection norms of the law applicable at his place of
              habitual residence.
              <br />
              <br />
              (2) If the CUSTOMER is a merchant in the sense of the German
              Commercial Code (HGB) or a legal entity under public law or if he
              has no general place of jurisdiction or residence in Germany or if
              his usual place of residence is not known at the time of filing an
              action, the exclusive place of jurisdiction for all disputes
              arising out of and in connection with the contractual relationship
              between GLOBEMEE and the CUSTOMER shall be the registered office
              of GLOBEMEE.
              <br />
              <br />
              (3) Rights and obligations under this contract may not be assigned
              or transferred in whole or in part without the prior written
              consent of the other party.
              <br />
              <br />
              (4) Should any provision of these General Terms and Conditions be
              or become invalid in whole or in part, this shall not affect the
              validity of the remaining provisions.
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.container}>
            <button
              onClick={() => handleBackClick()}
              className={styles.back_btn}
            >
              <KeyboardBackspaceIcon color="inherit" />
              <p>Zurück zur Startseite</p>
            </button>
            <div>
              <h3 className="highlight">
                ALLGEMEINE GESCHÄFTSBEDINGUNGEN FÜR UNTERNEHMEN
              </h3>
            </div>
            <div className="column">
              <p>Stand: Juni 2023</p>
              <br />
              <h4>Kontaktinformationen:</h4>
              <br />
              Globemee GmbH
              <br />
              Zollhof 7
              <br />
              90443 Nürnberg
              <br />
              <br />
              Eingetragen im Handelsregister: Am 05.06.2023
              <br />
              Registergericht: Amtsgericht Nürnberg
              <br />
              Registernummer: HRB 41844
              <br />
              <br />
              Vertreten durch die Geschäftsführer in:
              <br />
              Christian Schieber und Sandra Schmitt
              <br />
              <br />
              <h5>Kontakt:</h5>
              E-Mail: sandra.schmitt@globemee.com
              <br />
              <br />
              <h5>Umsatzsteuer-ID:</h5>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
              DE356305949
              <br />
              <br />
              <br />
              <br />
              <h4>Präambel</h4>
              <br />
              Diese Allgemeinen Geschäftsbedingungen sind die verbindlichen
              Regeln, die zwischen der Globemee GmbH, Zollhof 7, 90443 Nürnberg,
              (nachfolgend „GLOBEMEE“ genannt) und Unternehmen als Kunden von
              GLOBEMEE (im Folgenden „KUNDE“ oder „USER“ genannt) gelten.
              <br />
              <br />
              GLOBEMEE ermöglicht einen Zugriff auf internationale Talente von
              Fachkräften und Akademikern mittels angebotenem sog.
              Bewerber-Poolplattform (nachfolgend „PLATTFORM“ genannt) und wirkt
              gegen den bestehenden Fachkräftemangel mit Hilfe einer globalen
              Arbeitswelt. Hierzu wird unter anderem unter Hinzuziehung eines
              eigen entwickelten Algorithmus (nachfolgend „ALGORITHMUS“ genannt)
              die qualitativ hochwertige Auswertung der Kandidaten anhand
              Qualifikation und Persönlichkeit für die KUNDEN vorgenommen, um
              die berufliche Zusammenarbeit zu ermöglichen. GLOBEMEE betreut
              weiter den KUNDEN in den für die erfolgreiche Zusammenarbeit des
              Bewerbers mit dem KUNDEN erforderlichen Prozess wie
              Visumsunterstützung und Erhalt der Arbeitserlaubnis, in Fragen der
              Berufsanerkennung sowie unterstützt die Bewerber vor Ort in
              Deutschland beim möglichen zukünftigen Berufseintritt beim KUNDEN.
              <br />
              <br />
              GLOBEMEE stellt mittels Webseite und ähnlichem sowie durch Einsatz
              des ALGORITHMUS eine PLATTFORM zur Verfügung und schafft hierdurch
              eine Plattform für Arbeits- und Karriereinformationen bezogen auf
              mögliche BEWERBER und KUNDE (nachfolgend gemeinsam „PARTEIEN“
              genannt). Zwischen GLOBEMEE und BEWERBER kommt kein Arbeits-
              und/oder Auftragsverhältnis, Arbeitsvermittlungsverhältnis,
              Maklerverhältnis oder Handelsvertreterverhältnis, keine
              Partnerschaft oder Gesellschaft bürgerlichen Rechts oder ein
              ähnliches Verhältnis zustande. Auch wird zwischen GLOBEMEE und
              KUNDE kein Auftragsverhältnis, Arbeitsvermittlungsverhältnis,
              Maklerverhältnis oder Handelsvertreterverhältnis, keine
              Partnerschaft oder Gesellschaft bürgerlichen Rechts oder ein
              ähnliches Verhältnis dahingehend geschlossen, das GLOBEMEE u.a.
              zur Arbeitsvermittlung bzw. Personalvermittlung beauftragt. Eine
              solche findet nicht statt. GLOBEMEE stellt den KUNDEN die PATTFORM
              zur Verfügung, welche separat zur Kontaktaufnahme zwischen KUNDEN
              und BEWERBER nutzbar ist. Die Erfüllung sämtlicher Verpflichtungen
              aus einem möglichen geschlossenen Vertrag zwischen dem KUNDEN und
              dem möglichen BEWERBER obliegt allein den späteren PARTEIEN.
              <br />
              <br />
              <br />
              <h4>
                § 1 Geltungsbereich und Gegenstand dieser
                Geschäftsvereinbarungen
              </h4>
              <br />
              (1) Die vorliegenden Allgemeinen Geschäftsbedingungen (AGB) regeln
              das Verhältnis zwischen GLOBEMEE und KUNDE. Das Verhältnis
              zwischen GLOBEMEE und BEWERBER bzw. zwischen den PARTEIEN ist
              ausdrücklich nicht Teil dieser AGB und wird hiervon auch nicht
              mittelbar umfasst. Gegenstand dieser AGB ist das Verhältnis
              zwischen GLOBEMEE und KUNDE sowie das Nutzungsangebot der
              PLATTFORM durch GLOBEMEE. KUNDEN sind hierbei Unternehmen i.S.d. §
              14 BGB.
              <br />
              (2) GLOBEMEE erbringt KUNDE Leistungen ausschließlich auf
              Grundlage dieser AGB in Verbindung mit möglichen Regelungen, auf
              die in diesen AGB gegebenenfalls verwiesen wird. Mit seiner
              Registrierung zur Nutzung des Angebots von GLOBEMEE erklärt KUNDE
              sein Einverständnis mit der Geltung dieser AGB.
              <br />
              <br />
              <br />
              <h4>§ 2 Leistungsbeschreibung</h4>
              <br />
              (1) Auf der Webseite mit der Internet-Domain
              https://www.globemee.com sowie den jeweiligen Subdomains stellt
              GLOBEMEE dem KUNDEN die PLATTFORM zur Verfügung. GLOBEMEE bietet
              hierbei dem KUNDEN die Möglichkeit einen UNTERNEHMENSACCOUNT
              (nachfolgend „ACCOUNT“ genannt) anzulegen sowie die Möglichkeit
              eigene Stellenanzeigen (nachfolgend „STELLENANZEIGE“ genannt) auf
              der PLATTFORM zu veröffentlichen. Bei Schaltung der STELLENANZEIGE
              kann KUNDE die BEWERBER, die sich auf diese STELLENANZEIGE melden,
              eigenständig kontaktieren und im weiteren Prozess deren
              Bewerbungen direkt im ACCOUNT oder über eine andere
              Kontaktmöglichkeit, die dem PARTEIEN zur Verfügung gestellt wird,
              erhalten.
              <br />
              <br />
              (2) KUNDE wählt über ein Online-Angebot (nachfolgend „ANGEBOT“
              genannt) über die PLATTFORM eine von GLOBEMEE angebotene
              technische Dienstleistung und bestätigt mit seiner Auswahl dadurch
              die unter Ziffer 3 angeführte Vergütung. Um die angebotenen
              Leistungen buchen zu können, bedarf es einer vorherigen
              Registrierung des ACCOUNTS. GLOBEMEE garantiert dem KUNDEN keine
              Erfolgs- und/oder Zufriedenheitsgarantie oder sonstige Garantie.
              <br />
              <br />
              (3) GLOBEMEE veröffentlicht nach erfolgter Prüfung die vom KUNDEN
              eingestellten STELLENANZEIGE auf der PLATTFORM nach Eintrag dieser
              in entsprechende Online-Formulare, die GLOBEMEE dem Kunden auf der
              PLATTFORM zur Verfügung stellt. GLOBEMEE behält sich vor vom
              KUNDEN erteilte Aufträge in Form der STELLENANZEIGE nicht
              auszuführen, oder bereits im Internet veröffentlichte
              STELLENANZEIGE wieder zu entfernen, soweit die zu veröffentlichen
              Inhalte gegen gesetzliche Vorgaben, Rechte Dritter oder die guten
              Sitten verstoßen oder gegen diese Geschäftsbedingungen verstoßen
              (nachfolgend „UNZULÄSSIGE INHALTE“ genannt). Das gleiche gilt,
              soweit KUNDE Links im Rahmen seiner STELLENANZEIGE gesetzt hat,
              die unmittelbar oder mittelbar auf Seiten mit unzulässigen
              Inhalten führen. GLOBEMEE ist bemüht die Response auf die
              STELLENANZEIGE des KUNDEN stetig zu optimieren sowie die Quantität
              und Qualität der abrufbaren Gesuche zu erhöhen.
              <br />
              <br />
              (4) GLOBEMEE unterstützt die PARTEIEN weiter im Visumsprozess für
              eine eventuell notwendig werdende Arbeitserlaubnis des BERWERBERS
              beim Tätigkeitseintritt beim KUNDEN. Eine wie auch immer geartete
              Garantie zur erfolgreichen Visumsbeschaffung kann und wird von
              GLOBEMEE dagegen nicht abgegeben. Eine solche obliegt allein den
              zuständigen Behörden, weshalb sich die Leistungserbringung seitens
              GLOBEMEE hierbei auf rein unterstützende Maßnahmen, wie
              beispielsweise die Unterstützung zur Beibringung der
              entsprechenden Unterlagen etc. begrenzt.
              <br />
              <br />
              <br />
              <h4>§ 3 Vergütung der Leistungen </h4>
              <br />
              (1) KUNDE zahlt GLOBEMEE für die unter Ziffer 2 bestimmten
              Leistungen eine Vergütung (nachfolgend „GEBÜHR“ genannt), die sich
              an dem geschlossenen Arbeitsverhältnis der PARTEIEN bestimmt und
              durch einzelvertragliche Regelung und Vereinbarung zwischen den
              PARTEIEN auf den Einzelfall bezogen, von diesen näher bestimmt
              wird. Die nähere Ausgestaltung unterliegt der dem KUNDEN bei
              Anmeldung übermittelten Preisliste sowie der individuellen
              Absprache zwischen GLOBEMEE und KUNDEN.
              <br />
              <br />
              (2) Die Gebühr wird mit erfolgreichem Vertragsschluss über eine
              gemeinsame Zusammenarbeit der PARTEIEN, bspw. mittels Abschlusses
              eines Arbeitsvertrages, fällig und entfällt nachträglich auch dann
              nicht, wenn die gemeinsame Zusammenarbeit der PARTEIEN
              nachträglich, bspw. durch Kündigung, Aufhebung der vertraglichen
              Vereinbarung etc. beendet wird. Im Übrigen gilt die individuelle
              Absprache.
              <br />
              <br />
              <br />
              <h4>§ 4 Pflichten GLOBEMEE</h4>
              <br />
              (1) GLOBEMEE stellt KUNDE die PLATTFORM auf der Webseite mit der
              Internet-Domain https://www.globemee.com samt entsprechender
              Subdomains entsprechend der dargestellten Leistungsbeschreibung
              zur Verfügung.
              <br />
              <br />
              (2) Die PLATTFORM sowie die dort angebotenen Dienste seitens
              GLOBEMEE unterliegen der kontinuierlichen Weiterentwicklung,
              weshalb Form und Beschaffenheit der PLATTFORM sowie der
              angebotenen Dienste und Funktionen sich im für den KUNDEN
              zumutbaren Umfang ändern kann. GLOBEMEE behält sich das Recht vor,
              nach eigenem Ermessen, jedoch unter angemessener Berücksichtigung
              der Interessen des KUNDEN, Einschränkungen in Bezug der Nutzung
              und Speicherkapazitäten der PLATTFORM sowie Änderungen dieser
              vorzunehmen sowie festzulegen. Entsprechende Änderungen werden mit
              einer angemessenen Vorlaufzeit dem KUNDEN mitgeteilt. Dem KUNDEN
              obliegt es bei Bedarf die auf der PLATTFORM eingestellten Daten
              anderweitig als Sicherheitskopie abzuspeichern. Der KUNDE stellt
              damit sicher, auf die eingestellten Daten auch dann Zugriff zu
              haben, wenn diese bei GLOBEMEE aufgrund einer etwaigen technischen
              Störung oder Einstellungen des Dienstes sowie Teileinstellung
              selbigen möglicherweise verloren gehen, bzw. gehen können.
              <br />
              <br />
              (3) Die technische Verfügbarkeit der PLATTFORM kann in Zeiten, in
              denen die Server wegen routinemäßiger und zuvor angekündigter
              Wartungsarbeiten oder Störungen schwanken, eingeschränkt sein.
              Weiter kann die Anzahl der möglichen KUNDEN sowie deren Vakanz,
              die auf der PLATTFORM verfügbar sind, Schwankungen unterliegen.
              GLOBEMEE gewährleistet nicht, dass KUNDEN sowie Vakanz bei
              selbigen auf der PLATTFORM sowie bei GLOBEMEE verfügbar sind, da
              eine Einflussnahme seitens GLOBEMEE hierauf nicht besteht.
              GLOBEMEE bietet alleine die PLATTFORM an und beteiligt sich,
              sofern gewünscht, ggf. auch inhaltlich an der möglichen weiteren
              Kommunikation zwischen BEWERBER und KUNDE, sofern diese
              Dienstleistung ausdrücklich gewünscht wird.
              <br />
              <br />
              <br />
              <h4>§ 5 Pflichten KUNDE</h4>
              <br />
              (1) KUNDE bleibt Rechtsinhaber sämtlicher an den von ihm auf der
              PLATTFORM eingestellten und an GLOBEMEE übermittelten Inhalten.
              KUNDE muss zum Betrieb der PLATTFORM und zur Weitergabe des
              Kontaktes an den BEWERBER, die von KUNDE eingestellten Inhalte
              vervielfältigen und ggf. im Rahmen der PLATTFORM unter Einhaltung
              der datenschutzrechtlichen Bestimmungen, insbesondere
              konkretisiert und bestimmt durch die unter
              https://www.globemee.com/datenschutz einsehbaren
              Datenschutzerklärung von GLOBEMEE, öffentlich machen. Zu diesem
              Zweck räumt KUNDE mit dem Einstellen der Inhalte auf der PLATTFORM
              GLOBEMEE ein nicht ausschließliches, widerrufliches, auf die Dauer
              dieses Vertrages beschränktes und nicht übertragbares, jedoch
              zwecks Weitergabe an BEWERBER unterlizenzierbares Nutzungsrecht an
              den vom KUNDEN auf der PLATTFORM und an GLOBEMEE sonstig
              übertragene Inhalte ein. KUNDE ist dafür verantwortlich, dass
              Rechte Dritter dieser Nutzungseinräumung nicht entgegenstehen.
              <br />
              <br />
              (2) KUNDE gewährleistet, dass alle von ihm auf der PLATTFORM
              veröffentlichten und an diese übergebenen Inhalte oder Teile davon
              frei von Rechten Dritter sind. KUNDE wird GLOBEMEE durch eine
              Verletzung dieser Vorschrift entstehende Schäden ersetzen. Weiter
              kann KUNDE wegen Einstellung von UNZULÄSSIGEN INHALTE sowie
              sonstigen derartigen Gesetzesverstößen von GLOBEMEE in Anspruch
              genommen werden. Soweit GLOBMEE wegen eines UNZULÄSSIGEN INHALTS
              als Betreiber der PLATTFORM von BEWERBERN oder Dritten in Anspruch
              genommen wird, die KUNDE zu vertreten hat, stellt KUNDE GLOBEMEE
              von derartigen Ansprüchen auf erstes Anfordern frei. Die
              Freistellung umfasst auch die erforderlichen
              Rechtsverfolgungskosten.
              <br />
              <br />
              (3) KUNDE gewährleistet ohne, dass seitens GLOBEMEE eine
              gesonderte Prüfpflicht dahingehend begründet wird, dass in den vom
              KUNDEN eingestellten STELLENANZEIGE die folgenden Inhalte
              ausgewiesen wird: a) den Namen und die Anschrift des KUNDEN, b)
              den vorgesehenen Zeitpunkt des Beginns und die vorgesehenen Dauer
              des möglichen Arbeitsverhältnisses zwischen BEWERBER und KUNDEN,
              c) den Arbeitsort oder falls, der BEWERBER nicht nur an einem
              bestimmten Arbeitsort tätig sein soll, über einen Hinweis, dass
              der BEWERBER an verschiedenen Orten beschäftigt werden kann, d)
              die zu leistende Tätigkeit, e) die vertragliche Arbeitszeit, f)
              das vertragliche Arbeitsentgelt, einschließlich vorgesehener
              Abzüge, g) die Dauer des vertraglichen Erholungsurlaubs, h) die
              Fristen für die Kündigung des Arbeitsverhältnisses zwischen
              BEWERBER und KUNDEN, i) über einen in allgemeiner Form gehaltenen
              Hinweis auf die Tarifverträge, Betriebs- oder
              Dienstvereinbarungen, die auf das Arbeitsverhältnis zwischen
              BEWERBER und KUNDEN anzuwenden sind und j) die Möglichkeit, die
              Beratungsdienste der Sozialpartner und staatlichen Stellen in
              Anspruch zu nehmen; hierbei wird GLOBEMEE mindestens beispielhaft
              die Beratungsstellen nach § 23a des
              Arbeitnehmerentsendungsgesetztes nennen und die jeweils aktuellen
              Kontaktdaten der erwähnten Beratungsdienste anbieten.
              <br />
              <br />
              (4) Für die seitens des KUNDEN eingestellten und durch die
              PLATTFORM veröffentlichten Inhalte gilt für den KUNDEN: a)
              Vorleistungen oder finanzielle Eigeninvestitionen (bspw. vorherige
              Teilnahme an Schulungen und Reisekosten) müssen deutlich im Text
              herausgestellt werden, b) die Inhalte der STELLENANZEIGE müssen
              sich auf eine freie Position oder Tätigkeit beim KUNDEN beziehen,
              c) keine Einstellung von Werbungen für die Teilnahme an illegalen
              Strukturvertrieben oder sonstige unzulässigen und strafbare
              Werbungen gem. § 16 UWG, d) Jobtitel und Tätigkeitsbeschreibung
              müssen korrekt und konkret bezeichnet werden und dürfen nicht
              irreführend oder missverständlich verwendet werden, e) Websites
              des KUNDEN die im Rahmen der STELLENANZEIGE zur Verlinkung benannt
              und GLOBEMEE übermittelt wurden, bzw. in der STELLENANZEIGE selbst
              verlinkt wurden, müssen den gesetzlichen Mindestanforderungen
              entsprechen, den datenschutzrechtlichen Bestimmungen entsprechen
              und insbesondere ein Impressum aufweisen, das den gesetzlichen
              Grundsätzen entspricht, f) die Vorgaben und Bestimmungen des
              Allgemeinen Gleichbehandlungsgesetzes (AGG) müssen eingehalten
              werden, g) die STELLENANZEIGE darf keine sachfremde Inhalte, wie
              bspw. Gewinnspiele, Veranstaltungen ohne Karrierebezug und
              Verbindung zum KUNDEN, reine Werbeaktionen etc., enthalten. Werden
              diese Anforderungen nicht erfüllt, so gelten die Inhalte als
              UNZULÄSSIGE INHALTE mit den Folgen der Ziffer 2 Abs. 3 sowie Abs.
              2 dieser Ziffer.
              <br />
              <br />
              <br />
              <h4>§ 6 Datenschutz</h4>
              <br />
              Informationen dazu, welche Daten von GLOBEMEE wie, zu welchen
              Zwecken und in welchem Umfang verarbeitet werden und welche Rechte
              KUNDEN bzw. den seitens von der Datenverarbeitung betroffenen
              Personen insofern zustehen, sind der jeweils aktuellen
              Datenschutzinformation von GLOBMEE zu entnehmen, die unter
              https://www.globemee.com/datenschutz abrufbar ist. KUNDE ist den
              deutschen Datenschutzstandards sowie den in der
              Datenschutzerklärung von GLOBEMEE dargelegten Kodizes
              verpflichtet. Auf die Bestimmungen der Datenschutzerklärung von
              GLOBEMEE wird hingewiesen und entsprechend verwiesen. Insbesondere
              sind Daten der BEWERBER, welche dem KUNDEN über die PLATTFORM zur
              Anstellungsanbahnung (z.B. Bewerbungsunterlagen etc.) zugesandt
              und übermittelt werden, bei nicht Verwendung spätestens nach sechs
              Monaten oder auf Anfrage sofort zu löschen. Der KUNDE kann die
              Bewerbungsunterlagen in seinem ACCOUNT eigenständig unter „Account
              löschen“ löschen.
              <br />
              <br />
              <br />
              <h4>§ 7 Haftung und Haftungsausschluss</h4>
              <br />
              (1) GLOBEMEE haftet aus Vertrag und Delikt a) für Schäden aufgrund
              von grober Fahrlässigkeit und Vorsatz und für solche aus der
              Verletzung von Leben, Körper und Gesundheit; b) für Schäden aus
              der Verletzung von Vertragspflichten, deren Erfüllung die
              ordnungsgemäße Durchführung des Vertrages überhaupt erst
              ermöglichen und auf deren Einhaltung der KUNDE regelmäßig vertraut
              und vertrauen durfte (so genannte „wesentliche
              Vertragspflichten“); insoweit ist die Haftung jedoch der Höhe nach
              beschränkt auf die Höhe des vorhersehbaren Schadens, mit dessen
              Entstehung typischerweise gerechnet werden muss.
              <br />
              <br />
              (2) GLOBEMEE übernimmt keine Gewähr und keine Haftung für die
              tatsächliche Qualifikation oder Eignung der vorgestellten BEWERBER
              sowie über die inhaltliche Richtigkeit der auf der PLATTFORM
              eingestellten Informationen sowie zwischen den PARTEIEN
              übermittelten Informationen samt Unterlagen. Für Schäden, die
              insbesondere im Rahmen des Auswahlverfahrens für das Fehlverhalten
              bzw. eine vorsätzliche und/oder fahrlässige Falschauskunft des
              BEWERBERS gegenüber dem KUNDEN entstehen, trifft GLOBEMEE kein
              Verschulden und ist von der Haftung bis zur Grenze des § 276 Abs.
              3 BGB frei. Weiter trägt GLOBEMEE keine anfallenden Kosten und
              Auslagen der BEWERBER gegenüber dem KUNDEN, wie bspw. Fahrkosten
              etc.
              <br />
              <br />
              (3) Die vorstehenden Haftungsbeschränkungen gelten auch zugunsten
              der Mitarbeiter, Organe und Erfüllungsgehilfen von GLOBEMEE.
              GLOBEMEE haftet nicht für das Verhalten seines Erfüllungsgehilfen,
              wenn es sich bei diesem um dem KUNDEN oder eine vom KUNDEN mit
              dieser Funktion eingesetzte Person handelt. GLOBEMEE haftet ferner
              nicht für jegliche Schäden, die auf der Zurverfügungstellung
              unzutreffender Daten und Informationen durch den KUNDEN beruhen.
              Zwingende gesetzliche Haftungsvorschriften bleiben von den
              vorstehenden Regelungen unberührt.
              <br />
              <br />
              (4) GLOBEMEE haftet nicht für den Inhalt und die Durchführung der
              zwischen dem KUNDEN und BEWERBER be- oder entstehenden
              Vertragsverhältnisse einschließlich der von den KUNDEN und
              BEWERBER zur Verfügung gestellten Angaben, Daten und
              Informationen.
              <br />
              <br />
              (5) Gesetzliche Gewährleistungsansprüche und Ansprüche des KUNDEN
              aus dem Produkthaftungs-gesetz sowie ein eventueller direkter
              Anspruch als Vertragspartner des KUNDEN werden durch die
              vorstehenden Haftungsregelungen nicht berührt.
              <br />
              <br />
              (6) GLOBEMEE übernimmt weiter keine Haftung für unbefugt
              verschafften Zugang zu persönlichen Daten angemeldeter KUNDEN
              durch Dritte (bspw. durch einen unbefugten Zugriff von Hackern auf
              die Datenbank von GLOBEMEE). Auch übernimmt GLOBEMEE für
              angeleifertes Datenmaterial, Anzeigetexte oder diesbezügliche
              Speichermedien keine Verantwortung und ist nicht verpflichtet,
              dies aufzuheben oder an den KUNDEN zurückzugeben.
              <br />
              <br />
              <br />
              <h4>§ 8 Kündigung</h4>
              <br />
              (1) Beide PARTEIEN sind berechtigt, den Vertrag jederzeit ohne
              Angabe von Gründen in Textform zu kündigen. Die Kündigung kann
              etwa per Post an die Globemee GmbH, Zollhof 7, 90443 Nürnberg oder
              per E-Mail an sandra.schmitt@globemee.com gesendet werden. Zudem
              stellt GLOBEMEE auf der PLATTFORM einen Kündigungsbutton bereit.
              Zum Schutz der Daten des KUNDEN vor unbefugten Dritten behält
              GLOBEMEE es sich vor, eine Identitätsfeststellung vorzunehmen, z.
              B. durch Abfrage des Benutzernamens und der vom KUNDEN bei
              GLOBEMEE hinterlegten E-Mail-Adresse.
              <br />
              (2) Wird der Vertrag gekündigt, gleich ob von KUNDEN oder von
              GLOBEMEE, wird GLOBEMEE die die Daten des KUNDEN (u.a. Anschrift,
              Firma, Telefonnummer, Nachrichten, hochgeladene Dateien etc.)
              löschen, soweit GLOBEMEE nicht gesetzlich zur Aufbewahrung dieser
              verpflichtet ist.
              <br />
              <br />
              <br />
              <h4>§ 9 Änderung dieser Allgemeinen Geschäftsbedingungen</h4>
              <br />
              (1) GLOBEMEE behält sich das Recht vor, diese AGB gemäß
              nachfolgenden Regelungen mit Wirkung für die Zukunft zu
              aktualisieren und in das Vertragsverhältnis mit KUNDEN
              einzubeziehen, wenn Änderungen der Rechtslage oder der
              höchstrichterlichen Rechtsprechung, Änderungen der
              Marktgegebenheiten oder Währungsumstellungen eine Anpassung
              erforderlich machen und zwar dem Umfang nach dann in den Teilen,
              die von solchen Änderungen, bzw. veränderten Umständen betroffen
              sind.
              <br />
              <br />
              (2) Diese Änderungen werden erst dann Vertragsbestandteil, wenn
              KUNDEN diesen zustimmt bzw. diesen nicht innerhalb einer Frist von
              zwei Wochen nach Mitteilung der Änderungen widerspricht. Für eine
              Mitteilung genügt es, dass GLOBEMEE die neue Fassung der AGB dem
              KUNDEN an die bei GLOBEMEE hinterlegte E-Mail-Adresse mit einem
              gesonderten Hinweis auf die Folgen/Bedeutung des Verhaltens des
              KUNDEN übermittelt. Erfolgt kein Widerspruch gegen die
              Einbeziehung der vorbeschriebenen Änderungen der AGB in das
              Vertragsverhältnis in Textform und innerhalb einer Frist von zwei
              Wochen, so gilt die Zustimmung als erteilt.
              <br />
              <br />
              (3) Eine Möglichkeit zum Widerspruch besteht nicht, sofern
              Änderungen dem KUNDEN lediglich begünstigen oder sie weder
              rechtliche noch wirtschaftliche Nachteile für diesen mit sich
              bringen. In allen anderen Fällen ist die Einbeziehung geänderter
              AGB in das Vertragsverhältnis zu dem KUNDEN nur mit dessen
              Zustimmung möglich.
              <br />
              <br />
              <br />
              <h4>§ 10 Sonstiges</h4>
              <br />
              (1) Auf die vertraglichen Beziehungen zwischen GLOBEMEE und dem
              KUNDEN sowie etwaige im Zusammenhang mit diesen entstehenden
              Streitigkeiten findet ausschließlich das Recht der Bundesrepublik
              Deutschland Anwendung unter Ausschluss des UN-Kaufrechts.
              <br />
              <br />
              (2) Ausschließlicher Gerichtsstand für alle aus und im
              Zusammenhang mit dem Vertragsverhältnis zwischen GLOBEMEE und dem
              KUNDEN entstehenden Streitigkeiten ist der Sitz von GLOBEMEE.
              <br />
              <br />
              (3) Rechte und Pflichten aus diesem Vertrag können ohne vorherige
              schriftliche Zustimmung der jeweils anderen Partei weder ganz,
              noch teilweise abgetreten oder übertragen werden.
              <br />
              <br />
              (4) Sollte eine Bestimmung dieser Allgemeinen Geschäftsbedingungen
              ganz oder teilweise unwirksam sein oder werden, so wird dadurch
              die Wirksamkeit der übrigen Bestimmungen nicht berührt.
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Agb;
