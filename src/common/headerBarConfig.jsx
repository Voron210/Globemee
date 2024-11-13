const headerBarConfig = {
    talentHeader: [
      {
        label: "Settings",
        path: "/talent-account",
      },
      {
        label: "Help",
        path: "/talent-faqs",
      },
      {
        label: "Data Protection",
        path: "/privacy-policy?lang=en",
      },
      {
        label: "Imprint",
        path: "/imprint?lang=en",
      },
      {
        label: "Terms & Conditions",
        path: "/agb?lang=en",
      },
      {
        label: "Logout",
        action: "logout",
      },
    ],
    companyHeader: [
      {
        label: "Profile",
        path: "/profile",
      },
      {
        label: "Support",
        path: "/support",
      },
      {
        label: "Privacy",
        path: "/privacy?lang=de",
      },
      {
        label: "Terms",
        path: "/terms?lang=de",
      },
      {
        label: "Sign Out",
        action: "logout",
      },
    ],
  };
  
  export default headerBarConfig;