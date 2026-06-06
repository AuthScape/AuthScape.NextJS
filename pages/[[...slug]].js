import { apiService, PrivateLabelPageModule } from "authscape";
import Head from "next/head";
import { Box } from "@mui/material";
import { RenderCustomPage } from "../components/contentManagement/RenderCustomPage";

const SlugPage = ({
  oemCompanyId,
  urlPath,
  canonicalBaseUrl,
  metaTitle,
  metaDescription,
  setIsLoading,
  pageResponse,
  pageId,
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
        pageId={pageId}
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

    const pageTitle = pageInfo.data.title;
    const pageDescription = pageInfo.data.description;

    props.pageResponse = data != null ? data : "";
    props.metaTitle = pageTitle != null ? pageTitle : "";
    props.metaDescription = pageDescription != null ? pageDescription : "";
    props.pageId = pageInfo.data.id || null;
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

  props.canonicalBaseUrl = host;
  props.urlPath = resolvedUrl;

  return { props };
}

export default SlugPage;
