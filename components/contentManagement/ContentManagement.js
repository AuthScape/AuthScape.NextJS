import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Stack,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Button,
  Tooltip,
  InputLabel,
  Chip,
  Container,
  IconButton,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { apiService } from "authscape";
import dayjs from "dayjs";
import BuildIcon from "@mui/icons-material/Build";
import CreatePageModal from "./CreatePageModal";
import PageEditorModal from "./PageEditorModal";
import ConfirmationModal from "../confirmationModal";

const ContentManagement = ({ config , minHeight, loadedUser}) => {
  const refDataGrid = useRef(null);
  const initialPaginationModel = {
    offset: 1,
    length: 8,
    search: "",
    sort: 3,
    chipFilters: [],
  };

  const [paginationModel, setPaginationModel] = useState(
    initialPaginationModel
  );
  const [showConfirmDeletePage, setShowConfirmDeletePage] = useState(null);
  const [pageList, setPageList] = useState([]);
  const [chipState, setChipState] = useState([]);
  const [ui, setUI] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(null);
  const [rowCount, setRowCount] = useState(0);
  const [pageTypes, setPageTypes] = useState([]);
  const totalPages = Math.ceil(rowCount / initialPaginationModel.length);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      height: 200,
    },
    {
      field: "typeTitle",
      headerName: "Page Type",
      flex: 1,
      height: 200,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      height: 200,
      renderCell: (params) => (
        <Tooltip title={params.value} arrow>
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              maxWidth: "100%",
              cursor: "pointer",
            }}
          >
            {params.value}
          </span>
        </Tooltip>
      ),
    },
    {
      field: "recursion",
      headerName: "Recursion",
      flex: 1,
      height: 200,
      valueGetter: (params) => {
        return params
          ? `${params == 1 ? "Everyday" : params + " Days"}`
          : "N/A";
      },
    },
    {
      field: "lastUpdated",
      headerName: "Last Update",
      flex: 1,
      height: 200,
      valueGetter: (params) => {
        return `${dayjs(params).format("ddd, DD MMM YYYY")}`;
      },
    },

    {
      field: "actions",
      type: "actions",
      width: 100,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        const actions = [
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={
              <Tooltip title="Edit" arrow>
                <EditIcon color="primary" />
              </Tooltip>
            }
            label="Edit"
            onClick={() => {
              setIsOpen(row);
            }}
          />,
          <GridActionsCellItem
            key={`build-${id}`}
            icon={
              <Tooltip title="Build" arrow>
                <BuildIcon color="secondary" />
              </Tooltip>
            }
            label="Build"
            onClick={() => {
              setIsEditorOpen(id);
            }}
          />,
          <GridActionsCellItem
            key={`delete-${id}`}
            icon={
              <Tooltip title="Delete" arrow>
                <DeleteIcon color="error" />
              </Tooltip>
            }
            label="Delete"
            onClick={async () => {
              setShowConfirmDeletePage(id);
            }}
          />,
        ];
        return actions;
      },
    },
  ];

  const debounce = (callback, delay) => {
    let timerId;
    const helperFunction = (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback.apply(this, args);
      }, delay);
    };

    return helperFunction;
  };

  const reloadUI = () => {
    setUI(!ui);
  };

  const fetchPageList = async () => {
    let response = await apiService().post(
      "/ContentManagement/GetPages",
      paginationModel
    );
    if (response != null && response.status == 200) {
      setPageList(response.data.data);
      setRowCount(response.data.recordsTotal);
    }
  };

  const fetchPageTypes = async () => {
    const response = await apiService().get("/ContentManagement/GetPageTypes");
    if (response && response.status === 200) {
      setPageTypes(response.data);
      if (chipState.length == 0) {
        const chipModel = response.data.reduce((acc, type) => {
          acc[type.title] = {
            id: type.id,
            variant: "outlined",
            color: "default",
          };
          return acc;
        }, {});
        setChipState(chipModel);
      }
    }
  };

  useEffect(() => {
    fetchPageList();
    fetchPageTypes();
  }, [ui, paginationModel]);

  const handleChipClick = (label) => {
    setChipState((prev) => {
      const newVariant =
        prev[label].variant === "outlined" ? "filled" : "outlined";
      const newColor = prev[label].color === "default" ? "primary" : "default";
      const updatedChipState = {
        ...prev,
        [label]: {
          ...prev[label],
          variant: newVariant,
          color: newColor,
        },
      };
      const activeFilters = Object.values(updatedChipState)
        .filter((value) => value.variant === "filled")
        .map((value) => value.id);

      setPaginationModel((prevModel) => ({
        ...prevModel,
        chipFilters: activeFilters,
        offset: 1,
      }));
      return updatedChipState;
    });
  };

  const handleSearchChange = debounce((event) => {
    const searchTerm = event.target.value;
    setPaginationModel({
      ...paginationModel,
      offset: 1,
      search: searchTerm,
    });
    reloadUI();
  }, 300);

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setPaginationModel({
      ...paginationModel,
      offset: 1,
      sort: newSort,
    });
    reloadUI();
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 2 }}>
      <Box my={2}>
        <Box
          mb={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              flexGrow: 1,
              order: 1,
            }}
          >
            {Object.keys(chipState).map((label) => (
              <Chip
                key={label}
                label={label}
                variant={chipState[label].variant}
                color={chipState[label].color}
                sx={{ cursor: "pointer" }}
                onClick={() => handleChipClick(label)}
              />
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              flexWrap: "wrap",
              gap: 2,
              order: { xs: 1, md: 2 },
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Create New Page
            </Button>
          </Box>
        </Box>
        <Box mt={1} mb={2} display={"flex"} justifyContent={"flex-end"}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search Pages by title..."
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            sx={{ marginLeft: 1, maxWidth: 200 }}
            fullWidth
            size="small"
          >
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              id="dealers-sort-selection"
              label="Sort By"
              value={paginationModel.sort}
              onChange={handleSortChange}
            >
              <MenuItem value={1}>{`Title (Ascending)`}</MenuItem>
              <MenuItem value={2}>{`Title (Descending)`}</MenuItem>
              <MenuItem value={3}>{`Update Date (Ascending)`}</MenuItem>
              <MenuItem value={4}>{`Update Date (Descending)`}</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{ width: "100%", overflowX: "scroll", minHeight: {minHeight} }}
          mt={1}
        >
          <DataGrid
            disableRowSelectionOnClick
            disableColumnSelector
            disableSelectionOnClick
            columns={columns}
            rows={pageList}
            pageSize={8}
            rowsPerPage={[8]}
            ref={refDataGrid}
            disableColumnFilter
            disableColumnSort
            disableColumnMenu
            rowCount={rowCount}
            slots={{
              pagination: (props) => (
                <Box display={"flex"} alignItems={"center"} mr={2} my={2}>
                  {totalPages !== 0 && (
                    <>
                      <IconButton
                        aria-label="previousPage"
                        size="small"
                        disabled={paginationModel.offset == 1}
                        onClick={() => {
                          setPaginationModel({
                            ...paginationModel,
                            offset: paginationModel.offset - 1,
                          });
                        }}
                      >
                        <KeyboardArrowLeftIcon fontSize="inherit" />
                      </IconButton>
                      <Typography>
                        {paginationModel.offset} of {totalPages}
                      </Typography>
                      <IconButton
                        aria-label="nextPage"
                        size="small"
                        disabled={paginationModel.offset == totalPages}
                        onClick={() => {
                          setPaginationModel({
                            ...paginationModel,
                            offset: paginationModel.offset + 1,
                          });
                        }}
                      >
                        <KeyboardArrowRightIcon fontSize="inherit" />
                      </IconButton>
                    </>
                  )}
                  <Typography>Total Pages: {rowCount}</Typography>
                </Box>
              ),
            }}
          />
        </Box>
      </Box>
      <CreatePageModal
        isOpen={isOpen}
        handleClose={() => {
          setIsOpen(false);
          reloadUI();
          setPaginationModel(initialPaginationModel);
        }}
        pageTypes={pageTypes}
      />
      <PageEditorModal
        config={config}
        isOpen={isEditorOpen}
        handleClose={() => {
          setIsEditorOpen(null);
          reloadUI();
          setPaginationModel(initialPaginationModel);
        }}
      />
      <ConfirmationModal
        title={"Are you sure you want to remove this page?"}
        description={
          "When this page is removed it will not be able to be recovered."
        }
        okTitle={"Yes"}
        cancelTitle={"Cancel"}
        cancelClicked={() => {
          setShowConfirmDeletePage(null);
        }}
        okClicked={async () => {
          let response = await apiService().post(
            "/ContentManagement/RemovePage?pageId=" + showConfirmDeletePage
          );
          if (response != null && response.status === 200) {
            reloadUI();
          } else {
          }
          setShowConfirmDeletePage(null);
        }}
        open={showConfirmDeletePage != null ? true : false}
      />
    </Container>
  );
};

export default ContentManagement;
