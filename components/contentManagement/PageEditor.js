import React, { useEffect, useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { apiService } from "authscape";
import { Puck } from "@measured/puck";

export const PageEditor = ({ config, isOpen, handleClose }) => {
  const [page, setPage] = useState({});
  const initialData = {};
  const [contentData, setContentData] = useState(initialData);

  const fetchPageDetail = async () => {
    try {
      let response = await apiService().get(
        `/ContentManagement/GetPage?pageId=${isOpen}`
      );

      if (response && response.status === 200) {
        setPage(response.data);
        if (response.data.content) {
          try {
            const parsedContent = JSON.parse(response.data.content);
            setContentData(parsedContent.data || initialData);
          } catch (error) {
            setContentData(initialData);
          }
        } else {
          setContentData(initialData);
        }
      }
    } catch (error) {
      console.error("API fetch error:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPageDetail();
    } else {
      setContentData(initialData);
    }
  }, [isOpen]);

  const save = async (data) => {
    try {
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
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <Box sx={{ position: "relative", zIndex: 1025 }}>
      {contentData.content ? (
        <Puck
          config={config}
          data={initialData}
          onPublish={save}
          overrides={{
            headerActions: ({ children }) => {
              return (
                <>
                  {children}
                  <Button
                    color="error"
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      handleClose();
                    }}
                  >
                    Close
                  </Button>
                </>
              );
            },
          }}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Loading content...</p>
          <CircularProgress size={"small"} />
        </Box>
      )}
    </Box>
  );
};

//export default PageEditor;
