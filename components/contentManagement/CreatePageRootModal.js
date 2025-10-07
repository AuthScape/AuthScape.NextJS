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
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
  Avatar,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { apiService } from "authscape";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreatePageRootModal = ({ isOpen, handleClose, oemCompanyId }) => {
  const isEditing = typeof isOpen !== "boolean";
  const [pageRoots, setPageRoots] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialData = {
    title: "",
    slug: "",
    isInHeaderNavigation: false,
    highlight: false,
    order: 0,
    parentId: null,
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
    // Only run when modal is actually open (not false)
    if (!isOpen) return;

    const fetchPageRoots = async () => {
      setLoading(true);
      try {
        const endpoint = (oemCompanyId && oemCompanyId !== 'undefined' && oemCompanyId !== 'null')
          ? `/ContentManagement/GetPageRoots?privateLabelCompanyId=${oemCompanyId}`
          : `/ContentManagement/GetPageRoots`;
        const response = await apiService().get(endpoint);
        if (response && response.status === 200) {
          setPageRoots(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching page roots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPageRoots();

    if (isEditing) {
      setValue("title", isOpen.title);
      setValue("slug", isOpen.rootUrl);
      setValue("isInHeaderNavigation", isOpen.isInHeaderNavigation);
      setValue("highlight", isOpen.highlight);
      setValue("order", isOpen.order);
      setValue("parentId", isOpen.parentId || null);
    } else {
      reset();
    }
  }, [isEditing, isOpen, reset, setValue, oemCompanyId]);

  const watchedFields = watch(["title", "slug"]);
  const [titleValue, slugValue] = watchedFields;
  const isFormValid = titleValue?.trim() !== "" && slugValue?.trim() !== "";

  const onSave = async (pageRootParam) => {
    event.preventDefault();
    const { title, slug, isInHeaderNavigation, highlight, order, parentId } = pageRootParam;

    const param = {
      pageRootId: isEditing ? isOpen.id : null,
      title: title,
      slug: slug,
      isInHeaderNavigation: isInHeaderNavigation,
      highlight: highlight,
      order: Number(order) || 0,
      parentId: parentId === -1 ? null : parentId,
      privateLabelCompanyId: oemCompanyId,
    };

    const apiEndpoint = isEditing
      ? "/ContentManagement/UpdatePageRoot"
      : "/ContentManagement/CreatePageRoot";

    const response = await apiService().post(apiEndpoint, param);

    if (response != null && response.status === 200) {
      handleClose(true); // Pass true to signal that data should be refreshed
      reset();
    } else if (response && response.data) {
      // Show error message from backend
      alert(response.data || "An error occurred while saving the page root");
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
        sx: {
          borderRadius: 3,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
            <AccountTreeIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="600" color="primary.main">
              {isEditing ? "Update Page Root" : "Create New Page Root"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {isEditing
                ? "Modify existing page root settings"
                : "Add a new root URL structure"}
            </Typography>
          </Box>
        </Box>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": { bgcolor: "grey.100" },
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider sx={{ mt: 2 }} />
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 2 }}>
        <form onSubmit={handleSubmit(onSave)}>
          <Stack spacing={3}>
            <Card
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        gutterBottom
                      >
                        Title *
                      </Typography>
                      <TextField
                        {...field}
                        fullWidth
                        placeholder="Enter a descriptive title for this page root"
                        error={!!errors.title}
                        helperText={
                          errors.title?.message ||
                          "A clear, descriptive title for the page root"
                        }
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "background.paper",
                          },
                        }}
                      />
                    </>
                  )}
                />
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Controller
                  name="slug"
                  control={control}
                  rules={{ required: "Slug is required" }}
                  render={({ field }) => (
                    <>
                      <Typography
                        variant="h6"
                        color="primary.main"
                        gutterBottom
                      >
                        Root URL Slug *
                      </Typography>
                      <TextField
                        {...field}
                        fullWidth
                        placeholder="Enter the root URL path (e.g., blog, docs)"
                        error={!!errors.slug}
                        helperText={
                          errors.slug?.message ||
                          "This will be the base URL path: yourwebsite.com/your-slug"
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">/</InputAdornment>
                          ),
                        }}
                        onKeyDown={(e) => {
                          if (e.key === " ") {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          const newValue = e.target.value.replace(/\s/g, "");
                          field.onChange(newValue);
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            bgcolor: "background.paper",
                          },
                        }}
                      />
                    </>
                  )}
                />
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  Parent Page Root (Optional)
                </Typography>
                <Controller
                  name="parentId"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Select
                        {...field}
                        fullWidth
                        value={field.value || -1}
                        onChange={(event) => {
                          field.onChange(event.target.value);
                        }}
                        disabled={loading}
                        sx={{
                          borderRadius: 2,
                          bgcolor: "background.paper",
                        }}
                      >
                        <MenuItem value={-1}>No Parent (Top Level)</MenuItem>
                        {pageRoots
                          .filter((root) => {
                            // Only show top-level roots (no parent)
                            if (root.parentId) return false;
                            // Don't show itself when editing
                            if (isEditing && root.id === isOpen.id) return false;
                            return true;
                          })
                          .map((root) => (
                            <MenuItem key={root.id} value={root.id}>
                              /{root.rootUrl}
                            </MenuItem>
                          ))}
                      </Select>
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                        Select a top-level parent to create a nested page root (e.g., /about → /about/team)
                      </Typography>
                    </>
                  )}
                />
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  Display Order
                </Typography>
                <Controller
                  name="order"
                  control={control}
                  rules={{
                    min: { value: 0, message: "Order must be 0 or greater" }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      fullWidth
                      placeholder="0"
                      error={!!errors.order}
                      helperText={errors.order?.message || "Set the display order (lower numbers appear first)"}
                      slotProps={{ htmlInput: { min: 0, step: 1 } }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                          bgcolor: "background.paper",
                        },
                      }}
                    />
                  )}
                />
              </CardContent>
            </Card>

            <Card
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: 1,
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  Navigation Options
                </Typography>
                <Stack spacing={2}>
                  <Controller
                    name="isInHeaderNavigation"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value}
                            onChange={field.onChange}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body1" fontWeight="500">
                              Show in Header Navigation
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Display this page root in the header navigation
                              menu
                            </Typography>
                          </Box>
                        }
                      />
                    )}
                  />
                  <Controller
                    name="highlight"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={field.value}
                            onChange={field.onChange}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body1" fontWeight="500">
                              Highlight
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Highlight this page root in navigation
                            </Typography>
                          </Box>
                        }
                      />
                    )}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Stack>
          <Box mt={4} display="flex" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              onClick={handleClose}
              size="large"
              sx={{
                minWidth: 120,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!isFormValid}
              sx={{
                minWidth: 180,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: 2,
                "&:hover": { boxShadow: 4 },
              }}
            >
              {isEditing ? "Update Page Root" : "Create Page Root"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePageRootModal;
