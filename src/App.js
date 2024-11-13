import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./styles/index.css";
import { createTheme, ThemeProvider } from "@mui/material";

import TalentProfilePage from "./pages/profilePage/TalentProfilePage";
import LoginPage from "./pages/login page/LoginPage";
import PrivateRouter from "./utils/privateRoute";
import SignUpPage from "./pages/signup page/SignInPage";
import LandingPage from "./pages/landingPage/LandingPage";
import Layout from "./components/layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/TalentContext/UserContext";
import ChangePassword from "./pages/changePassword/ChangePassword";
import FaqsPage from "./pages/faqsPage/faqsPage";
import AccountPage from "./pages/accountPage/accountPage";
import HomePage from "./pages/homePage/homePage";
import PrivacyPolicy from "./pages/privacyPolicy/privacyPolicy";
import Imprint from "./pages/imprint/imprint";
import Agb from "./pages/agb/agb";
import CompanyOverview from "./pages/CompanyOverview/CompanyOverview";

import { ModalProvider } from "./context/ModalContext/ModalContext";
import GlobalModal from "./components/GlobalModal/GlobalModal";
import GlobalNotification from "./components/GlobalModal/GlobalNotification";

import CompLoginPage from "./pages/Company/LoginPage/CompLoginPage";
import CompanyJobOffers from "./pages/Company/CompanyJobOffers/CompanyJobOffers";
import CompanyAccountPage from "./pages/Company/CompanyAccountPage/CompanyAccountPage";
import CreateJobOfferPage from "./pages/Company/CreateJobOfferPage/CreateJobOfferPage";
import CompanyProfilePage from "./pages/Company/CompanyProfilePage/CompanyProfilePage";
import PrivateRouterCompany from "./utils/privateRouteCompany";
import PrivateRouteAdmin from "./utils/privateRouteAdmin";

import OnboardingPage from "./pages/onbordingPage/onboardingPage";
import CookieBanner from "./components/coockieBanner/CookieBanner";
import { LoadingProvider } from "./context/LoadingContext";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import { CompanyProvider } from "./context/CompanyContext/CompanyContext";
import CompanyHome from "./pages/Company/CompanyHome/CompanyHome";
import CompanyFaqsPage from "./pages/Company/CompanyFaqsPage/CompanyFaqsPage";
import CompanySignUpPage from "./pages/Company/SignupPage/CompanySignUpPage";
import CompanyJobDetail from "./pages/Company/CompanyJobDetail/CompanyJobDetail";
import CompanyOnboarding from "./pages/Company/CompanyOnboarding/CompanyOnboarding";

import { AdminProvider } from "./context/AdminContext/AdminContext";
import AdminLogin from "./pages/admin/AdminLogin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import AdminNavBar from "./components/adminNavBar/AdminNavBar";
import AdminTalents from "./pages/admin/AdminTalents/AdminTalents";
import AdminMatchingTool from "./pages/admin/AdminMatchingTool/AdminMatchingTool";
import AdminJobOffers from "./pages/admin/AdminJobOffers/AdminJobOffers";
import AdminCompanies from "./pages/admin/AdminCompanies/AdminCompanies";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Test from "./components/test/Test";
import CompanyTalentOverview from "./pages/Company/CompanyTalentOverview/CompanyTalentOverview";
import AdminTalentView from "./components/AdminTalentView/AdminTalentView";

const theme = createTheme({
  palette: {},
});

const MainRoutes = () => {
  return (
    <>
      {/* <UserProvider> */}
      {/* <Routes> */}
      {/* <Route path="/talent-login" element={<LoginPage />} />
      <Route path="/talent-signup" element={<SignUpPage />} />
      <Route element={<PrivateRouter />}>
        <Route path="/talent-onboarding" element={<OnboardingPage />} />
        <Route element={<Layout type="talent" />}>
          <Route path="/talent-profile" element={<TalentProfilePage />} />
          <Route path="/talent-home" element={<HomePage />} />
          <Route path="/talent-faqs" element={<FaqsPage />} />
          <Route path="/talent-account" element={<AccountPage />} />
        </Route>
      </Route> */}
      {/* </Routes> */}
      {/* </UserProvider> */}
      {/* <CompanyProvider> */}
      {/* <Routes> */}
      {/* <Route path="/company-login" element={<CompLoginPage />} />
      <Route path="/company-signup" element={<CompanySignUpPage />} />
      <Route path="/company-onboarding" element={<CompanyOnboarding />} />
      <Route element={<PrivateRouterCompany />}>
        <Route element={<Layout type="company" />}>
          <Route path="/company-home" element={<CompanyHome />} />
          <Route path="/create-job-offer" element={<CreateJobOfferPage />} />
          <Route path="/company-job-offers" element={<CompanyJobOffers />} />
          <Route path="/company-job-detail" element={<CompanyJobDetail />} />

          <Route path="/company-profile" element={<CompanyProfilePage />} />
          <Route path="/company-faqs" element={<CompanyFaqsPage />} />
          <Route path="/company-account" element={<CompanyAccountPage />} />
        </Route>
      </Route> */}
      {/* </Routes> */}
      {/* </CompanyProvider> */}
      {/* <AdminProvider>
        <Routes>
          <Route path="/adminportal" element={<AdminLogin />} />
          <Route element={<PrivateRouteAdmin />}>
            <Route element={<AdminNavBar />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin-matching-tool"
                element={<AdminMatchingTool />}
              />
              <Route path="/admin-talents" element={<AdminTalents />} />
              <Route path="/admin-job-offers" element={<AdminJobOffers />} />
              <Route path="/admin-companies" element={<AdminCompanies />} />
            </Route>
          </Route>
        </Routes>
      </AdminProvider> */}
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <LoadingIndicator />
        <CookieBanner />

        <BrowserRouter>
          <ModalProvider>
            <UserProvider>
              <CompanyProvider>
                <AdminProvider>
                  {/**basename="/globemee-react" */}
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/test" element={<Test />} />

                    <Route path="/imprint" element={<Imprint />} />
                    <Route path="/agb" element={<Agb />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                    <Route
                      path="/change-password"
                      element={<ChangePassword />}
                    />
                    {/* <Route path="/*" element={<MainRoutes />} /> */}

                    <Route element={<PrivateRouter />}>
                      <Route path="/talent-login" element={<LoginPage />} />
                      <Route path="/talent-signup" element={<SignUpPage />} />
                      <Route
                        path="/talent-onboarding"
                        element={<OnboardingPage />}
                      />
                      <Route element={<Layout type="talent" />}>
                        <Route
                          path="/talent-profile"
                          element={<TalentProfilePage />}
                        />
                        <Route path="/talent-home" element={<HomePage />} />
                        <Route
                          path="/talent-home/match/:matchId"
                          element={<CompanyOverview />}
                        />
                        <Route path="/talent-faqs" element={<FaqsPage />} />
                        <Route
                          path="/talent-account"
                          element={<AccountPage />}
                        />
                      </Route>
                    </Route>

                    <Route
                      path="/company-onboarding"
                      element={<CompanyOnboarding />}
                    />
                    <Route element={<PrivateRouterCompany />}>
                      <Route
                        path="/company-login"
                        element={<CompLoginPage />}
                      />
                      <Route
                        path="/company-signup"
                        element={<CompanySignUpPage />}
                      />
                      <Route element={<Layout type="company" />}>
                        <Route path="/company-home" element={<CompanyHome />} />
                        <Route
                          path="/company-home/match/:matchId"
                          element={<CompanyTalentOverview />}
                        />
                        <Route
                          path="/create-job-offer"
                          element={<CreateJobOfferPage />}
                        />
                        <Route
                          path="/company-job-offers"
                          element={<CompanyJobOffers />}
                        />
                        <Route
                          path="/company-job-detail"
                          element={<CompanyJobDetail />}
                        />

                        <Route
                          path="/company-profile"
                          element={<CompanyProfilePage />}
                        />
                        <Route
                          path="/company-faqs"
                          element={<CompanyFaqsPage />}
                        />
                        <Route
                          path="/company-account"
                          element={<CompanyAccountPage />}
                        />
                      </Route>
                    </Route>

                    <Route element={<PrivateRouteAdmin />}>
                      <Route path="/adminportal" element={<AdminLogin />} />
                      <Route element={<AdminNavBar />}>
                        <Route
                          path="/admin-dashboard"
                          element={<AdminDashboard />}
                        ></Route>
                        <Route
                          path="/admin-matching-tool"
                          element={<AdminMatchingTool />}
                        />
                        <Route
                          path="/admin-talents"
                          element={<AdminTalents />}
                        />
                        <Route
                          path="/admin-job-offers"
                          element={<AdminJobOffers />}
                        />
                        <Route
                          path="/admin-companies"
                          element={<AdminCompanies />}
                        />
                      </Route>
                    </Route>

                    {/* REDIRECT FROM OLD PAGE */}
                    <Route
                      path="/talent-privacy-policy"
                      element={<Navigate to="/privacy-policy?lang=en" />}
                    />
                    <Route
                      path="/talent-imprint"
                      element={<Navigate to="/imprint?lang=en" />}
                    />
                    <Route
                      path="/talent-agb"
                      element={<Navigate to="/agb?lang=en" />}
                    />
                    <Route
                      path="/talent_onboarding"
                      element={<Navigate to="/talent-onboarding" />}
                    />
                    <Route
                      path="/datenschutz"
                      element={<Navigate to="/agb?lang=de" />}
                    />

                    {/* REDIRECT FROM ADMIN PORTAL (need to remove from idexing) */}
                    <Route path="/adminportal" element={<Navigate to="/" />} />

                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                  <GlobalNotification />
                  <GlobalModal />
                </AdminProvider>
              </CompanyProvider>
            </UserProvider>
          </ModalProvider>
        </BrowserRouter>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
