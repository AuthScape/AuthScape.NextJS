import Head from "next/head";
import React, { useRef, useState, useEffect } from "react";
import { ContentManagement } from "../../components/contentManagement/ContentManagement";
import { Divider } from "@mui/material";

const Index = ({ currentUser, loadedUser, oemCompanyId, setIsLoading }) => {

  return (
    <>
      <Head>
        <title>Content Management</title>
        <meta name="title" content={"Content Management"} />
      </Head>

      <ContentManagement
        customFields={{
          
          // Poop: {
          //     label: "Poop",
          //     params: {
          //     label: "Settings",
          //     },
          //     fields: {
          //     text: { label: "Text", type: "text" },
          //     orientation: {
          //         label: "Orientation",
          //         type: "select",
          //         options: [
          //         { label: "Horizontal", value: "horizontal" },
          //         { label: "Vertical", value: "vertical" },
          //         ],
          //     },
          //     flexItem: {
          //         label: "FlexItem",
          //         type: "select",
          //         options: [
          //         { label: "Disabled", value: false },
          //         { label: "Enabled", value: true },
          //         ],
          //     },
          //     textAlign: {
          //         label: "TextAlign",
          //         type: "select",
          //         options: [
          //         { label: "Center", value: "center" },
          //         { label: "Left", value: "left" },
          //         { label: "Right", value: "right" },
          //         ],
          //     },
          //     Padding: {
          //         label: "Padding",
          //         type: "object",
          //         objectFields: {
          //         paddingLeft: { label: "Padding Left", type: "number" },
          //         paddingRight: { label: "Padding Right", type: "number" },
          //         paddingTop: { label: "Padding Top", type: "number" },
          //         paddingBottom: { label: "Padding Bottom", type: "number" },
          //         },
          //     },
          //     Margin: {
          //         label: "Margin",
          //         type: "object",
          //         objectFields: {
          //         marginLeft: { label: "Margin Left", type: "number" },
          //         marginRight: { label: "Margin Right", type: "number" },
          //         marginTop: { label: "Margin Top", type: "number" },
          //         marginBottom: { label: "Margin Bottom", type: "number" },
          //         },
          //     },
          //     },
          //     render: (settings) => {
          //     return (
          //         <Divider
          //           orientation={settings.orientation}
          //           flexItem={settings.flexItem}
          //           textAlign={settings.textAlign}
          //           sx={{
          //               paddingLeft: settings.Padding?.paddingLeft,
          //               paddingRight: settings.Padding?.paddingRight,
          //               paddingTop: settings.Padding?.paddingTop,
          //               paddingBottom: settings.Padding?.paddingBottom,
          //               marginLeft: settings.Margin?.marginLeft,
          //               marginRight: settings.Margin?.marginRight,
          //               marginTop: settings.Margin?.marginTop,
          //               marginBottom: settings.Margin?.marginBottom,
          //           }}
          //           >
          //           {settings.text}
          //         </Divider>
          //     );
          //     },
          // },


        }}
      />

    </>
  );
};

export default Index;