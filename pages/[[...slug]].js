import { apiService, PrivateLabelPageModule } from "authscape";
import Head from "next/head";
import { Box, Divider } from "@mui/material";
import { RenderCustomPage } from "../components/contentManagement/RenderCustomPage";

const SlugPage = ({
  oemCompanyId,
  urlPath,
  canonicalBaseUrl,
  metaTitle,
  metaDescription,
  setIsLoading,
  pageResponse,
}) => {

  return (
    <Box>
      <Head>
        <title>{metaTitle}</title>
        <meta name="title" content={metaTitle} />
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalBaseUrl + urlPath} />
      </Head>

      <RenderCustomPage
        oemCompanyId={oemCompanyId}
        urlPath={urlPath}
        canonicalBaseUrl={canonicalBaseUrl}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
        setIsLoading={setIsLoading}
        pageResponse={pageResponse}
        customFields={{
          
          Poop: {
              label: "Poop",
              params: {
              label: "Settings",
              },
              fields: {
              text: { label: "Text", type: "text" },
              orientation: {
                  label: "Orientation",
                  type: "select",
                  options: [
                  { label: "Horizontal", value: "horizontal" },
                  { label: "Vertical", value: "vertical" },
                  ],
              },
              flexItem: {
                  label: "FlexItem",
                  type: "select",
                  options: [
                  { label: "Disabled", value: false },
                  { label: "Enabled", value: true },
                  ],
              },
              textAlign: {
                  label: "TextAlign",
                  type: "select",
                  options: [
                  { label: "Center", value: "center" },
                  { label: "Left", value: "left" },
                  { label: "Right", value: "right" },
                  ],
              },
              Padding: {
                  label: "Padding",
                  type: "object",
                  objectFields: {
                  paddingLeft: { label: "Padding Left", type: "number" },
                  paddingRight: { label: "Padding Right", type: "number" },
                  paddingTop: { label: "Padding Top", type: "number" },
                  paddingBottom: { label: "Padding Bottom", type: "number" },
                  },
              },
              Margin: {
                  label: "Margin",
                  type: "object",
                  objectFields: {
                  marginLeft: { label: "Margin Left", type: "number" },
                  marginRight: { label: "Margin Right", type: "number" },
                  marginTop: { label: "Margin Top", type: "number" },
                  marginBottom: { label: "Margin Bottom", type: "number" },
                  },
              },
              },
              render: (settings) => {
              return (
                  <Divider
                    orientation={settings.orientation}
                    flexItem={settings.flexItem}
                    textAlign={settings.textAlign}
                    sx={{
                        paddingLeft: settings.Padding?.paddingLeft,
                        paddingRight: settings.Padding?.paddingRight,
                        paddingTop: settings.Padding?.paddingTop,
                        paddingBottom: settings.Padding?.paddingBottom,
                        marginLeft: settings.Margin?.marginLeft,
                        marginRight: settings.Margin?.marginRight,
                        marginTop: settings.Margin?.marginTop,
                        marginBottom: settings.Margin?.marginBottom,
                    }}
                    >
                    {settings.text}
                  </Divider>
              );
              },
          },


        }}
      />
    </Box>
  );
};

export async function getServerSideProps({ params, req, resolvedUrl }) {
  const slug = params.slug;


  var props = await PrivateLabelPageModule(
    process.env.apiUri,
    req.headers.host
  );

  const pageInfo = await apiService().post(
    process.env.apiUri + "/api/Pages/GetPageWithSlug",
    {
      slugs: slug,
      host: req.headers.host,
    }
  );

  if (
    pageInfo != null &&
    pageInfo.data != null &&
    pageInfo.data.content != null
  ) {
    const data = JSON.parse(pageInfo.data.content);

    const pageTitle = data?.data?.root?.props?.title;
    const pageDescription = data?.data?.root?.props?.description;

    props.pageResponse = data != null ? data : "";
    props.metaTitle = pageTitle != null ? pageTitle : "";
    props.metaDescription = pageDescription != null ? pageDescription : "";
  }

  var host = req.headers.host;

  if (host.includes("localhost")) {
    host = "http://" + host;
  } else {
    host = "https://" + host;
  }

  if (props.redirect != null) {
    return props.redirect;
  }

  props.urlPath = resolvedUrl;
  props.host = req.headers.host;
  return { props };
}

export default SlugPage;
