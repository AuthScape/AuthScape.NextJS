import React from "react";
import { ContentManagementLayout } from "./v2";
import Head from "next/head";

export const ContentManagement = ({ oemCompanyId, setIsLoading, minHeight="65vh" }) => {
  return (
    <>
      <Head>
        <title>Content Management</title>
        <meta name="title" content={"Content Management"} />
      </Head>
      <ContentManagementLayout
        config={null}
        minHeight={minHeight}
        oemCompanyId={oemCompanyId}
        configLoad={() => {}}
        notification={(content) => {
          // Can be used for notifications if needed
        }}
      />
    </>
  );
};
