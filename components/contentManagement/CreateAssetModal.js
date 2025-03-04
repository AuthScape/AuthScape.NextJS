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
  InputAdornment,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { apiService } from "authscape";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateAssetModal = ({ isOpen, handleClose }) => {
  const isEditing = typeof isOpen !== "boolean";

  const initialData = {
    title: "",
    description: "",
    file: null,
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
      setValue("description", isOpen.description);
      setValue("file", isOpen.file || null);
    } else {
      reset();
    }
  }, [isEditing, isOpen, reset, setValue]);

  const watchedFields = watch(["title", "description"]);
  const isFormValid = watchedFields.every((field) => field?.trim() !== "");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setValue("file", file);
    }
  };

  const onSave = async (assetParam) => {
    event.preventDefault();
    const { title, description, file } = assetParam;

    if (isEditing) {
      const response = await apiService().post(
        "/ContentManagement/UpdateAsset",
        {
          assetId: isOpen.id,
          title,
          description,
        }
      );
      if (response && response.status === 200) {
        handleClose();
        reset();
      }
    } else {
      const data = new FormData();
      data.append("title", title);
      data.append("description", description);
      if (file) data.append("file", file, file.name);

      const response = await apiService().post(
        "/ContentManagement/CreateNewAsset",
        data
      );

      if (response && response.status === 200) {
        handleClose();
        reset();
      }
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
          {isEditing ? "Update Asset" : "Create New Asset"}
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
                  <Typography variant="subtitle2">Asset Title</Typography>
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
              name="file"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2">Upload Image</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={isEditing ? isOpen.fileName : field.value?.name}
                    InputProps={{
                      readOnly: true,
                      sx: { pr: 0 },
                      endAdornment: (
                        <InputAdornment position="end" sx={{ m: 0, p: 0 }}>
                          <Button
                            variant="contained"
                            component="label"
                            disabled={isEditing}
                            startIcon={<CloudUploadIcon />}
                            sx={{
                              borderRadius: "0 4px 4px 0",
                              height: "100%",
                              minWidth: "auto",
                              px: 2,
                            }}
                          >
                            Upload
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2">Asset Description</Typography>
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
              {isEditing ? "Update Asset" : "Create New Asset"}
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

// export default CreateAssetModal;
