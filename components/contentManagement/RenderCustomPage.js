import { apiService, PrivateLabelPageModule } from "authscape";
import { Render } from "@measured/puck";
import { createConfig } from "../../components/contentManagement/configServer";
import { Box } from "@mui/material";

export const RenderCustomPage = ({
  oemCompanyId,
  setIsLoading,
  pageResponse,
  customFields={}
}) => {
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
      {pageResponse != null && (
        <Render config={updatedConfig} data={pageResponse.data} />
      )}
    </Box>
  );
};