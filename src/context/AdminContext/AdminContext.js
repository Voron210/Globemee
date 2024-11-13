import React, { createContext, useState, useContext } from "react";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobOffers, setJobOffers] = useState();
  const [company, setCompany] = useState();

  const authentication = async () => {
    try {
      const response = await axiosInstance.get("/a_jobOffer/all");
      setJobOffers(response.data);
      getAllCompany();
    } catch (error) {}
  };

  const getAllCompany = async () => {
    try {
      const response = await axiosInstance.get("/a_company/all");
      setCompany(response.data);
    } catch (error) {}
  };

  const getAdminJobOffers = async () => {
    try {
      const response = await axiosInstance.get("/a_jobOffer/all");
      setJobOffers(response.data);
    } catch (error) {}
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/a_authentication/logout");
      setJobOffers(null);
      navigate("/adminportal");
    } catch (error) {}
  };

  return (
    <AdminContext.Provider
      value={{
        logout,
        getAdminJobOffers,
        jobOffers,
        company,
        authentication,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
