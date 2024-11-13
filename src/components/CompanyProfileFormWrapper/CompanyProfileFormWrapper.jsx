import React, { useEffect, useState } from "react";
import GeneralForm from "../CompanyProfileForms/GeneralForm";
import ContactForm from "../CompanyProfileForms/ContactForm";
import BenefitsForm from "../CompanyProfileForms/BenefitsForm";
import ValueForm from "../CompanyProfileForms/ValueForm";
import VideoForm from "../CompanyProfileForms/VideoForm";
import { FormProvider, useForm } from "react-hook-form";
import axiosInstance from "../../lib/axios/AxiosConfig";
import { useCompany } from "../../context/CompanyContext/CompanyContext";
import LogoForm from "../CompanyProfileForms/LogoForm";

const CompanyProfileFormWrapper = ({ type, onClose, logo }) => {
  const { getCompanyProfile, companyProfile, getPhotos } = useCompany();
  const [command, setCommand] = useState(false);

  const handleButtonClick = () => {
    setCommand(true);
  };

  const handleCommandExecuted = () => {
    setCommand(false);
  };

  const methods = useForm({
    defaultValues: {
      facts: {
        address: companyProfile.facts.address || [],
        benefits: companyProfile.facts.benefits || [],
        briefIntroduction: companyProfile.facts.briefIntroduction || "",
        contact: {
          contactEmail: companyProfile.facts.contact.contactEmail || [],
          contactName: companyProfile.facts.contact.contactName || "",
        },
        documents: {
          logo: {
            documentId: "6670458680fef6051b4f217f",
            file: "data:image/png;base64,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",
            name: "Logo.png",
          },
          photos: [],
        },
        employeesNumber: companyProfile.facts.employeesNumber || "",
        industry: companyProfile.facts.industry || "",
        name: companyProfile.facts.name || "",
        sector: companyProfile.facts.sector || "Öffentlicher Dienst",
        type: "Startup",
        values: companyProfile.facts.values || [],
        videos: companyProfile.facts.videos || [],
        website: companyProfile.facts.website || "",
        companyNumber: companyProfile.facts.companyNumber || "",
      },
    },
  });

  const { handleSubmit, reset, getValues } = methods;

  useEffect(() => {
    reset();
  }, [type]);

  const onSubmit = async (data) => {
    // console.log(type);
    if (type !== "company_logo") {
      await axiosInstance.patch(`c_company?data_part=${type}`, data);
      getCompanyProfile();
    }

    if (type === "company_logo") {
      await axiosInstance.post(
        `c_company/logo`,
        {
          logo: {
            name: getValues("facts.documents.logo.name"),
            file: getValues("facts.documents.logo.file"),
          },
        },
        { notification: "Upload successful" }
      );
      getPhotos();
    }
    onClose();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {type === "general_info" && <GeneralForm />}
          {type === "contact" && <ContactForm />}
          {type === "benefits" && <BenefitsForm />}
          {type === "values" && <ValueForm />}
          {type === "video" && <VideoForm />}
          {type === "company_logo" && (
            <LogoForm
              logo={logo}
              command={command}
              onCommandExecuted={handleCommandExecuted}
              onCrop={handleSubmit(onSubmit)}
            />
          )}

          <div className="row end gap">
            <button
              className="tertiary medium"
              type="button"
              onClick={() => onClose()}
            >
              Abbrechen
            </button>
            {type !== "company_logo" && (
              <button className="primary medium" type="submit">
                Speichern
              </button>
            )}
            {type === "company_logo" && (
              <button
                className="primary medium"
                type="button"
                onClick={handleButtonClick}
              >
                Speichern
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default CompanyProfileFormWrapper;
