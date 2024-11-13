import React from "react";
import { useLoading } from "../../context/LoadingContext";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingIndicator = () => {
  const { isLoading } = useLoading();

  return isLoading ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </div>
  ) : null;
};

export default LoadingIndicator;
