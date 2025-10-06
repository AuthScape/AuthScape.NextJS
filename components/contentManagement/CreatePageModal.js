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
  Select,
  MenuItem,
  InputAdornment,
  Tooltip,
  Menu,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useForm, Controller } from "react-hook-form";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { apiService } from "authscape";
import CreatePageRootModal from "./CreatePageRootModal";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const CreatePageModal = ({ isOpen, handleClose, pageTypes, pageRoots: initialPageRoots, oemCompanyId }) => {
  const isEditing = typeof isOpen !== "boolean";
  const [pageRootModalOpen, setPageRootModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPageRootForMenu, setSelectedPageRootForMenu] = useState(null);
  const [pageRoots, setPageRoots] = useState(initialPageRoots || []);
  const menuOpen = Boolean(anchorEl);

  const initialData = {
    title: "",
    pageTypeId: null,
    pageRootId: null,
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
    // Update pageRoots when initialPageRoots changes
    if (initialPageRoots && initialPageRoots.length > 0) {
      setPageRoots(initialPageRoots);
    }
  }, [initialPageRoots]);

  useEffect(() => {
    // Fetch pageRoots when modal opens if not provided by parent
    const fetchPageRootsOnOpen = async () => {
      if (isOpen && (!pageRoots || pageRoots.length === 0)) {
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
        }
      }
    };

    fetchPageRootsOnOpen();
  }, [isOpen, oemCompanyId]);

  useEffect(() => {
    if (isEditing) {
      setValue("title", isOpen.title);
      setValue("pageTypeId", isOpen.pageTypeId);
      setValue(
        "pageRootId",
        isOpen.pageRootId == null ? -1 : isOpen.pageRootId
      );
      setValue("description", isOpen.description);
      setValue("recursion", isOpen.recursion);
      setValue("slug", isOpen.slug);
    } else {
      reset();
    }
  }, [isEditing, isOpen, reset, setValue]);

  const watchedFields = watch(["title", "description"]);
  const pageTypeId = watch("pageTypeId");
  const pageRootId = watch("pageTypeId");
  const recursion = watch("recursion");
  const slug = watch("slug");

  const selectedPageType = pageTypes.find((type) => type.id === pageTypeId);
  const selectedPageRoot = pageRoots.find((root) => root.id === pageRootId);
  const isRecursive = selectedPageType?.isRecursive || false;
  const isHomepage = selectedPageType?.isHomepage || false;

  // Helper function to build hierarchical page roots list
  const buildHierarchicalRoots = () => {
    const topLevelRoots = pageRoots.filter(root => !root.parentId);
    const childRoots = pageRoots.filter(root => root.parentId);

    const result = [];

    topLevelRoots.forEach(parent => {
      result.push(parent);
      const children = childRoots.filter(child => child.parentId === parent.id);
      children.forEach(child => {
        result.push({ ...child, isChild: true });
      });
    });

    return result;
  };

  const hierarchicalRoots = buildHierarchicalRoots();

  const isFormValid =
    watchedFields.every((field) => field?.trim() !== "") &&
    pageTypeId &&
    (!isRecursive || recursion) &&
    (isHomepage || slug);

  const handleMenuOpen = (event, pageRoot) => {
    setAnchorEl(event.currentTarget);
    setSelectedPageRootForMenu(pageRoot);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPageRootForMenu(null);
  };

  const handleCreatePageRoot = () => {
    setPageRootModalOpen(true);
    handleMenuClose();
  };

  const handleEditPageRoot = () => {
    setPageRootModalOpen(selectedPageRootForMenu);
    handleMenuClose();
  };

  const handleDeletePageRoot = async () => {
    if (selectedPageRootForMenu && window.confirm(`Are you sure you want to delete the page root "${selectedPageRootForMenu.title}"?`)) {
      const response = await apiService().post(
        `/ContentManagement/RemovePageRoot?pageRootId=${selectedPageRootForMenu.id}`
      );
      if (response != null && response.status === 200) {
        // Refresh the pageRoots list without closing the modal
        try {
          const endpoint = (oemCompanyId && oemCompanyId !== 'undefined' && oemCompanyId !== 'null')
            ? `/ContentManagement/GetPageRoots?privateLabelCompanyId=${oemCompanyId}`
            : `/ContentManagement/GetPageRoots`;
          const refreshResponse = await apiService().get(endpoint);
          if (refreshResponse && refreshResponse.status === 200) {
            setPageRoots(refreshResponse.data || []);
          }
        } catch (error) {
          console.error("Error fetching page roots:", error);
        }
      } else if (response && response.data) {
        alert(response.data || "An error occurred while deleting the page root");
      }
    }
    handleMenuClose();
  };

  const handlePageRootModalClose = async (shouldRefresh = false) => {
    setPageRootModalOpen(false);
    if (shouldRefresh) {
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
      }
    }
  };

  const onSave = async (pageParam) => {
    event.preventDefault();
    const { title, pageTypeId, pageRootId, description, recursion, slug } =
      pageParam;
    const param = {
      pageId: isEditing ? isOpen.id : null,
      title: title,
      pageTypeId: pageTypeId,
      pageRootId: pageRootId == -1 ? null : pageRootId,
      description: description,
      recursion: recursion,
      slug: !isHomepage ? slug : "",
      privateLabelCompanyId: oemCompanyId
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
              rules={{ required: "PageType is required" }}
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
            {!isHomepage && (
              <Controller
                name="pageRootId"
                control={control}
                render={({ field }) => (
                  <>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Typography variant="subtitle2">Page Root</Typography>
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={handleCreatePageRoot}
                        sx={{ textTransform: "none" }}
                      >
                        Create Root
                      </Button>
                    </Box>
                    <Select
                      {...field}
                      size="small"
                      value={field.value || ""}
                      onChange={(event) => {
                        field.onChange(event.target.value);
                      }}
                      renderValue={(selected) => {
                        if (selected === -1 || selected === "") return "No Root";
                        const selectedRoot = pageRoots.find(r => r.id === selected);
                        if (!selectedRoot) return "";

                        // Build full path for child roots
                        if (selectedRoot.parentId) {
                          const parent = pageRoots.find(p => p.id === selectedRoot.parentId);
                          return `/${parent?.rootUrl}/${selectedRoot.rootUrl}`;
                        }
                        return `/${selectedRoot.rootUrl}`;
                      }}
                    >
                      <MenuItem key={-1} value={-1}>
                        No Root
                      </MenuItem>
                      {hierarchicalRoots.map((root) => (
                        <MenuItem
                          key={root.id}
                          value={root.id}
                          sx={{
                            pl: root.isChild ? 4 : 2,
                          }}
                        >
                          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                            <Box display="flex" alignItems="center" gap={0.5}>
                              {root.isChild && (
                                <span style={{ color: '#999', marginRight: '4px' }}>↳</span>
                              )}
                              <span>/{root.rootUrl}</span>
                            </Box>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMenuOpen(e, root);
                              }}
                              sx={{ ml: 1 }}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              />
            )}

            {!isHomepage && (
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
            )}
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

      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleEditPageRoot}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDeletePageRoot}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <CreatePageRootModal
        isOpen={pageRootModalOpen}
        handleClose={handlePageRootModalClose}
        oemCompanyId={oemCompanyId}
      />
    </Dialog>
  );
};
export default CreatePageModal;
