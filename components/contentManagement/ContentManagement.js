import React, { useRef, useState, useEffect } from "react";
import { createConfig } from "./configClient";
import { ContentEngine } from "./ContentEngine";
import Head from "next/head";
import { Box, Typography } from "@mui/material";

export const ContentManagement = ({ oemCompanyId, setIsLoading, minHeight="65vh", customFields }) => {
  const [config, setConfig] = useState(null);
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadConfig = async () => {
      let fetchedConfig = await createConfig(oemCompanyId, setIsLoading);


      const updatedConfig = {
        ...fetchedConfig,
        components: {
          ...fetchedConfig.components,
          ...customFields
        }
      };
      

      fetchedConfig = updatedConfig;


      setConfig(updatedConfig);
      setLoading(false);
    };
    loadConfig();
  }, [load]);

  const configLoad = () => {
    setLoad(!load);
  };

  if (loading || !config) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
          backgroundColor: "#f4f4f4",
        }}
      >test
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#333", mb: 2 }}
        >
          Loading Configuration
        </Typography>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: "#007bff",
              borderRadius: "50%",
              animation: "bounce 1.5s infinite ease-in-out",
              "@keyframes bounce": {
                "0%, 80%, 100%": { transform: "scale(0)" },
                "40%": { transform: "scale(1.2)" },
              },
            }}
          />
          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: "#007bff",
              borderRadius: "50%",
              animation: "bounce 1.5s infinite ease-in-out",
              animationDelay: "0.2s",
            }}
          />
          <Box
            sx={{
              width: "10px",
              height: "10px",
              backgroundColor: "#007bff",
              borderRadius: "50%",
              animation: "bounce 1.5s infinite ease-in-out",
              animationDelay: "0.4s",
            }}
          />
        </Box>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Content Management</title>
        <meta name="title" content={"Content Management"} />
      </Head>
      <ContentEngine
        config={config}
        minHeight={minHeight}
        oemCompanyId={oemCompanyId}
        loadedUser={true}
        configLoad={configLoad}
        notification={(content) => {
          // alert(content);
        }}
      />
    </>
  );
};