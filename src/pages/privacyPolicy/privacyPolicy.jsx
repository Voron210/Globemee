import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./privacyPolicy.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

function PrivacyPolicy() {
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
              <h3>Data protection information</h3>
            </div>
            <br />
            This data protection information informs you about the type, scope
            and purpose of the processing of personal data for which Globemee
            GmbH, Zollhof 7, 90443 Nuremberg (hereinafter also referred to as
            "Globemee") is the controller within the meaning of the EU General
            Data Protection Regulation ("GDPR"). Insofar as the terms "we",
            "us", "our" or comparable references are also used in the following
            text, only Globemee is meant in each case. In addition to the
            possibility of contacting us or our data protection officer by mail,
            you can also contact us or our data protection officer at any time
            via e-mail at sandra.schmitt@globemee.com.
            <br />
            <br />
            <p>- Data protection officer -</p>
            <p>
              Globemee GmbH
              <br />
              Zollhof 7<br />
              90443 Nuremberg
            </p>
            <br />
            <p>
              We have arranged the following information on the typical
              processing of personal data on our websites (hereinafter referred
              to as "platform") according to data subject groups. In addition,
              we may also process personal data that only concerns specific
              groups, in which case the respective groups of data subjects will
              be informed separately about the processing of their personal data
              in this regard. Insofar as the term "data" is used in the
              following text, this serves the purpose of simplification and in
              each case only personal data within the meaning of the GDPR is
              meant.
            </p>
            <p>
              Since Globemee generally falls within the scope of the GDPR, we
              have aligned our data protection information with the provisions
              of the GDPR. In individual cases, other local data protection laws
              may (additionally) also be applicable, for example if you are not
              a resident of the EU or the European Economic Area and visit our
              platform or other online presences or otherwise access our offers
              and services from outside the EU or outside the European Economic
              Area.
            </p>
            <br />
            <br />
            <br />
            <h4>I. Visitors to our platform</h4>
            <br />
            <h5>1. log data</h5>
            Each time you call up our platform, we automatically record
            information from the calling computer system, which the browser or
            app used on your end device automatically sends to the server of our
            website. This data is stored and processed on our server.
            <br />
            <br />
            1.1 The data processed in this way is protocol data that is
            processed for technical reasons when the web pages are called up via
            the Hypertext Transfer Protocol (Secure): This includes the IP
            address of the system calling up our platform, the browser type and
            version used, the operating system used, the Internet service
            provider of the system calling up our platform, the page called up
            in each case as well as the website previously visited (including
            the website of third parties previously visited) and the date and
            time of the respective call-up of our platform, the amount of data
            transferred as well as the message as to whether the access or
            retrieval of our offer was successful. Such data also accrue on
            servers of service providers, e.g. when retrieving and using
            third-party content accessed via our platform.
            <br />
            <br />
            1.2 By processing the above log data, we ensure the functionality of
            the platform. The data is processed for the purpose of establishing
            the technical connection between the end device used by you and our
            platform and the provision of the platform content accessed by you,
            as well as for the purpose of optimizing and securing our platform
            and our IT systems, in particular to prevent targeted attacks in the
            form of server overload (DoS or DDoS attacks, i.e. "denial of
            service" or "distributed denial of service" attacks) and other
            damage to the systems, as well as for troubleshooting and improving
            the functionality of our platform and for the management of cookies,
            without which individual functions of our platform cannot be made
            available.
            <br />
            <br />
            1.3 The legal basis for the processing is Article 6 (1) f) DSGVO,
            our legitimate interest is the availability and operation of the
            platform as well as ensuring network and information security and
            the exchange with our business and communication partners. When
            using offers and functions of our platform, the legal basis for the
            processing is Article 6 (1) (b) DSGVO, the user agreement or the
            General Terms and Conditions for visiting and using our platform
            (each individually and collectively referred to as the "Terms of
            Use").
            <br />
            <br />
            1.4 Recipients of personal data are also IT service providers, which
            we use within the framework of a contract processing agreement. We
            also use service providers by way of order processing in the
            provision of services, in particular for the provision, maintenance
            and care of IT systems.
            <br />
            <br />
            1.5 Log data according to this clause 1 will be deleted or
            anonymized after 7 days at the latest.
            <br />
            <br />
            1.6 Without the disclosure of personal data such as the IP address,
            the use of our platform is not possible for technical reasons.
            <br />
            <br />
            <h5>2. essential supporting service providers</h5>
            <h5>2.1 External Hosting</h5>
            Our Platform is hosted by the external service provider Wix.com, 40
            Namal Tel Aviv St., Tel Aviv 6350671, Israel ("Hoster").
            <br />
            Personal data collected on our Platform is stored on the Hoster's
            servers. This may include, in particular, log data as defined in
            Section I.1, contact requests, meta and communication data, contract
            data, contact data and other data that is usually generated via a
            website. In the case of the transfer of data to the hoster in
            Israel, an adequate level of data protection is ensured due to an
            adequacy decision of the European Commission pursuant to Article
            45(3) DSGVO. In isolated cases, it may be necessary for the hoster
            to use third-party service providers in the United States of America
            to provide its state-of-the-art services - including to defend
            against so-called DoS and DDoS attacks (denial of service or
            distributed denial of service). Further information on the data
            protection of the hoster: https://de.wix.com/about/privacy.
            <br />
            The purpose of the use of the hoster is the fulfillment of the
            contract with the users of our platform, with our customers and with
            the candidates or applicants.
            <br />
            The legal basis is Article 6 (1) (b) DSGVO (a contract or its
            initiation) and Article 6 (1) (f) DSGVO, our legitimate interest in
            a secure, fast and efficient provision of our platform by a
            professional provider. The hoster will only process your data to the
            extent necessary to fulfill its service obligations and follow our
            instructions regarding this data. To this extent, the hoster acts as
            our processor under a contract processing agreement.
            <br />
            The storage period depends on the respective types of data, about
            which we provide information below. The deletion periods stated
            there apply accordingly to our hoster.
            <h5>2.2. Cloudflare</h5>
            This involves routing the information transfer between the browser
            of the respective end device used to access our platform and our
            platform itself via Cloudflare's network. This enables Cloudflare to
            keep the traffic between the browser and our platform as far away as
            possible from potentially malicious traffic from the Internet. In
            doing so, Cloudflare may also use its own cookies or other
            technologies to recognize Internet users, but these are used solely
            for the purpose described here.
            <br />
            The purpose of the use of Cloudflare is in particular the defense
            against so-called DoS and DDoS attacks ("denial of service" or
            "distributed denial of service" attacks).
            <br />
            The legal basis is Article 6 (1) f) DSGVO, our legitimate interest
            is the most error-free and secure provision of our platform and our
            website as a whole. Cloudflare will only process your data insofar
            as this is necessary for the fulfillment of its performance
            obligations and follow our instructions regarding this data. To this
            extent, Cloudflare acts as our processor under a contract processing
            agreement. The data transfer to the USA is carried out on the basis
            of the standard contractual clauses of the EU Commission. Details on
            this and further information on data protection at Cloudflare:
            <br />
            https://www.cloudflare.com/privacypolicy/.
            <br />
            The storage period depends on the respective data types, about which
            we provide information below. The deletion periods stated there
            apply accordingly to Cloudflare.
            <h5>2.3. Bubble.io</h5>
            For the provision of the Platform, we further make use of the
            services of Bubble.io, Bubble Group, Inc, 22 W 21st St, Floor 2, New
            York, NY 10010, USA ("Bubble").
            <br />
            The data processed by Bubble is the data collected on our platform,
            in particular the log data according to section I.1, contact
            requests, meta and communication data, contract data, contact data
            and other data act that are usually generated via a website. The
            purpose of using Bubble is in particular the presentation of our
            platform.
            <br />
            The legal basis is Article 6 (1) (b) DSGVO (a contract or its
            initiation) and Article 6 (1) (f) DSGVO, our legitimate interest in
            a secure, fast and efficient provision of our platform by a
            professional provider. Bubble will only process your data to the
            extent necessary to fulfill its performance obligations and follow
            our instructions with respect to such data. To this extent, Bubble
            acts as our processor under a contract processing agreement. The
            data transfer to the USA is carried out on the basis of the standard
            contractual clauses of the EU Commission. Details on this and
            further information on data protection at Bubble:
            https://bubble.io/privacy and https://bubble.io/dpa.
            <br />
            The storage period depends on the respective data types, about which
            we provide information below. The deletion periods stated there
            apply accordingly to Bubble.
            <br />
            <br />
            <h5>3. Cookies</h5>
            We use so-called cookies on our platform. "Cookies" are text files
            containing information that can be stored on the visitor's terminal
            device via the browser when visiting the platform. Cookies are
            either sent from the web server to the visitor's browser or
            generated directly in the visitor's browser. Cookies usually contain
            characteristic character strings that enable unique identification
            of the browser or application when our platform is called up again.
            In doing so, we use the processing and storage functions of the
            browser through which the visitor accesses our platform and collect
            this information from the browser of the terminal device used to
            access our platform.
            <br />
            The purpose of our cookies is to technically enable the use of our
            platform as well as to simplify the use of the platform and to
            tailor the platform to the specific needs of the respective visitor.
            <br />
            You can generally disable cookies in your browser at any time.
            Different browsers offer different ways to individually configure
            the cookie settings of the respective browser. However, we would
            like to point out that some functions of our platform may not work
            or no longer work properly if you generally disable cookies.
            <br />
            Session cookies
            <br />
            So-called session cookies are used on our platform. The data is
            automatically transmitted by the browser used to call up our
            platform, but is only valid for the duration of your respective
            online session (the so-called "session"). The data is deleted at the
            end of the respective session.
            <br />
            Other cookies In addition, cookies are also used on our platform
            that remain stored on the end device even after the end of the
            session; in particular, cookies that contain individual user
            decisions. These cookies are usually deleted after twelve (12)
            months at the latest.
            <h5>3.1 Technically necessary cookies</h5>
            Cookies that are technically necessary for the functioning of our
            Platform cannot be disabled via Consent Management (as defined
            below) in our Cookie Settings.
            <br />
            Consent Cookies
            <br />
            The use of cookies on our Platform can be managed via the Cookie
            Settings (hereinafter also referred to as "Consent Management").
            This consent management uses so-called "Consent Cookies" to store
            consents, any revocations of consents and objections to the use of
            certain cookies on our platform.
            <br />
            In doing so, the log data as defined in section I.1 of this privacy
            information and your individual user decision to use cookies are
            processed, i.e. your decision on consent, any revocations of consent
            or objections to the use of individual cookies or groups of cookies,
            as well as the time of your respective decision.
            <br />
            The purpose of this processing is to store your user decision to use
            the cookies. The legal basis for the processing via consent
            management is Article 6 (1) lit. f) DSGVO or Section 25 (2) No. 2
            TTDSG, our legitimate interest is the simple and reliable control of
            cookies according to the respective user decision.
            <br />
            Recipients of the personal data stored via the consent management
            are also IT service providers, which we use within the scope of an
            order processing agreement. The information about your individual
            decision in the consent management to object to the use of cookies
            on our websites is deleted at the end of the session (session
            cookie).
            <br />
            Other technically necessary cookies
            <br />
            The processed data is information about your user account, user
            logins, individual settings and certain actions. In this context,
            log data, in particular the IP address, and data about the user
            account and consent cookies are processed.
            <br />
            The purpose of this processing is to enable login and individual
            settings in the user account, system monitoring to secure the user
            account and to combat fraud, and the technical provision of
            user-based functions.
            <br />
            The legal basis for the processing is Article 6 (1) (b) DSGVO (our
            Terms of Use) and our legitimate interest in providing the
            individual sessions, including the function to consent or object to
            cookies, in each case pursuant to Article 6 (1) (f) DSGVO and
            Section 25 (2) No. 2 TTDSG.
            <br />
            The data is automatically transmitted by the browser used to call up
            our platform. Recipients of the data are also IT service providers
            that we use as processors (in particular the hoster) under an order
            processing agreement. The data will be deleted after twelve (12)
            months at the latest.
            <h5>3.2. Functional cookies</h5>
            Functional cookies are used to improve the user experience and allow
            us to store and process individual user decisions. In this context,
            user decisions are processed (e.g., the decision about the language
            in which you want to use our platform). The functional cookies can
            be both activated and deactivated again via the consent management
            in our cookie settings.
            <br />
            The purpose of the processing is the storage of individual
            decisions. The legal basis for the processing is Article 6 (1) a)
            DSGVO or Section 25 (1) TTDSG, your consent. You can revoke the
            respective consent at any time for the future. The data will be
            deleted after twelve (12) months.
            <h5>3.3. Analysis and statistics</h5>
            Insofar as you have given your consent in the consent management, we
            process data of visitors to our platform for the ongoing
            optimization of the platform and for reach analysis. The legal basis
            for the processing is Article 6 (1) a) DSGVO or Section 25 (1)
            TTDSG, your consent. You can change your decision to activate or
            deactivate cookies for analysis and statistics via the consent
            management in our cookie settings with effect for the future.
            <br />
            We also use order processors to process the data. We have concluded
            an order processing agreement with each of our order processors. The
            transfer and processing of personal data by our processors is
            carried out in accordance with the respective order processing
            contracts.
            <h5>3.4. Marketing</h5>
            Insofar as you have given your consent in the consent management, we
            process data of visitors to our platform in order to collect
            information about the effect of marketing campaigns. The legal basis
            for the processing is Article 6 (1) a) DSGVO or Section 25 (1)
            TTDSG, your consent. You can change your decision to activate or
            deactivate cookies for analysis and statistics via the consent
            management in our cookie settings with effect for the future.
            <br />
            We also use order processors to process the data. We have concluded
            an order processing agreement with each of our order processors. The
            transfer and processing of personal data by our processors is
            carried out in accordance with the respective order processing
            contracts.
            <br />
            <br />
            <br />
            <h4>II. Users</h4>
            <br />
            1. if you create and/or have created a user account with us, you are
            either a candidate within the meaning of the General Terms and
            Conditions or at the same time also a customer pursuant to Section
            III or an employee of a customer pursuant to Section III and in this
            respect are entitled to create and/or manage an already created user
            account of the customer. We process your data for the purpose of
            fulfilling our obligations in accordance with the applicable
            contractual relationship (in this respect always also taking into
            account our obligations to the other users or customers) and
            documenting them. This also includes the creation and use of your
            user account for interaction with us or our platform and its
            functions, in particular, therefore, also for interaction with other
            users. We also process your data for verification and authentication
            purposes and for storing such authentication information. There are
            no plans to change these purposes.
            <br />
            <br />
            2. the processed data are protocol data according to point I.1, Name
            and contact data, further data from the registration of your user
            account and the user profile created by you and any content,
            documents and information you have deposited in your user account
            (including resume information deposited by you as well as
            job-related data such as information on professional degrees and
            professional experience and specializations as well as
            entry-relevant and visa-related data), account events (in particular
            the change of job-related information), your individual settings for
            your user account, the use of functions in connection with
            contacting companies and applicants, including validations and, if
            applicable, time stamps of the respective account events. Timestamps
            of the respective account events, browser settings, communication
            and usage data. You can change the contact data, account settings
            and content in your user account at any time and delete documents
            you have deposited.
            <br />
            <br />
            3. the legal basis for the processing of data related to your user
            account is Article 6 para. 1 lit. b) DSGVO (the Terms of Use) and
            Article 6 para. 1 lit. c) DSGVO (legal obligations) and, if
            applicable, in addition your consent pursuant to Article 6 para. 1
            lit. a) DSGVO. The legal basis for the processing of contact data of
            users who are not natural persons is Art. 6 para.1 lit. f) DSGVO,
            the legitimate interest is the communication with our users. The
            legal basis for information about services and new features as well
            as the analysis of your usage behavior is Art. 6 para. 1 lit. f)
            DSGVO (our legitimate interest is to improve our performance and
            service offering) and, if applicable, your consent pursuant to Art.
            6 para. 1 lit. a) DSGVO. The legal basis for the retention of your
            data, which may be relevant for certain legal disputes, is also
            Article 6 para. 1 lit. f) DSGVO, our legitimate interest is to
            defend ourselves against possible claims.
            <br />
            <br />
            4. log data, account events and details of your usage behavior
            within the offers and services provided by us are automatically
            transmitted by your browser. All other information is provided to
            you.
            <br />
            <br />
            5. we use service providers under a contract processing agreement as
            processors for the provision of services, such as service providers
            for the provision, maintenance and care of IT systems and / or to
            perform services owed to our users, or in the context of
            communication. In individual cases, data may be transferred to
            collection service providers, lawyers and courts.
            <br />
            <br />
            6. all data relevant to the contract and accounting will be stored
            in accordance with the retention periods under tax and commercial
            law for a period of currently six (6) or ten (10) calendar years
            after the end of the contract with the user. Data that may be
            relevant for the defense of possible (legal) claims will be stored
            for at least three (3) years, this corresponds to the statutory
            limitation period.
            <br />
            <br />
            7. the provision of data is partly mandatory for users to create a
            user account due to legal requirements and contractual agreements.
            Without the provision of data, the contractual relationship with our
            customers cannot be established and/or carried out or can be
            significantly impaired.
            <br />
            <br />
            <br />
            <h4>III. Customers</h4>
            <br />
            1. we process your data for the purpose of fulfilling the
            obligations arising from our contractual relationship as well as
            their documentation, for interacting with our customers, in
            particular for advising and informing them about new functions and
            service offers as well as for invoicing and payment processing.
            <br />
            <br />
            2. The processed data are name and contact data of the customer, any
            contact person at the customer, also and in particular for
            registration and validation of the user accounts, communication and
            usage data, contract data and contract contents, billing address and
            details, payment data (in particular account and bank data as well
            as information on payment card holders), the contract and payment
            history, account events on the user accounts assigned to the
            customer, payment confirmations of our payment service providers.
            <br />
            <br />
            3. the legal basis for processing the data of customers who are
            natural persons is the Article 6(1)(b) DSGVO (the contract with you)
            and legal obligations under Article 6(1)(c) DSGVO. The legal basis
            for the processing of contact information provided by customers who
            are not natural persons of the natural person(s) representing the
            customers is Article 6(1)(f) DSGVO, our legitimate interest is to
            communicate with our customers. The legal basis for information
            about new products and offers is Article 6 (1) (f) DSGVO, our
            legitimate interest is advertising. The legal basis for the
            transmission of payment information to payment service providers is
            the fulfillment of the contract and/or the legitimate interest in
            the execution of payments according to Art. 6 (1) (b) or (c) DSGVO).
            The legal basis for the transmission of historical contract and
            payment information to payment service providers is Article 6 (1) a)
            DSGVO (your consent). The legal basis for the retention of your
            data, which may be relevant for certain legal disputes, is Article
            6(1) lit. f) DSGVO, our legitimate interest is to defend ourselves
            against possible claims.
            <br />
            <br />
            4. the payment confirmation is provided to us by the payment service
            providers we use. The remaining data is provided by you. We use
            service providers on the basis of and within the framework of an
            order processing agreement as processors for the provision of
            services, such as the provision, maintenance and care of IT systems.
            Banks and payment service providers may also be recipients of data
            for the processing of payments and, where applicable, credit checks.
            In individual cases, data may also be transmitted to collection
            service providers, lawyers and courts.
            <br />
            <br />
            5. data relevant to the contract and accounting will be stored in
            accordance with the retention periods under tax and commercial law
            for a period of six (6) or ten (10) calendar years after the end of
            the contractual relationship. Data relevant to the defense of
            possible claims will be stored until the legal possibility of
            asserting claims ceases to exist, i.e. in this respect usually for
            the duration of the respective statutory period of limitation, but
            at the longest for the duration of the respective statutory maximum
            period of limitation.
            <br />
            (6) The provision of data is obligatory for customers due to legal
            and contractual requirements. This also includes data of users on
            the part of the customer, which is to be processed by us in the
            context of the execution of the contract. Without the provision of
            data, the contractual relationship cannot be established and
            executed.
            <br />
            <br />
            <br />
            <h4>IV. Communication partners</h4>
            <br />
            When you contact us - e.g. via our contact form, by e-mail, letter
            or telephone - we collect all the information you provide, which
            regularly includes personal data.
            <br />
            <br />
            1. the purpose of the processing is the preparation and
            implementation of a contractual relationship and / or other
            communication, including the review and response to requests you
            send to us.
            <br />
            <br />
            2. the data we process are names, contact details, communication
            content, timestamp of the communication and technical metadata of
            the communication.
            <br />
            <br />
            3. legal basis for the processing of personal data is Article
            6(1)(c) DSGVO (legal obligations, in particular tax and commercial
            regulations), as well as in the case of contracts with natural
            persons Article 6(1)(b) DSGVO (a contract or contract initiation)
            and in the case of contracts with legal persons Article 6(1)(f)
            DSGVO, our legitimate interest is the communication with contact
            persons relevant to the contract. In the case of pure communication,
            the legal basis is Article 6 (1) (f) DSGVO, our legitimate interest
            is to respond to inquiries directed to us and to document
            communication processes.
            <br />
            <br />
            4 Contact and contract data may be transmitted to other service
            providers, business partners as well as public offices and
            authorities, if this is necessary for the execution of the contract
            or order. We also use service providers by way of order processing
            in the provision of technical services, in particular for the
            provision, maintenance and care of IT systems.
            <br />
            <br />
            5. data of contractual partners and service providers will be
            deleted no later than ten (10) calendar years after the end of the
            contractual relationship with the respective partner or service
            provider.
            <br />
            <br />
            6. processing of contact data at service providers and business
            partners is necessary to perform the contract or order. If the data
            is not provided, communication may be significantly disrupted.
            <br />
            <br />
            <br />
            <h4>V. Visitors to our social media pages</h4>
            <br />
            We have pages operated by us on the so-called social media platforms
            ("Social Media Pages"). The Social Media Pages are operated by third
            party service providers who process data for the purpose of
            providing such pages.
            <br />
            The data processed is content and usage data on the Social Media
            Sites, in particular data relating to visitors' interaction with our
            Social Media Sites and data that visitors to our Social Media Sites
            share with us.
            <br />
            The purpose of data processing on our social media pages is to
            provide visitors with interesting content and to interact with you
            on the social media platforms. Depending on the social media
            platform, the usage data may also be analyzed in order to improve
            our own presence on the respective social media platform.
            <br />
            The legal basis for the processing of data by us is Article 6 (1) f)
            DSGVO, our legitimate interest is the analysis of usage data to
            improve our respective social media site.
            <br />
            Information and data displayed or shared on our social media pages
            may be accessible to the respective provider of the social media
            platform, its users and us or other service providers commissioned
            by us. Further details and supplementary information on data
            processing on the respective social media sites can be found below
            and in the data protection information of the respective social
            media platform linked there:
            <br />
            <br />
            <h5>1. LinkedIn</h5>
            We and LinkedIn - for users in the EU or the European Economic Area,
            LinkedIn Ireland Unlimited Company, Wilton Plaza, Wilton Place,
            Dublin 2, Ireland ("LinkedIn") are jointly responsible for the
            processing of personal data via our social media page on the
            LinkedIn platform. The joint responsibility agreement is available
            at: https://legal.linkedin.com/pages-joint-controller-addendum.
            Under this agreement, LinkedIn is responsible for informing data
            subjects about the processing activities. LinkedIn's privacy policy
            is available at: https://de.linkedin.com/legal/privacy-policy.
            <br />
            <h5>2. Facebook and Instagram</h5>
            We and Facebook - for users in the EU or the European Economic Area,
            Facebook Ireland Ltd, 4 Grand Canal Square, Grand Canal Harbour,
            Dublin 2, Ireland ("Facebook") - are jointly responsible for
            processing data through our social media pages on the Facebook and
            Instagram platforms. The joint responsibility agreement is available
            at: https://www.facebook.com/legal/terms/page_controller_addendum.
            Under this agreement, Facebook is responsible for informing data
            subjects about the processing activities. The privacy policy for
            social media pages on the Facebook platform is available at:
            https://www.facebook.com/privacy/explanation, the privacy policy for
            social media pages for the Instagram platform is available at:
            https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect
            .
            <br />
            <h5>3. twitter</h5>
            We are responsible for the social media page we operate on the
            Twitter platform of Twitter, Inc, 1355 Market Street, Suite 900 San
            Francisco, CA 94103, USA ("Twitter"). For users in the EU or the
            European Economic Area, the supplementary data protection agreement
            between Twitter and us applies, available at:
            https://gdpr.twitter.com/en/controller-to-controller-transfers.html.
            Twitter's privacy policy is available at:
            https://twitter.com/en/privacy.
            <br />
            <br />
            <br />
            <h4>VI. Rights of the data subjects and further information</h4>
            We do not use any procedures of automated individual case decisions
            without your prior consent.
            <br />
            <br />
            1. you have the right to request information about all personal data
            we process about you at any time.
            <br />
            <br />
            2. if your personal data is incorrect or incomplete, you have the
            right to have it corrected and completed.
            <br />
            <br />
            3. you may request the deletion of your personal data at any time,
            unless we are legally obliged or entitled to further process your
            data.
            <br />
            <br />
            4. if the legal requirements are met, you may request restriction of
            the processing of your personal data.
            <br />
            <br />
            5. you have the right to object to processing insofar as the data
            processing is carried out for the purpose of direct marketing or
            profiling.
            <br />
            <br />
            6. if the processing is carried out on the basis of a balancing of
            interests, you may object to the processing by stating the reasons
            arising from your particular situation.
            <br />
            <br />
            7. if the data processing is carried out on the basis of your
            consent or within the framework of a contract, you have a right to
            transfer the data you have provided, provided that this does not
            affect the rights and freedoms of other persons.
            <br />
            <br />
            8. if we process your data on the basis of a declaration of consent,
            you have the right to revoke this consent at any time with effect
            for the future. The processing carried out before a revocation
            remains unaffected by the revocation.
            <br />
            <br />
            9. you also have the right to lodge a complaint with a supervisory
            authority for data protection at any time if you are of the opinion
            that data processing has been carried out in violation of applicable
            law.
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
        </>
      ) : (
        <>
          <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.back_btn}>
              <KeyboardBackspaceIcon color="inherit" />
              <p>Zurück zur Startseite</p>
            </button>
            <div>
              <h3 className="highlight">Datenschutzinformation</h3>
            </div>
            <br />
            Diese Datenschutzinformationen informieren Sie über Art, Umfang und
            Zweck der Verarbeitung personenbezogener Daten, für die Globemee
            GmbH, Zollhof 7, 90443 Nürnberg (nachstehend auch „Globemee“
            genannt) Verantwortlicher im Sinne der EU
            Datenschutz-Grundverordnung („DSGVO“) ist. Sofern im nachfolgenden
            Text auch die Bezeichnungen „wir“, „uns“, „unser“ oder vergleichbare
            Bezugnahmen verwendet werden, ist damit jeweils allein Globemee
            gemeint. Neben der Möglichkeit, mit uns bzw. mit unserem
            Datenschutzbeauftragten auf dem Postweg in Verbindung zu treten,
            können Sie mit uns bzw. mit unserem Datenschutzbeauftragten
            jederzeit auch über per E-Mail unter sandra.schmitt@globemee.com
            Kontakt aufnehmen.
            <br />
            <br />
            <p>- Datenschutzbeauftragter -</p>
            <p>
              Globemee GmbH
              <br />
              Zollhof 7<br />
              90443 Nuremberg
            </p>
            <br />
            <p>
              Die nachfolgenden Informationen zu den typischen Verarbeitungen
              personenbezogener Daten auf unseren Webseiten (nachfolgend als
              „Plattform“ bezeichnet) haben wir nach Betroffenengruppen
              geordnet. Darüber hinaus verarbeiten wir unter Umständen auch
              personenbezogene Daten, die nur spezifische Gruppen betreffen, in
              diesem Fall werden die jeweiligen Betroffenengruppen über die
              diesbezügliche Verarbeitung Ihrer personenbezogenen Daten
              gesondert informiert. Sofern im nachfolgenden Text der Begriff
              "Daten" verwendet wird, dient dies der Vereinfachung und es sind
              jeweils allein personenbezogene Daten im Sinne der DSGVO gemeint.
            </p>
            <p>
              Da Globemee grundsätzlich in den Anwendungsbereich der DSGVO
              fällt, haben wir unsere Datenschutzinformationen an den
              Bestimmungen der DSGVO ausgerichtet. Im Einzelfall können
              (zusätzlich) auch andere lokale Datenschutzgesetze anwendbar sein,
              etwa wenn Sie nicht in der EU oder im europäischen Wirtschaftsraum
              ansässig sind und unsere Plattform oder sonstigen Online-Präsenzen
              besuchen oder auf sonstige Weise auf unsere Angebote und
              Dienstleistungen von außerhalb der EU oder außerhalb des
              europäischen Wirtschaftsraums zugreifen.
            </p>
            <br />
            <br />
            <br />
            <h4>I. Besucherinnen und Besucher unserer Plattform</h4>
            <br />
            <h5>1. Protokolldaten</h5>
            Bei jedem Ihrer Aufrufe unserer Plattform erfassen wir automatisiert
            Informationen vom aufrufenden Computersystem, die der auf Ihrem
            Endgerät zum Einsatz kommende Browser oder die auf Ihrem Endgerät
            verwendete App automatisch an den Server unserer Webseite sendet.
            Diese Daten werden auf unserem Server gespeichert und verarbeitet.
            <br />
            <br />
            1.1. Die auf diese Weise verarbeiteten Daten sind Protokolldaten,
            die beim Aufruf der Webseiten über das Hypertext Transfer Protocol
            (Secure) technisch bedingt verarbeitet werden: Hierzu zählen die
            IP-Adresse des unsere Plattform aufrufenden Systems, der verwendete
            Browsertyp und die verwendete Browserversion, das verwendete
            Betriebssystem, der Internet-Service-Provider des unsere Plattform
            aufrufenden Systems, die jeweils aufgerufene Seite sowie die zuvor
            besuchte Webseite (auch die zuvor besuchte Webseite Dritter) und das
            Datum und die Uhrzeit des jeweiligen Aufrufs unserer Plattform, die
            übertragene Datenmenge sowie die Meldung, ob der Zugriff bzw. Abruf
            unseres Angebots erfolgreich war. Solche Daten fallen auch auf
            Servern von Dienstleistern an, z.B. beim Abruf und der Nutzung von
            über unsere Plattform aufgerufene Inhalte Dritter.
            <br />
            <br />
            1.2. Mit der Verarbeitung der vorstehenden Protokolldaten stellen
            wir die Funktionsfähigkeit der Plattform sicher. Die Daten werden
            zum Zweck der Herstellung der technischen Verbindung zwischen dem
            von Ihnen verwendeten Endgerät und unserer Plattform und der
            Bereitstellung der von Ihnen aufgerufenen Inhalte der Plattform
            sowie zum Zweck der Optimierung und Sicherheit unserer Plattform und
            unserer IT-Systeme verarbeitet, insbesondere, um gezielte Angriffe
            in Form der Überlastung von Servern (DoS- bzw. DDoS-Angriffe, d.h.
            „Denial-of-Service“- bzw. „Distributed-Denial-of-Service“-Angriffe)
            und andere Schädigungen der Systeme abwehren zu können, sowie zur
            Fehlerbehebung und zur Verbesserung der Funktionalität unserer
            Plattform sowie zur Verwaltung von Cookies, ohne die einzelne
            Funktionen unserer Plattform nicht zur Verfügung gestellt werden
            können.
            <br />
            <br />
            1.3. Rechtsgrundlage für die Verarbeitung ist Artikel 6 Abs. 1 lit.
            f) DSGVO, unser berechtigtes Interesse ist die Verfügbarkeit und der
            Betrieb der Plattform sowie die Gewährleistung der Netz- und
            Informationssicherheit und der Austausch mit unseren Geschäfts- und
            Kommunikationspartnern. Bei der Inanspruchnahme von Angeboten und
            Funktionen unserer Plattform ist die Rechtsgrundlage für die
            Verarbeitung Artikel 6 Abs. 1 lit. b) DSGVO, der Nutzungsvertrag
            bzw. die Allgemeinen Geschäftsbedingungen für den Besuch und die
            Benutzung unserer Plattform (jeweils einzeln und gemeinsam als
            „Nutzungsbedingungen“ bezeichnet).
            <br />
            <br />
            1.4. Empfänger der personenbezogenen Daten sind auch
            IT-Dienstleister, welche wir im Rahmen einer Vereinbarung zur
            Auftragsverarbeitung einsetzen. Wir setzen ferner Dienstleister im
            Wege der Auftragsverarbeitung bei der Erbringung von Leistungen ein,
            insbesondere für die Bereitstellung, Wartung und Pflege von
            IT-Systemen.
            <br />
            <br />
            1.5. Protokolldaten nach dieser Ziffer 1 werden spätestens nach 7
            Tagen gelöscht oder anonymisiert.
            <br />
            <br />
            1.6. Ohne die Preisgabe personenbezogener Daten wie z.B. der
            IP-Adresse ist eine Nutzung unserer Plattform aus technischen
            Gründen nicht möglich.
            <br />
            <br />
            <h5>2. Wesentliche unterstützende Dienstleister</h5>
            <h5>2.1. Externes Hosting</h5>
            Unsere Plattform wird beim externen Dienstleister Wix.com, 40 Namal
            Tel Aviv St., Tel Aviv 6350671, Israel („Hoster“) gehostet.
            <br />
            Die personenbezogenen Daten, die auf unserer Plattform erfasst
            werden, werden auf den Servern des Hosters gespeichert. Hierbei kann
            es sich insbesondere um Protokolldaten gem. Ziffer I.1,
            Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
            Kontaktdaten und sonstige Daten handeln, die über eine Webseite
            üblicherweise generiert werden. Im Falle der Übermittlung von Daten
            an den Hoster in Israel ist aufgrund eines
            Angemessenheitsbeschlusses der Europäischen Kommission gemäß Artikel
            45 Absatz 3 DSGVO ein angemessenes Datenschutzniveau gewährleistet.
            Vereinzelt kann es notwendig sein, dass der Hoster zur
            Bereitstellung seiner Dienstleistungen auf dem Stand der Technik –
            auch zur Abwehr sogenannter DoS- und DDoS-Angriffe
            (Denial-of-Service bzw. Distributed-Denial-of-Service) – dritte
            Dienstleister in den Vereinigten Staaten von Amerika einsetzt.
            Weitere Hinweise zum Datenschutz des Hosters:
            https://de.wix.com/about/privacy.
            <br />
            Zweck des Einsatzes des Hosters ist die Vertragserfüllung gegenüber
            den Nutzerinnen und Nutzern unserer Plattform, gegenüber unseren
            Kundinnen und Kunden sowie gegenüber den Kandidaten bzw. Bewerbern.
            <br />
            Rechtsgrundlage ist Artikel 6 Abs. 1 lit. b) DSGVO (ein Vertrag oder
            dessen Anbahnung) sowie Artikel 6 Abs. 1 lit. f) DSGVO, unser
            berechtigtes Interesse an einer sicheren, schnellen und effizienten
            Bereitstellung unserer Plattform durch einen professionellen
            Anbieter. Der Hoster wird Ihre Daten nur insoweit verarbeiten, wie
            dies zur Erfüllung seiner Leistungspflichten erforderlich ist und
            unsere Weisungen in Bezug auf diese Daten befolgen. Der Hoster ist
            insoweit als unser Auftragsverarbeiter im Rahmen einer
            Auftragsverarbeitungsvereinbarung tätig.
            <br />
            Die Speicherdauer richtet sich nach den jeweiligen Datenarten, über
            die wir im Folgenden informieren. Die dort jeweils angegebenen
            Löschfristen gelten für unseren Hoster entsprechend.
            <br />
            (1) Auf der Webseite mit der Internet-Domain
            https://www.globemee.com sowie den jeweiligen Subdomains stellt
            GLOBEMEE dem KUNDEN die PLATTFORM zur Verfügung. GLOBEMEE bietet
            hierbei dem KUNDEN die Möglichkeit einen UNTERNEHMENSACCOUNT
            (nachfolgend „ACCOUNT“ genannt) anzulegen sowie die Möglichkeit
            eigene Stellenanzeigen (nachfolgend „STELLENANZEIGE“ genannt) auf
            der PLATTFORM zu veröffentlichen. Bei Schaltung der STELLENANZEIGE
            kann KUNDE die BEWERBER, die sich auf diese STELLENANZEIGE melden,
            eigenständig kontaktieren und im weiteren Prozess deren Bewerbungen
            direkt im ACCOUNT oder über eine andere Kontaktmöglichkeit, die dem
            PARTEIEN zur Verfügung gestellt wird, erhalten.
            <br />
            (2) KUNDE wählt über ein Online-Angebot (nachfolgend „ANGEBOT“
            genannt) über die PLATTFORM eine von GLOBEMEE angebotene technische
            Dienstleistung und bestätigt mit seiner Auswahl dadurch die unter
            Ziffer 3 angeführte Vergütung. Um die angebotenen Leistungen buchen
            zu können, bedarf es einer vorherigen Registrierung des ACCOUNTS.
            GLOBEMEE garantiert dem KUNDEN keine Erfolgs- und/oder
            Zufriedenheitsgarantie oder sonstige Garantie.
            <br />
            (3) GLOBEMEE veröffentlicht nach erfolgter Prüfung die vom KUNDEN
            eingestellten STELLENANZEIGE auf der PLATTFORM nach Eintrag dieser
            in entsprechende Online-Formulare, die GLOBEMEE dem Kunden auf der
            PLATTFORM zur Verfügung stellt. GLOBEMEE behält sich vor vom KUNDEN
            erteilte Aufträge in Form der STELLENANZEIGE nicht auszuführen, oder
            bereits im Internet veröffentlichte STELLENANZEIGE wieder zu
            entfernen, soweit die zu veröffentlichen Inhalte gegen gesetzliche
            Vorgaben, Rechte Dritter oder die guten Sitten verstoßen oder gegen
            diese Geschäftsbedingungen verstoßen (nachfolgend „UNZULÄSSIGE
            INHALTE“ genannt). Das gleiche gilt, soweit KUNDE Links im Rahmen
            seiner STELLENANZEIGE gesetzt hat, die unmittelbar oder mittelbar
            auf Seiten mit unzulässigen Inhalten führen. GLOBEMEE ist bemüht die
            Response auf die STELLENANZEIGE des KUNDEN stetig zu optimieren
            sowie die Quantität und Qualität der abrufbaren Gesuche zu erhöhen.
            <br />
            (4) GLOBEMEE unterstützt die PARTEIEN weiter im Visumsprozess für
            eine eventuell notwendig werdende Arbeitserlaubnis des BERWERBERS
            beim Tätigkeitseintritt beim KUNDEN. Eine wie auch immer geartete
            Garantie zur erfolgreichen Visumsbeschaffung kann und wird von
            GLOBEMEE dagegen nicht abgegeben. Eine solche obliegt allein den
            zuständigen Behörden, weshalb sich die Leistungserbringung seitens
            GLOBEMEE hierbei auf rein unterstützende Maßnahmen, wie
            beispielsweise die Unterstützung zur Beibringung der entsprechenden
            Unterlagen etc. begrenzt.
            <h5>2.2. Cloudflare</h5>
            Wir setzen ferner den Service „Cloudflare“ auf unserer Plattform
            ein. Anbieter ist die Cloudflare Inc., 101 Townsend St., San
            Francisco, CA 94107, USA („Cloudflare”). Cloudflare bietet ein
            weltweit verteiltes Content Delivery Network (CDN) mit sogenanntem
            Domain Name System (DNS) an.
            <br />
            Hierbei wird der Informationstransfer zwischen dem Browser des
            jeweiligen Endgeräts, mit dem unsere Plattform aufgerufen wird,
            sowie unserer Plattform selbst über das Netzwerk von Cloudflare
            geleitet. Das versetzt Cloudflare in die Lage, den Datenverkehr
            zwischen dem Browser und unserer Plattform von potenziell bösartigem
            Datenverkehr aus dem Internet möglichst fernzuhalten. Dabei ist es
            möglich, dass Cloudflare auch eigene Cookies oder sonstige
            Technologien zur Wiedererkennung von Internetnutzern einsetzt, die
            jedoch allein zum hier beschriebenen Zweck verwendet werden.
            <br />
            Zweck des Einsatzes von Cloudflare ist insbesondere die Abwehr
            sogenannter DoS-und DDoS-Angriffe („Denial-of-Service“- bzw.
            „Distributed-Denial-of-Service“-Angriffe).
            <br />
            Rechtsgrundlage ist Artikel 6 Abs. 1 lit. f) DSGVO, unser
            berechtigtes Interesse ist die möglichst fehlerfreie und sichere
            Bereitstellung unserer Plattform und unseres Webangebotes insgesamt.
            Cloudflare wird Ihre Daten nur insoweit verarbeiten, wie dies zur
            Erfüllung seiner Leistungspflichten erforderlich ist und unsere
            Weisungen in Bezug auf diese Daten befolgen. Cloudflare ist insoweit
            als unser Auftragsverarbeiter im Rahmen einer
            Auftragsverarbeitungsvereinbarung tätig. Die Datenübertragung in die
            USA wird auf Basis der Standardvertragsklauseln der EU-Kommission
            durchgeführt. Details herzu sowie weitere Hinweise zum Datenschutz
            bei Cloudflare: https://www.cloudflare.com/privacypolicy/.
            <br />
            Die Speicherdauer richtet sich nach den jeweiligen Datenarten, über
            die wir im Folgenden informieren. Die dort jeweils angegebenen
            Löschfristen gelten für Cloudflare entsprechend.
            <h5>2.3. Bubble.io</h5>
            Für die Bereitstellung der Plattform bedienen wir uns ferner der
            Dienste der Bubble.io, Bubble Group, Inc., 22 W 21st St, Floor 2,
            New York, NY 10010, USA („Bubble“).
            <br />
            Die durch Bubble verarbeiteten Daten sind die Daten, die auf unserer
            Plattform erfasst werden, insbesondere die Protokolldaten gem.
            Ziffer I.1, Kontaktanfragen, Meta- und Kommunikationsdaten,
            Vertragsdaten, Kontaktdaten und sonstige Daten handeln, die über
            eine Webseite üblicherweise generiert werden. Zweck des Einsatzes
            von Bubble ist insbesondere die Darstellung unserer Plattform.
            <br />
            Rechtsgrundlage ist Artikel 6 Abs. 1 lit. b) DSGVO (ein Vertrag oder
            dessen Anbahnung) sowie Artikel 6 Abs. 1 lit. f) DSGVO, unser
            berechtigtes Interesse an einer sicheren, schnellen und effizienten
            Bereitstellung unserer Plattform durch einen professionellen
            Anbieter. Bubble wird Ihre Daten nur insoweit verarbeiten, wie dies
            zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere
            Weisungen in Bezug auf diese Daten befolgen. Bubble ist insoweit als
            unser Auftragsverarbeiter im Rahmen einer
            Auftragsverarbeitungsvereinbarung tätig. Die Datenübertragung in die
            USA wird auf Basis der Standardvertragsklauseln der EU-Kommission
            durchgeführt. Details herzu sowie weitere Hinweise zum Datenschutz
            bei Bubble: https://bubble.io/privacy und https://bubble.io/dpa.
            <br />
            Die Speicherdauer richtet sich nach den jeweiligen Datenarten, über
            die wir im Folgenden informieren. Die dort jeweils angegebenen
            Löschfristen gelten für Bubble entsprechend.
            <br />
            <br />
            <h5>3. Cookies</h5>
            Wir setzen auf unserer Plattform sogenannte Cookies ein. „Cookies“
            sind Textdateien mit Informationen, die bei dem Besuch der Plattform
            über den Browser auf dem Endgerät des Besuchers gespeichert werden
            können. Cookies werden entweder vom Webserver an den Browser des
            Besuchers gesendet oder direkt im Browser des Besuchers erzeugt.
            Cookies enthalten in der Regel charakteristische Zeichenfolgen, die
            eine eindeutige Identifizierung des Browsers bzw. der Anwendung beim
            erneuten Aufrufen unserer Plattform ermöglichen. Dabei nutzen wir
            die Verarbeitungs- und Speicherfunktionen des Browsers, über den der
            Besucher auf unsere Plattform zugreift und erheben diese
            Informationen aus dem Browser desjenigen Endgeräts, mit dem unsere
            Plattform aufgerufen wird.
            <br />
            Der Zweck unserer Cookies ist es, die Nutzung unserer Plattform
            technisch zu ermöglichen sowie die Nutzung der Plattform zu
            vereinfachen und die Plattform am konkreten Bedarf des jeweiligen
            Besuchers auszurichten.
            <br />
            Sie können Cookies jederzeit generell in Ihrem Browser deaktivieren.
            Verschiedene Browser bieten unterschiedliche Wege, um die
            Cookie-Einstellungen des jeweiligen Browsers individuell zu
            konfigurieren. Wir möchten Sie jedoch darauf hinweisen, dass
            möglicherweise einige Funktionen unserer Plattform nicht oder nicht
            mehr ordnungsgemäß funktionieren, wenn Sie Cookies generell
            deaktivieren.
            <br />
            Session cookies
            <br />
            Auf unserer Plattform kommen sogenannte Session-Cookies
            (Sitzungs-Cookies) zum Einsatz. Die Daten werden automatisch durch
            den zum Aufruf unserer Plattform verwendeten Browser übermittelt,
            gelten jedoch nur für die Dauer ihrer jeweiligen Online-Sitzung (die
            sogenannte „Session“). Die Daten werden am Ende der jeweiligen
            Session gelöscht.
            <br />
            Other cookies Darüber hinaus kommen auch Cookies auf unserer
            Plattform zum Einsatz, die auch nach dem Ende der Session auf dem
            Endgerät gespeichert bleiben; insbesondere solche Cookies, die
            individuelle Nutzerentscheidungen enthalten. Diese Cookies werden in
            der Regel nach spätestens zwölf (12) Monaten gelöscht.
            <h5>3.1. Technisch erforderliche Cookies</h5>
            Die für die Funktion unserer Plattform technisch erforderlichen
            Cookies können über die Einwilligungsverwaltung (wie nachstehend
            definiert) in unseren Cookie-Einstellungen nicht deaktiviert werden.
            <br />
            Consent Cookies
            <br />
            Der Einsatz von Cookies auf unserer Plattform kann über die
            Cookie-Einstellungen verwaltet werden (nachstehend auch
            „Einwilligungsverwaltung“ genannt). Diese Einwilligungsverwaltung
            setzt sogenannte „Consent Cookies“ ein, um Einwilligungen, etwaige
            Widerrufe von Einwilligungen und Widersprüche gegen den Einsatz
            bestimmter Cookies auf unserer Plattform zu speichern.
            <br />
            Dabei werden die Protokolldaten im Sinne der Ziffer I.1 dieser
            Datenschutzinformation und Ihre individuelle Nutzerentscheidung zum
            Einsatz von Cookies verarbeitet, d.h. Ihre Entscheidung über die
            Einwilligung, etwaige Widerrufe von Einwilligungen oder Widersprüche
            gegen den Einsatz einzelner Cookies oder Gruppen von Cookies sowie
            den Zeitpunkt Ihrer jeweiligen Entscheidung.
            <br />
            Zweck dieser Verarbeitung ist die Speicherung Ihrer
            Nutzerentscheidung zum Einsatz der Cookies. Die Rechtsgrundlage für
            die Verarbeitung über die Einwilligungsverwaltung ist Artikel 6
            Absatz 1 lit. f) DSGVO bzw. § 25 Abs. 2 Nr. 2 TTDSG, unser
            berechtigtes Interesse ist die einfache und zuverlässige Steuerung
            von Cookies entsprechend der jeweiligen Nutzerentscheidung.
            <br />
            Empfänger der über die Einwilligungsverwaltung gespeicherten
            personenbezogenen Daten sind auch IT-Dienstleister, welche wir im
            Rahmen einer Vereinbarung zur Auftragsverarbeitung einsetzen. Die
            Informationen über Ihre individuelle Entscheidung in der
            Einwilligungsverwaltung, dem Einsatz von Cookies auf unseren
            Webseiten zu widersprechen, werden am Ende der Sitzung gelöscht
            (Session Cookie).
            <br />
            Sonstige technisch erforderliche Cookies
            <br />
            Die verarbeiteten Daten sind Informationen über Ihr Nutzerkonto,
            Nutzeranmeldungen, individuelle Einstellungen und bestimmte
            Aktionen. Dabei werden Protokolldaten, insbesondere die IP-Adresse,
            und Daten über das Nutzerkonto und die Consent Cookies verarbeitet.
            <br />
            Zweck dieser Verarbeitung ist die Ermöglichung des Logins und
            individueller Einstellungen im Nutzerkonto, die Systemüberwachung
            zur Sicherung des Nutzerkontos und zur Betrugsbekämpfung sowie die
            technische Bereitstellung nutzerbasierter Funktionen.
            <br />
            Die Rechtsgrundlage für die Verarbeitung ist Artikel 6 Abs. 1 lit.
            b) DSGVO (unsere Nutzungsbedingungen) und unser berechtigtes
            Interesse an der Bereitstellung der einzelnen Sessions,
            einschließlich der Funktion zum Einwilligen bzw. Widersprechen von
            Cookies, jeweils gemäß Art. 6 Abs. 1 lit. f) DSGVO bzw. § 25 Abs. 2
            Nr. 2 TTDSG.
            <br />
            Die Daten werden automatisch durch den zum Aufruf unserer Plattform
            verwendeten Browser übermittelt. Empfänger der Daten sind auch
            IT-Dienstleister, die wir im Rahmen einer
            Auftragsverarbeitungsvereinbarung als Auftragsverarbeiter
            (insbesondere der Hoster) einsetzen. Die Daten werden spätestens
            nach zwölf (12) Monaten gelöscht.
            <h5>3.2. Funktionale Cookies</h5>
            Funktionale Cookies dienen der Verbesserung des Benutzererlebnisses
            und erlauben es uns, individuelle Entscheidungen der Nutzerinnen und
            Nutzer zu speichern und verarbeiten. Dabei werden
            Nutzerentscheidungen verarbeitet (z.B. die Entscheidung über die
            Sprache, in der Sie unsere Plattform verwenden möchten). Die
            funktionalen Cookies können über die Einwilligungsverwaltung in
            unseren Cookie-Einstellungen sowohl aktiviert als auch wieder
            deaktiviert werden.
            <br />
            Zweck der Verarbeitung ist die Speicherung individueller
            Entscheidungen. Die Rechtsgrundlage für die Verarbeitung ist Artikel
            6 Abs. 1 lit. a) DSGVO bzw. § 25 Abs. 1 TTDSG, Ihre Einwilligung.
            Sie können die jeweilige Einwilligung jederzeit für die Zukunft
            widerrufen. Die Daten werden nach zwölf (12) Monaten gelöscht.
            <h5>3.3. Analyse und Statistik</h5>
            Soweit Sie in der Einwilligungsverwaltung Ihre Einwilligung dazu
            erklärt haben, verarbeiten wir Daten der Besucher unserer Plattform
            für die fortwährende Optimierung der Plattform und für die
            Reichweitenanalyse. Die Rechtsgrundlage für die Verarbeitung ist
            Artikel 6 Abs. 1 lit. a) DSGVO bzw. § 25 Abs. 1 TTDSG, Ihre
            Einwilligung. Ihre Entscheidung über die Aktivierung oder
            Deaktivierung von Cookies zur Analyse und Statistik können Sie über
            die Einwilligungsverwaltung in unseren Cookie-Einstellungen mit
            Wirkung für die Zukunft ändern.
            <br />
            Zur Verarbeitung der Daten setzen wir auch Auftragsverarbeiter ein.
            Mit unseren Auftragsverarbeitern haben wir jeweils einen
            Auftragsverarbeitungsvertrag abgeschlossen. Die Weitergabe und
            Verarbeitung der personenbezogenen Daten durch unsere
            Auftragsverarbeiter erfolgt im Einklang mit den jeweiligen
            Auftragsverarbeitungsverträgen.
            <h5>3.4. Marketing</h5>
            Soweit Sie in der Einwilligungsverwaltung Ihre Einwilligung dazu
            erklärt haben, verarbeiten wir Daten der Besucher unserer Plattform,
            um Informationen über die Wirkung von Marketingkampagnen zu
            erfassen. Die Rechtsgrundlage für die Verarbeitung ist Artikel 6
            Abs. 1 lit. a) DSGVO bzw. § 25 Abs. 1 TTDSG, Ihre Einwilligung. Ihre
            Entscheidung über die Aktivierung oder Deaktivierung von Cookies zur
            Analyse und Statistik können Sie über die Einwilligungsverwaltung in
            unseren Cookie-Einstellungen mit Wirkung für die Zukunft ändern.
            <br />
            Zur Verarbeitung der Daten setzen wir auch Auftragsverarbeiter ein.
            Mit unseren Auftragsverarbeitern haben wir jeweils einen
            Auftragsverarbeitungsvertrag abgeschlossen. Die Weitergabe und
            Verarbeitung der personenbezogenen Daten durch unsere
            Auftragsverarbeiter erfolgt im Einklang mit den jeweiligen
            Auftragsverarbeitungsverträgen.
            <br />
            <br />
            <br />
            <h4>II. Nutzerinnen und Nutzer</h4>
            <br />
            1. Wenn Sie ein Nutzerkonto bei uns anlegen und/oder angelegt haben,
            sind Sie entweder Kandidat bzw. Bewerber im Sinne der Allgemeinen
            Geschäftsbedingungen oder zugleich auch Kundin oder Kunde gemäß
            Ziffer III. bzw. Mitarbeiterin oder Mitarbeiter bei einer Kundin
            oder einem Kunden gemäß Ziffer III. und insoweit zum Anlegen
            und/oder der Betreuung eines bereits angelegten Nutzerkontos der
            Kundin bzw. des Kunden berechtigt. Wir verarbeiten Ihre Daten zum
            Zweck der Erfüllung unserer Verpflichtungen gemäß des jeweils
            geltenden Vertragsverhältnisses (insoweit stets auch unter
            Berücksichtigung unserer Verpflichtungen gegenüber den anderen
            Nutzerinnen und Nutzern bzw. Kundinnen und Kunden) und deren
            Dokumentation. Dazu gehört auch die Einrichtung und Nutzung Ihres
            Nutzerkontos für die Interaktion mit uns bzw. unserer Plattform und
            dessen Funktionen, insbesondere also auch für die Interaktion mit
            anderen Nutzern. Wir verarbeiten Ihre Daten auch zu Verifikations-
            und Authentifizierungszwecken und zur Speicherung solcher
            Authentifizierungsinformationen. Eine Änderung dieser Zwecke ist
            nicht geplant.
            <br />
            <br />
            2. Die verarbeiteten Daten sind Protokolldaten gemäß Ziffer I.1,
            Name und Kontaktdaten, weitere Daten aus der Registrierung Ihres
            Nutzerkontos und dem von Ihnen erstellten Nutzerprofil und etwaigen
            von Ihnen in Ihrem Nutzerkonto hinterlegten Inhalte, Dokumente und
            Angaben (einschließlich der von Ihnen hinterlegten Informationen zum
            Lebenslauf sowie berufsbezogene Daten wie etwa Informationen zu
            Berufsabschlüssen und beruflichen Erfahrungen und Spezialisierungen
            sowie einreiserelevante und visumsbezogene Daten), Kontoereignisse
            (insbesondere die Änderung von berufsbezogenen Informationen), Ihre
            individuellen Einstellungen für Ihr Nutzerkonto, die Nutzung von
            Funktionen im Zusammenhang mit der Kontaktaufnahme zwischen
            Unternehmen und Bewerbern, einschließlich Validierungen und ggf.
            Zeitstempeln der jeweiligen Kontoereignisse, Browsereinstellungen,
            Kommunikations- und Nutzungsdaten. Sie können die Kontaktdaten,
            Kontoeinstellungen und Inhalte in Ihrem Nutzerkonto jederzeit ändern
            und von Ihnen hinterlegte Dokumente löschen.
            <br />
            <br />
            3. Die Rechtsgrundlage für die Verarbeitung der Daten im
            Zusammenhang mit Ihrem Nutzerkonto ist Artikel 6 Abs. 1 lit. b)
            DSGVO (die Nutzungsbedingungen) und Artikel 6 Abs. 1 lit. c) DSGVO
            (gesetzliche Pflichten) sowie gegebenenfalls darüber hinaus Ihre
            Einwilligung gemäß Artikel 6 Abs. 1 lit. a) DSGVO. Die
            Rechtsgrundlage für die Verarbeitung von Kontaktdaten von Nutzern,
            die keine natürlichen Personen sind, ist Art. 6 Abs.1 lit. f) DSGVO,
            das berechtigte Interesse ist die Kommunikation mit unseren Nutzern.
            Die Rechtsgrundlage für Informationen über Leistungen und neue
            Funktionen sowie die Analyse Ihres Nutzungsverhaltens ist Artikel 6
            Abs. 1 lit. f) DSGVO (unser berechtigtes Interesse ist die
            Verbesserung unseres Leistungs- und Serviceangebots) sowie ggf. Ihre
            Einwilligung gemäß Artikel 6 Abs. 1 lit. a) DSGVO. Die
            Rechtsgrundlage für die Aufbewahrung Ihrer Daten, die für bestimmte
            Rechtsstreitigkeiten relevant sein können, ist ebenfalls Artikel 6
            Abs. 1 lit. f) DSGVO, unser berechtigtes Interesse ist es, uns gegen
            mögliche Ansprüche zu verteidigen.
            <br />
            <br />
            4. Die Protokolldaten, die Kontoereignisse und Details zu Ihrem
            Nutzungsverhalten innerhalb der von uns zur Verfügung gestellten
            Angebote und Services werden automatisch von Ihrem Browser
            übermittelt. Alle sonstigen Informationen werden Ihnen
            bereitgestellt.
            <br />
            <br />
            5. Wir setzen Dienstleister im Rahmen einer
            Auftragsverarbeitungsvereinbarung als Auftragsverarbeiter für die
            Erbringung von Dienstleistungen ein, wie z.B. Dienstleister für die
            Bereitstellung, Wartung und Pflege von IT-Systemen und/oder zur
            Durchführung von unseren Nutzern gegenüber geschuldeten Leistungen,
            oder im Rahmen der Kommunikation. In Einzelfällen können Daten an
            Inkassodienstleister, Rechtsanwälte und Gerichte übermittelt werden.
            <br />
            <br />
            6. Alle vertrags- und buchhaltungsrelevanten Daten werden
            entsprechend den steuer- und handelsrechtlichen Aufbewahrungsfristen
            für einen Zeitraum von derzeit sechs (6) bzw. zehn (10)
            Kalenderjahren nach Ende des Vertrages mit dem Nutzer gespeichert.
            Daten, die für die Abwehr möglicher (rechtlicher) Ansprüche relevant
            sein können, werden mindestens drei (3) Jahre gespeichert, dies
            entspricht der gesetzlichen Regelverjährung.
            <br />
            <br />
            7. Die Bereitstellung von Daten ist für Nutzer zur Erstellung eines
            Nutzerkontos aufgrund gesetzlicher Vorgaben und vertraglicher
            Vereinbarungen teilweise verpflichtend. Ohne die Angabe von Daten
            kann das Vertragsverhältnis mit unseren Kundinnen bzw. Kunden nicht
            begründet und/oder durchgeführt werden bzw. erheblich beeinträchtigt
            werden.
            <br />
            <br />
            <br />
            <h4>III. Kundinnen und Kunden</h4>
            <br />
            1. Wir verarbeiten Ihre Daten zum Zweck der Erfüllung der
            Verpflichtungen aus unserem Vertragsverhältnis sowie deren
            Dokumentation, zur Interaktion mit unseren Kundinnen und Kunden,
            insbesondere zur Beratung und Information über neue Funktionen und
            Leistungsangebote sowie zur Rechnungserstellung und
            Zahlungsabwicklung.
            <br />
            <br />
            2. Die verarbeiteten Daten sind Name und Kontaktdaten der Kundin
            bzw. des Kunden, etwaiger Ansprechpartner bei der Kundin bzw. beim
            Kunden, auch und insbesondere zur Registrierung und Validierung der
            Nutzerkontos, Kommunikations- und Nutzungsdaten, Vertragsdaten und
            Vertragsinhalte, Rechnungsadresse und -details, Zahlungsdaten
            (insbesondere Konto- und Bankdaten sowie Informationen zu
            Zahlungskarteninhabern), die Vertrags- und Zahlungshistorie,
            Kontoereignisse auf den der Kundin bzw. dem Kunden zugeordneten
            Nutzerkonten, Zahlungsbestätigungen unserer Zahlungsdienstleister.
            <br />
            <br />
            3. Die Rechtsgrundlage für die Verarbeitung der Daten von Kundinnen
            und Kunden, die natürliche Personen sind, ist der Artikel 6 Absatz 1
            lit. b) DSGVO (der Vertrag mit Ihnen) und gesetzliche
            Verpflichtungen gemäß Artikel 6 Absatz 1 lit. c) DSGVO. Die
            Rechtsgrundlage für die Verarbeitung der von Kundinnen und Kunden,
            die keine natürlichen Personen sind, zur Verfügung gestellten
            Kontaktinformationen der die Kundinnen und Kunden vertretenden
            natürlichen Person(en) ist Artikel 6 Abs. 1 lit. f) DSGVO, unser
            berechtigtes Interesse ist die Kommunikation mit unseren Kundinnen
            und Kunden. Die Rechtsgrundlage für Informationen über neue Produkte
            und Angebote ist Artikel 6 Abs. 1 lit. f) DSGVO, unser berechtigtes
            Interesse ist die Werbung. Die Rechtsgrundlage für die Übermittlung
            von Zahlungsinformationen an Zahlungsdienstleister ist die
            Vertragserfüllung und/oder das berechtigte Interesse an der
            Durchführung von Zahlungen gemäß Art. 6 Abs. 1 lit. b) bzw. lit. c)
            DSGVO). Die Rechtsgrundlage für die Übermittlung von historischen
            Vertrags- und Zahlungsinformationen an Zahlungsdienstleister ist
            Artikel 6 Abs. 1 lit. a) DSGVO (Ihre Einwilligung). Die
            Rechtsgrundlage für die Aufbewahrung Ihrer Daten, die für bestimmte
            Rechtsstreitigkeiten relevant sein können, ist Artikel 6 Absatz 1
            lit. f) DSGVO, unser berechtigtes Interesse ist es, uns gegen
            mögliche Ansprüche zu verteidigen.
            <br />
            <br />
            4. Die Zahlungsbestätigung wird uns von den von uns eingesetzten
            Zahlungsdienstleistern bereitgestellt. Die übrigen Daten werden von
            Ihnen selbst bereitgestellt. Wir setzen Dienstleister auf Grundlage
            und im Rahmen einer Auftragsverarbeitungsvereinbarung als
            Auftragsverarbeiter für die Erbringung von Dienstleistungen ein, wie
            z.B. für die Bereitstellung, Wartung und Pflege von IT-Systemen.
            Banken und Zahlungsdienstleister können ferner Empfänger von Daten
            für die Abwicklung von Zahlungen und ggf. Bonitätsprüfungen sein. In
            Einzelfällen können Daten auch an Inkassodienstleister,
            Rechtsanwälte und Gerichte übermittelt werden.
            <br />
            <br />
            5. Die vertrags- und buchhaltungsrelevanten Daten werden
            entsprechend den steuer- und handelsrechtlichen Aufbewahrungsfristen
            für einen Zeitraum von sechs (6) bzw. zehn (10) Kalenderjahren nach
            dem Ende der Vertragsbeziehung gespeichert. Daten, die für die
            Abwehr möglicher Ansprüche relevant sind, werden gespeichert, bis
            die gesetzliche Möglichkeit der Geltendmachung von Ansprüchen
            entfällt, insoweit also üblicherweise für die Dauer der jeweiligen
            gesetzlichen Regelverjährungsfrist, längstens jedoch für die Dauer
            der jeweiligen gesetzlichen Verjährungshöchstfrist.
            <br />
            6. Die Bereitstellung von Daten ist für Kundinnen und Kunden
            aufgrund gesetzlicher und vertraglicher Vorgaben verpflichtend. Dies
            umfasst auch Daten von Nutzerinnen und Nutzern aufseiten der Kundin
            oder des Kunden, die von uns im Rahmen der Vertragsdurchführung
            verarbeitet werden sollen. Ohne die Angabe von Daten kann das
            Vertragsverhältnis nicht begründet und durchgeführt werden.
            <br />
            <br />
            <br />
            <h4>IV. Kommunikationspartnerinnen und -partner</h4>
            <br />
            Wenn Sie mit uns – z.B. über unser Kontaktformular, per E-Mail,
            Brief oder telefonisch – Kontakt aufnehmen, erheben wir sämtliche
            von Ihnen zur Verfügung gestellten Informationen, die regelmäßig
            auch personenbezogene Daten beinhalten.
            <br />
            <br />
            1. Zweck der Verarbeitung ist die Vorbereitung und Durchführung
            einer Vertragsbeziehung und/oder einer sonstigen Kommunikation
            einschließlich der Prüfung und Beantwortung der von Ihnen an uns
            gerichteten Anfragen.
            <br />
            <br />
            2. Die von uns verarbeiteten Daten sind Namen, Kontaktdaten,
            Kommunikationsinhalte, Zeitstempel der Kommunikation sowie
            technische Metadaten der Kommunikation.
            <br />
            <br />
            3. Rechtsgrundlagen für die Verarbeitung personenbezogener Daten
            sind Artikel 6 Abs. 1 lit. c) DSGVO (gesetzliche Pflichten,
            insbesondere steuer- und handelsrechtliche Vorschriften), sowie bei
            Verträgen mit natürlichen Personen Artikel 6 Abs. 1 lit. b) DSGVO
            (ein Vertrag oder eine Vertragsanbahnung) und bei Verträgen mit
            juristischen Personen Artikel 6 Abs. 1 lit. f) DSGVO, unser
            berechtigtes Interesse ist die Kommunikation mit vertragsrelevanten
            Ansprechpartnern. Bei reiner Kommunikation ist Rechtsgrundlage
            Artikel 6 Abs. 1 lit. f) DSGVO, unser berechtigtes Interesse ist die
            Beantwortung von an uns gerichtete Anfragen sowie die Dokumentation
            von Kommunikationsvorgängen.
            <br />
            <br />
            4. Kontakt- und Vertragsdaten können an weitere Dienstleister,
            Geschäftspartner sowie Ämter und Behörden übermittelt werden, sofern
            dies für die Durchführung des Vertrages oder Auftrages erforderlich
            ist. Wir setzen ferner Dienstleister im Wege der
            Auftragsverarbeitung bei der Erbringung von technischen Leistungen
            ein, insbesondere für die Bereitstellung, Wartung und Pflege von
            IT-Systemen.
            <br />
            <br />
            5. Daten von Vertragspartnern und Dienstleistern werden spätestens
            zehn (10) Kalenderjahre nach dem Ende der Vertragsbeziehung mit dem
            jeweiligen Partner bzw. Dienstleister gelöscht.
            <br />
            <br />
            6. Die Verarbeitung der Kontaktdaten bei Dienstleistern und
            Geschäftspartnern ist erforderlich, um den Vertrag oder Auftrag
            durchzuführen. Werden die Daten nicht bereitgestellt, kann die
            Kommunikation erheblich gestört werden.
            <br />
            <br />
            <br />
            <h4>V. Besucherinnen und Besucher unserer Social Media Seiten</h4>
            <br />
            Wir verfügen über von uns betriebene Seiten auf den sogenannten
            Social Media Plattformen („Social Media Seiten“). Die Social Media
            Seiten werden von dritten Dienstleistern betrieben, die Daten für
            die Bereitstellung solcher Seiten verarbeiten.
            <br />
            Die verarbeiteten Daten sind Inhalts- und Nutzungsdaten auf den
            Social Media Seiten, insbesondere solche, die die Interaktion der
            Besucherinnen und Besucher mit unseren Social Media Seiten betreffen
            und solche, die Besucherinnen und Besucher unserer Social Media
            Seiten mit uns teilen.
            <br />
            Zweck der Datenverarbeitung auf unseren Social-Media-Seiten ist es,
            den Besucherinnen und Besuchern interessante Inhalte zu bieten und
            mit Ihnen auf den Social Media Plattformen zu interagieren. Je nach
            Social Media Plattform können die Nutzungsdaten auch analysiert
            werden, um unseren eigenen Auftritt auf der jeweiligen Social Media
            Plattform zu verbessern.
            <br />
            Rechtsgrundlage für die Verarbeitung von Daten durch uns ist Artikel
            6 Abs. 1 lit. f) DSGVO, unser berechtigtes Interesse ist die Analyse
            von Nutzungsdaten zur Verbesserung unserer jeweiligen Social Media
            Seite.
            <br />
            Informationen und Daten, die auf unseren Social Media Seiten
            angezeigt oder geteilt werden, können für den jeweiligen Anbieter
            der Social Media Plattform, seinen Nutzerinnen und Nutzern sowie uns
            oder von uns beauftragten sonstigen Dienstleistern zugänglich sein.
            Weitere Einzelheiten und ergänzende Informationen zur
            Datenverarbeitung auf den jeweiligen Social Media Seiten finden Sie
            nachstehend sowie in den dort verlinkten Datenschutzinformationen
            der jeweiligen Social Media Plattform:
            <br />
            <br />
            <h5>1. LinkedIn</h5>
            Wir und LinkedIn – für Nutzerinnen und Nutzer in der EU bzw. dem
            europäischen Wirtschaftsraum die LinkedIn Ireland Unlimited Company,
            Wilton Plaza, Wilton Place, Dublin 2, Irland („LinkedIn“) sind
            gemeinsam für die Verarbeitung personenbezogener Daten über unsere
            Social Media Seite auf der Plattform LinkedIn verantwortlich. Die
            Vereinbarung über die gemeinsame Verantwortlichkeit ist abrufbar
            unter: https://legal.linkedin.com/pages-joint-controller-addendum.
            Gemäß dieser Vereinbarung ist LinkedIn dafür verantwortlich, die
            betroffenen Personen über die Verarbeitungstätigkeiten zu
            informieren. Die Datenschutzrichtlinie von LinkedIn ist abrufbar
            unter: https://de.linkedin.com/legal/privacy-policy.
            <br />
            <h5>2. Facebook and Instagram</h5>
            Wir und Facebook – für Nutzerinnen und Nutzer in der EU bzw. im
            europäischen Wirtschaftsraum die Facebook Ireland Ltd., 4 Grand
            Canal Square, Grand Canal Harbour, Dublin 2, Irland („Facebook“) –
            sind gemeinsam für die Verarbeitung der Daten über unsere Social
            Media Seiten auf den Plattformen Facebook und Instagram
            verantwortlich. Die Vereinbarung über die gemeinsame
            Verantwortlichkeit ist abrufbar unter:
            https://www.facebook.com/legal/terms/page_controller_addendum. Gemäß
            dieser Vereinbarung ist Facebook dafür verantwortlich, die
            betroffenen Personen über die Verarbeitungstätigkeiten zu
            informieren. Die Datenschutzrichtlinie für Social Media Seiten auf
            der Plattform Facebook ist abrufbar unter:
            https://www.facebook.com/privacy/explanation, die
            Datenschutzrichtlinie für Social Media Seiten für die Plattform
            Instagram ist abrufbar unter:
            https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect
            .
            <br />
            <h5>3. Twitter</h5>
            Wir sind für die von uns betriebene Social Media Seite auf der
            Plattform Twitter der Twitter, Inc., 1355 Market Street, Suite 900
            San Francisco, CA 94103, USA („Twitter“) verantwortlich. Für
            Nutzerinnen und Nutzer in der EU bzw. im europäischen
            Wirtschaftsraum gilt die Datenschutz-Zusatzvereinbarung zwischen
            Twitter und uns, abrufbar unter:
            https://gdpr.twitter.com/en/controller-to-controller-transfers.html.
            Die Datenschutzrichtlinie von Twitter ist abrufbar unter:
            https://twitter.com/en/privacy.
            <br />
            <br />
            <br />
            <h4>VI. Rechte der Betroffenen und weitere Angaben</h4>
            Wir nutzen keine Verfahren automatisierter Einzelfallentscheidungen
            ohne Ihre vorherige Einwilligung.
            <br />
            <br />
            1. Sie haben das Recht, jederzeit Auskunft über alle
            personenbezogenen Daten zu verlangen, die wir von Ihnen verarbeiten.
            <br />
            <br />
            2. Sollten Ihre personenbezogenen Daten unrichtig oder unvollständig
            sein, haben Sie ein Recht auf Berichtigung und Ergänzung.
            <br />
            <br />
            3. Sie können jederzeit die Löschung Ihrer personenbezogenen Daten
            verlangen, sofern wir nicht rechtlich zur weiteren Verarbeitung
            Ihrer Daten verpflichtet oder berechtigt sind.
            <br />
            <br />
            4. Bei Vorliegen der gesetzlichen Voraussetzungen können Sie eine
            Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
            verlangen.
            <br />
            <br />
            5. Sie haben das Recht gegen die Verarbeitung Widerspruch zu
            erheben, soweit die Datenverarbeitung zum Zwecke der Direktwerbung
            oder des Profilings erfolgt.
            <br />
            <br />
            6. Erfolgt die Verarbeitung auf Grund einer Interessenabwägung, so
            können Sie der Verarbeitung unter Angabe von Gründen, die sich aus
            Ihrer besonderen Situation ergeben, widersprechen.
            <br />
            <br />
            7. Erfolgt die Datenverarbeitung auf Grundlage Ihrer Einwilligung
            oder im Rahmen eines Vertrages, so haben Sie ein Recht auf
            Übertragung der von Ihnen bereitgestellten Daten, sofern dadurch
            nicht die Rechte und Freiheiten anderer Personen beeinträchtigt
            werden.
            <br />
            <br />
            8. Sofern wir Ihre Daten auf Grundlage einer Einwilligungserklärung
            verarbeiten, haben Sie jederzeit das Recht, diese Einwilligung mit
            Wirkung für die Zukunft zu widerrufen. Die vor einem Widerruf
            durchgeführte Verarbeitung bleibt von dem Widerruf unberührt.
            <br />
            <br />
            9. Sie haben außerdem jederzeit das Recht, bei einer
            Aufsichtsbehörde für den Datenschutz Beschwerde einzulegen, wenn Sie
            der Auffassung sind, dass eine Datenverarbeitung unter Verstoß gegen
            geltendes Recht erfolgt ist.
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
        </>
      )}
    </div>
  );
}

export default PrivacyPolicy;
