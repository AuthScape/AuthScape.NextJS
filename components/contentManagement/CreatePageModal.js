import React, { useEffect, useState } from "react";
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
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { apiService } from "authscape";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePageModal = ({ isOpen, handleClose }) => {
  const [templates, setTemplates] = useState([]);
  const initialData = {
    title: "",
    templateId: null,
    description: "",
  };

  const fetchPageTemplates = async () => {
    let response = await apiService().get(
      "/ContentManagement/GetPageTemplateSelector"
    );
    if (response != null && response.status == 200) {
      setTemplates(response.data);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPageTemplates();
      reset();
    }
  }, [isOpen]);

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

  const watchedFields = watch(["title", "description"]);
  const templateId = watch("templateId");
  const isFormValid =
    watchedFields.every((field) => field?.trim() !== "") && templateId;

  const onSave = async (pageParam) => {
    event.preventDefault();
    const { title, templateId, description } = pageParam;
    const param = {
      title: title,
      id: templateId,
      description: description,
    };
    const response = await apiService().post(
      "/ContentManagement/CreateNewPage",
      param
    );
    if (response != null && response.status === 200) {
      alert("success");
      handleClose();
      reset();
    } else {
      alert("failed");
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
        <Typography variant="h3">{`Create New Page`}</Typography>
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
              name="templateId"
              control={control}
              rules={{ required: "Template is required" }}
              render={({ field }) => (
                <>
                  <Typography variant="subtitle2">Template</Typography>
                  <Autocomplete
                    fullWidth
                    disableClearable
                    options={templates.sort((a, b) =>
                      a.typeTitle.localeCompare(b.typeTitle)
                    )}
                    groupBy={(option) => option.typeTitle}
                    getOptionLabel={(option) => option.title}
                    onChange={(_, data) => {
                      if (data != null && data.id != null) {
                        setValue("templateId", data.id);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField {...params} fullWidth size="small" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </>
              )}
            />
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
              {`Create New Page`}
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

export default CreatePageModal;
