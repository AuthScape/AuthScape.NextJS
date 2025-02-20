import React, { useEffect, useState } from "react";
import "../styles/globals.css";
import Layout from "../components/layout/portalLayout";
import { AuthScapeApp } from "authscape";
import "react-toastify/dist/ReactToastify.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "reactflow/dist/style.css";
import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { baselightTheme } from "../components/theme";
import "react-querybuilder/dist/query-builder.css";
// spreadsheet
import "../styles/reactGrid.scss";
import "react-image-crop/dist/ReactCrop.css";
import "@measured/puck/puck.css";

function MyApp({ Component, pageProps }) {
  const layout = ({ children, currentUser }) => {
    return (
      <Box sx={{ height: "100vh" }}>
        <Layout
          currentUser={currentUser}
          loadedUser={true}
          pageProps={pageProps}
        >
          {children}
        </Layout>
      </Box>
    );
  };

  const loadingLayout = (isLoading) => {
    return (
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 999999999,
          background:
            "linear-gradient(135deg, rgba(0, 6, 31, 0.75), rgba(0, 31, 63, 0.75))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
        }}
        open={isLoading}
      >
        <Box
          sx={{
            animation: "rotate 2s linear infinite",
            "@keyframes rotate": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(360deg)" },
            },
          }}
        >
          <HourglassBottomIcon sx={{ fontSize: 40 }} />
        </Box>
        <Box sx={{ paddingTop: 2 }}>Loading...</Box>
      </Backdrop>
    );
  };

  return (
    <>
      <AuthScapeApp
        Component={Component}
        layout={layout}
        loadingLayout={loadingLayout}
        muiTheme={baselightTheme}
        enforceLoggedIn={true}
        pageProps={pageProps}
      />
    </>
  );
}

export default MyApp;
