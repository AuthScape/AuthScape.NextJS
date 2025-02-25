import React, { useEffect } from "react";
import {
  Stack,
  TextField,
  Typography,
  IconButton,
  DialogTitle,
  DialogContent,
  Dialog,
  Slide,
  Button,
  Box,
  Select,
  MenuItem,
  InputAdornment,
  Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { apiService } from "authscape";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
 export const CreatePageModal = ({ isOpen, handleClose, pageTypes }) => {
  const isEditing = typeof isOpen !== "boolean";

  const initialData = {
    title: "",
    pageTypeId: null,
    description: "",
    recursion: null,
    slug: "",
  };

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    if (isEditing) {
      setValue("title", isOpen.title);
      setValue("pageTypeId", isOpen.pageTypeId);
      setValue("description", isOpen.description);
      setValue("recursion", isOpen.recursion);
      setValue("slug", isOpen.slug);
    } else {
      reset();
    }
  }, [isEditing, isOpen, reset, setValue]);

  const watchedFields = watch(["title", "description",]);
  const pageTypeId = watch("pageTypeId");
  const recursion = watch("recursion");
  const slug = watch("slug")

  const selectedPageType = pageTypes.find((type) => type.id === pageTypeId);
  const isRecursive = selectedPageType?.isRecursive || false;
  const isHomepage = selectedPageType?.isHomepage || false;

  const isFormValid =
    watchedFields.every((field) => field?.trim() !== "") &&
    pageTypeId &&
    (!isRecursive || recursion) &&
    (isHomepage || slug);

  const onSave = async (pageParam) => {
    event.preventDefault();
    const { title, pageTypeId, description, recursion, slug } = pageParam;
    const param = {
      pageId: isEditing ? isOpen.id : null,
      title: title,
      pageTypeId: pageTypeId,
      description: description,
      recursion: recursion,
      slug: !isHomepage ? slug : "",
    };

    const apiEndpoint = isEditing
      ? `/ContentManagement/UpdatePage`
      : "/ContentManagement/CreateNewPage";

    const response = await apiService().post(apiEndpoint, param);

    if (response != null && response.status === 200) {
      handleClose();
      reset();
    } else {
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 6,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h3">
          {isEditing ? "Update Page" : "Create New Page"}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 2 }}>
        <form onSubmit={handleSubmit(onSave)}>
          <Stack spacing={1}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2">Page Title</Typography>
                  <TextField
                    size="small"
                    {...field}
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message || ""}
                  />
                </>
              )}
            />
            <Controller
              name="pageTypeId"
              control={control}
              rules={{ required: "Template is required" }}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2">Page Type</Typography>
                  <Select
                    {...field}
                    size="small"
                    value={field.value || ""}
                    onChange={(event) => {
                      const selectedType = pageTypes.find(
                        (type) => type.id === event.target.value
                      );
                      field.onChange(event.target.value);
                      setValue("isRecursive", selectedType.isRecursive);
                      if (!selectedType.isRecursive) {
                        setValue("recursion", null);
                      }
                    }}
                  >
                    {pageTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.title}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            />
            {isRecursive && (
              <Controller
                name="recursion"
                control={control}
                rules={{
                  required: "Recursion is required",
                  min: { value: 1, message: "Recursion must be at least one" },
                }}
                render={({ field }) => (
                  <>
                    <Typography variant="subtitle2">Recursion Day</Typography>
                    <TextField
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">Days</InputAdornment>
                        ),
                      }}
                      size="small"
                      type="number"
                      {...field}
                      fullWidth
                      error={!!errors.recursion}
                      helperText={errors.recursion?.message || ""}
                    />
                  </>
                )}
              />
            )}
            {!isHomepage &&
              <Controller
                name="slug"
                control={control}
                rules={{ required: "Slug is required" }}
                render={({ field }) => (
                  <>
                    <Typography variant="subtitle2">
                      Page Slug{" "}
                      <Tooltip
                        arrow
                        title="This will be part of the page URL, e.g., yourwebsite.com/your-slug"
                      >
                        <InfoOutlinedIcon
                          sx={{ fontSize: 15, cursor: "pointer" }}
                          color="warning"
                        />
                      </Tooltip>
                    </Typography>
                    <TextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">/</InputAdornment>
                        ),
                      }}
                      size="small"
                      {...field}
                      fullWidth
                      error={!!errors.slug}
                      helperText={errors.slug?.message || ""}
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const newValue = e.target.value.replace(/\s/g, "");
                        field.onChange(newValue);
                      }}
                    />
                  </>
                )}
              />
            }
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2">Page Description</Typography>
                  <TextField {...field} multiline rows={5} fullWidth />
                </>
              )}
            />
          </Stack>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button
              type="submit"
              variant="contained"
              sx={{ marginRight: 1 }}
              disabled={!isFormValid}
            >
              {isEditing ? "Update Page" : "Create New Page"}
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};
// export default CreatePageModal;