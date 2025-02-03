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
  Select,
  Box,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { apiService } from "authscape";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreatePageModal = ({ isOpen, handleClose, pageTypes }) => {
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
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: initialData,
    mode: "onChange",
  });

  const onSave = async (pageParam) => {
    const { title, pageType, description } = pageParam;

    const param = { title, pageType, description };

    try {
      const response = await apiService().post(
        "/WhiteLabel/CreateNewPage",
        param
      );
      if (response?.status === 200) {
        alert("success");
        handleClose();
        reset();
      } else {
        alert("failed");
      }
    } catch (error) {
      alert("error");
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
                    options={templates.sort(
                      (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                    )}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="With categories" />
                    )}
                    renderGroup={(params) => (
                      <li key={params.key}>
                        <GroupHeader>{params.group}</GroupHeader>
                        <GroupItems>{params.children}</GroupItems>
                      </li>
                    )}
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
              disabled={!isValid}
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
