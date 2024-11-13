const headerConfig = {
  talentHeader: [
    {
      icon: "dashboard",
      name: "Job overview",
      path: "talent-home",
    },
    {
      icon: "post_add",
      name: "My Profile",
      path: "talent-profile",
    },
    {
      icon: "newsmode",
      name: "Blog",
      path: "https://globemee.com/en/category/talent-en/",
      external: true,
    },
  ],
  companyHeader: [
    {
      icon: "dashboard",
      name: "Dashboard",
      path: "company-home",
    },
    {
      icon: "post_add",
      name: "Neue Stelle",
      path: "create-job-offer",
    },
    {
      icon: "format_list_bulleted",
      name: "Meine Stellen",
      path: "company-job-offers",
    },
    {
      icon: "domain",
      name: "Mein Unternehmen",
      path: "company-profile",
    },
  ],
};

export default headerConfig;
