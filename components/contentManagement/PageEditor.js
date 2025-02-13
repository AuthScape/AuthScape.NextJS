import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { apiService } from "authscape";
import { Puck } from "@measured/puck";

 export const PageEditor = ({ config, isOpen, handleClose }) => {
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
   <Box sx={{ position: "relative", zIndex: 1025 }}>
      <Puck
        config={config}
        data={contentData}
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
    </Box>
  );
};
