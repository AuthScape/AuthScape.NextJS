import React, { useEffect, useState } from "react";
import { IconButton, DialogContent, Dialog, Slide, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { apiService } from "authscape";
import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const PageEditorModal = ({ config, isOpen, handleClose }) => {
  const [page, setPage] = useState({});
  const initialData = {
    content: [],
    root: {},
  };
  const [contentData, setContentData] = useState(initialData);

  const fetchPageDetail = async () => {
    let response = await apiService().get(
      `/ContentManagement/GetPage?pageId=${isOpen}`
    );
    if (response && response.status === 200) {
      setPage(response.data);
      if (response.data.content) {
        setContentData(response.data.content);
      }
    }
  };
  useEffect(() => {
    if (isOpen) {
      fetchPageDetail();
    }
  }, [isOpen]);

  const save = async (data) => {
    const contentParam = {
      pageId: page.id,
      content: JSON.stringify({ data }),
    };
    let response = await apiService().post(
      `/ContentManagement/UpdatePageContent`,
      contentParam
    );
    if (response && response.status === 200) {
      handleClose();
    } 
  };

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
          <Puck config={config} data={contentData} onPublish={save} />
        </Box>
      </DialogContent>
    </Dialog>
  );
};