import { Box } from "@mui/material";
import { GrapePageRenderer, isGrapeJSContent } from "./v3/GrapePageRenderer";

export const RenderCustomPage = ({
  pageResponse,
  pageId,
}) => {
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

  return <Box />;
};
