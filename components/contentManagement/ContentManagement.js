import React, { useState, useRef, useEffect, useCallback } from "react";
import { Container, Box, Tabs, Tab, Typography } from "@mui/material";
import PageManagement from "./PageManagement";
import AssetManagement from "./AssetManagement";
 const ContentManagement = ({ config, minHeight }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isEditorOpen, setIsEditorOpen] = useState(null);
  const handleSelectedTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  }
  useEffect(() => {
    setSelectedTab(0);
  }, []);

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
      {!isEditorOpen && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h4" mb={1}>
              ContentManagement Dashboard
            </Typography>
            <Tabs
              value={selectedTab}
              onChange={handleSelectedTab}
              aria-label="basic tabs example"
            >
              <Tab label="Page Management" {...a11yProps(0)} />
              <Tab label="Asset Management" {...a11yProps(1)} />
            </Tabs>
          </Box>
        </>
      )}
      <Box my={2}>
        {selectedTab === 0 && (
          <PageManagement
            config={config}
            minHeight={minHeight}
            isEditorOpen={isEditorOpen}
            setIsEditorOpen={setIsEditorOpen}
          />
        )}
        {selectedTab === 1 && <AssetManagement minHeight={minHeight} />}
      </Box>
    </Container>
  );
};

export default ContentManagement;
