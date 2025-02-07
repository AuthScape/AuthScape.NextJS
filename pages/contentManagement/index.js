import React, { useState, useRef, useMemo, useEffect } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
// import ContentManagement from "../../components/contentManagement/ContentManagement";
import ContentManagement from 'authscape-contentmanagement';

const Editor = ({ loadedUser, showNavigationBar }) => {
  const config = {
    components: {
      Header: {
        fields: {
          Header: {
            type: "select",
            options: [
              { label: "H1", value: "h1" },
              { label: "H2", value: "h2" },
              { label: "H3", value: "h3" },
              { label: "H4", value: "h4" },
              { label: "H5", value: "h5" },
              { label: "H6", value: "h6" },
            ],
          },
          Text: {
            type: "text",
          },
          Color: {
            type: "text",
          },
          TextAlign: {
            type: "radio",
            options: [
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ],
          },
        },
        render: ({ Text, TextAlign, Color, Header = "h1" }) => {
          return (
            <Box
              sx={{
                textAlign: TextAlign,
              }}
            >
              <Typography variant={Header} gutterBottom sx={{ color: Color }}>
                {Text}
              </Typography>
            </Box>
          );
        },
      },
      Text: {
        fields: {
          Text: {
            type: "text",
          },
          FontSize: {
            type: "number",
          },
          Color: {
            type: "text",
          },
          TextAlign: {
            type: "radio",
            options: [
              { label: "Left", value: "left" },
              { label: "Center", value: "center" },
              { label: "Right", value: "right" },
            ],
          },
        },
        render: ({ Text, FontSize, Color, TextAlign }) => {
          return (
            <Box
              sx={{
                textAlign: TextAlign,
                fontSize: FontSize,
                color: Color,
              }}
            >
              {Text}
            </Box>
          );
        },
      },
    },
  };

  return <ContentManagement config={config} minHeight={"75vh"} loadedUser={loadedUser}/>;
};

export default Editor;
