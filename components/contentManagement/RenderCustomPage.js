import { apiService, PrivateLabelPageModule } from "authscape";
import { Render } from "@measured/puck";
import { createConfig } from "../../components/contentManagement/configServer";
import { Box } from "@mui/material";
import { GrapePageRenderer, isGrapeJSContent } from "./v3/GrapePageRenderer";

export const RenderCustomPage = ({
  oemCompanyId,
  setIsLoading,
  pageResponse,
  pageId,
  customFields={}
}) => {
  // Check if this is GrapeJS content
  if (pageResponse && isGrapeJSContent(pageResponse)) {
    return (
      <Box>
        <GrapePageRenderer
          content={pageResponse}
          pageId={pageId}
          includeDefaultStyles={true}
        />
      </Box>
    );
  }

  // Legacy Puck format rendering
  let fetchedConfig = createConfig(oemCompanyId, setIsLoading);

  const updatedConfig = {
    ...fetchedConfig,
    components: {
      ...fetchedConfig.components,
      ...customFields
    }
  };

  return (
    <Box>
      {pageResponse != null && pageResponse.data && (
        <Render config={updatedConfig} data={pageResponse.data} />
      )}
    </Box>
  );
};