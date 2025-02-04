import React, { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  Dialog,
  Slide,
  Button,
  Select,
  Box,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { apiService } from "authscape";
import { Puck } from "@measured/puck";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const PageEditorModal = ({ isOpen, handleClose }) => {
  const [page, setPage] = useState({});
  const [config, setConfig] = useState({});
  const [contentData, setContentData] = useState({});

  const fetchPageDetail = async () => {
    try {
      let response = await apiService().get(
        `/ContentManagement/GetPage?pageId=${isOpen}`
      );

      if (response && response.status === 200) {
        console.log("API Response:", response.data);
        const pageTemplateConfig = response.data?.pageTemplate?.config || "{}";
        const pageContent = response.data?.content || "{}";
        console.log("Parsed Config:", JSON.parse(pageTemplateConfig));
        console.log("Parsed Data:", JSON.parse(pageContent));
        setPage(response.data);
        setConfig(JSON.parse(pageTemplateConfig));
        setContentData(JSON.parse(pageContent));
      }
    } catch (error) {
      console.error("Error fetching or parsing page data:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPageDetail();
    }
  }, [isOpen]);

  const save = (data) => {
    setData(data);
  };

  const initialData = {};

  return (
    <Dialog
      fullScreen
      fullWidth
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          zIndex: 1000,
          position: "absolute",
          right: 8,
          top: 6,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{
          paddingX: 0,
          paddingTop: 4,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {config && contentData ? (
            <Puck
              className={"Puck"}
              config={config}
              data={contentData}
              onPublish={save}
            />
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PageEditorModal;
