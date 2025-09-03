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
  Chip,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { apiService } from "authscape";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateBlockListModal = ({ isOpen, handleClose, oemCompanyId }) => {
  const isEditing = typeof isOpen !== "boolean";
  const [isEmailMode, setIsEmailMode] = useState(true);

  const initialData = {
    title: "",
    email: "",
    keyword: "",
    description: "",
  };

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    if (isEditing) {
      setValue("title", isOpen.title);
      setValue("email", isOpen.email);
      setValue("keyword", isOpen.keyword);
      setValue("description", isOpen.description);
      setIsEmailMode(!!isOpen.email);
    } else {
      reset();
    }
  }, [isEditing, isOpen, reset, setValue]);

  const watchedFields = watch(["title", "description", "email", "keyword"]);
  const [titleValue, descriptionValue, emailValue, keywordValue] = watchedFields;
  const requiredFieldValue = isEmailMode ? emailValue : keywordValue;
  const isFormValid = titleValue?.trim() !== "" && descriptionValue?.trim() !== "" && requiredFieldValue?.trim() !== "";

  const onSave = async (assetParam) => {
    event.preventDefault();
    const { title, email, keyword, description } = assetParam;

    if (isEditing) {
      const response = await apiService().post(
        "/ContentManagement/UpdateBlockList",
        {
          blockId: isOpen.id,
          title,
          email,
          keyword,
          description,
          privateLabelCompanyId: oemCompanyId,
        }
      );
      if (response && response.status === 200) {
        handleClose();
        reset();
      }
    } else {
      const data = new FormData();
      data.append("title", title);
      data.append("email", email);
      data.append("keyword", keyword);
      data.append("description", description);

      if (oemCompanyId != null) {
        data.append("privateLabelCompanyId", oemCompanyId);
      }

      const response = await apiService().post(
        "/ContentManagement/CreateNewBlockList",
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
        sx: { 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            <BlockIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="600" color="primary.main">
              {isEditing ? "Update BlockList" : "Create New BlockList"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={0.5}>
              {isEditing ? "Modify existing blocklist entry" : "Add a new entry to your blocklist"}
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
            bgcolor: 'background.paper',
            boxShadow: 1,
            '&:hover': { bgcolor: 'grey.100' }
          }}
        >
          <CloseIcon />
        </IconButton>
        <Divider sx={{ mt: 2 }} />
      </DialogTitle>
      <DialogContent sx={{ p: 3, pt: 2 }}>
        <form onSubmit={handleSubmit(onSave)}>
          <Stack spacing={3}>
            <Card elevation={0} sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        Title *
                      </Typography>
                      <TextField
                        {...field}
                        fullWidth
                        placeholder="Enter a descriptive title for this blocklist entry"
                        error={!!errors.title}
                        helperText={errors.title?.message || "A clear, descriptive title helps identify this entry"}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: 'background.paper'
                          }
                        }}
                      />
                    </>
                  )}
                />
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="h6" color="primary.main" gutterBottom>
                  Block Type
                </Typography>
                <Box display="flex" alignItems="center" gap={2}>
                  <Chip 
                    label="Email" 
                    color={isEmailMode ? "primary" : "default"}
                    variant={isEmailMode ? "filled" : "outlined"}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isEmailMode}
                        onChange={(e) => {
                          setIsEmailMode(e.target.checked);
                          setValue("email", "");
                          setValue("keyword", "");
                        }}
                        color="primary"
                      />
                    }
                    label=""
                    sx={{ m: 0 }}
                  />
                  <Chip 
                    label="Keyword" 
                    color={!isEmailMode ? "primary" : "default"}
                    variant={!isEmailMode ? "filled" : "outlined"}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Choose whether to block by {isEmailMode ? "email address" : "keyword phrase"}
                </Typography>
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                {isEmailMode ? (
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required"
                    }}
                    render={({ field }) => (
                      <>
                        <Typography variant="h6" color="primary.main" gutterBottom>
                          Email Address *
                        </Typography>
                        <TextField
                          {...field}
                          fullWidth
                          type="email"
                          placeholder="user@example.com"
                          error={!!errors.email}
                          helperText={errors.email?.message || "Enter the email address to block"}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              bgcolor: 'background.paper'
                            }
                          }}
                        />
                      </>
                    )}
                  />
                ) : (
                  <Controller
                    name="keyword"
                    control={control}
                    rules={{
                      required: "Keyword is required"
                    }}
                    render={({ field }) => (
                      <>
                        <Typography variant="h6" color="primary.main" gutterBottom>
                          Keyword *
                        </Typography>
                        <TextField
                          {...field}
                          fullWidth
                          placeholder="Enter keyword or phrase"
                          error={!!errors.keyword}
                          helperText={errors.keyword?.message || "Enter the keyword or phrase to block"}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              bgcolor: 'background.paper'
                            }
                          }}
                        />
                      </>
                    )}
                  />
                )}
              </CardContent>
            </Card>
            <Card elevation={0} sx={{ bgcolor: 'background.paper', border: 1, borderColor: 'divider' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Typography variant="h6" color="primary.main" gutterBottom>
                        Description *
                      </Typography>
                      <TextField 
                        {...field} 
                        multiline 
                        rows={4}
                        fullWidth 
                        placeholder="Add any additional notes or context about this blocklist entry..."
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            bgcolor: 'background.paper'
                          }
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Optional: Provide context or reason for blocking this {isEmailMode ? 'email' : 'keyword'}
                      </Typography>
                    </>
                  )}
                />
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
                textTransform: 'none',
                fontWeight: 600
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
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: 2,
                '&:hover': { boxShadow: 4 }
              }}
            >
              {isEditing ? "Update BlockList" : "Create BlockList"}
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlockListModal;
