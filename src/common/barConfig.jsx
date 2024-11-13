import JobMatchesIcon from "../assets/jobMatchesIcon.svg";
import TalentIcon from "../assets/TalentIcon.svg";
import FAQHelpIcon from "../assets/faqHelpIcon.svg";
import CompanyIcon from "../assets/CompanyIcon.svg";
import Home2Icon from "../assets/Home2Icon.svg";
import BlogIcon from "../assets/BlogIcon.png";

const barConfig = {
  talentBar: [
    {
      icon: JobMatchesIcon,
      name: "Job Matches",
      path: "talent-home",
    },
    {
      icon: TalentIcon,
      name: "My Profile",
      path: "talent-profile",
    },
    {
      icon: FAQHelpIcon,
      name: "FAQ & Help",
      path: "talent-faqs",
    },
    {
      icon: BlogIcon,
      name: "Globemee Blog",
      path: "https://globemee.com/en/category/talent-en/",
      external: true,
    },
  ],
  companyBar: [
    {
      icon: Home2Icon,
      name: "Dashboard",
      path: "company-home",
    },
    {
      icon: TalentIcon,
      name: "Neue Stelle",
      path: "create-job-offer",
    },
    {
      icon: JobMatchesIcon,
      name: "Meine Stellen",
      path: "company-job-offers",
    },
    {
      icon: CompanyIcon,
      name: "Mein Unternehmen",
      path: "company-profile",
    },
    {
      icon: FAQHelpIcon,
      name: "FAQ & Hilfe",
      path: "company-faqs",
    },
  ],
};

export default barConfig;
