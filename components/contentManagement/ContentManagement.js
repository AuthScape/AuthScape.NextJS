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
import ArchiveIcon from "@mui/icons-material/Archive";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import SearchIcon from "@mui/icons-material/Search";
import { DataGrid } from "@mui/x-data-grid";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { apiService } from "authscape";
import dayjs from "dayjs";
import CreatePageModal from "./CreatePageModal";

const ContentManagement = ({}) => {
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
  const [pageList, setPageList] = useState([]);
  const [pageTemplates, setPageTemplates] = useState([]);
  const [pageTypes, setPageTypes] = useState([]);
  const [chipState, setChipState] = useState({});
  const [ui, setUI] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  const totalPages = Math.ceil(rowCount / initialPaginationModel.length);

  const columns = [];

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
    let response = await apiService().post("", paginationModel);
    if (response != null && response.status == 200) {
      setPageList(response.data.data);
      setRowCount(response.data.recordsTotal);
    }
  };

  const fetchPageTemplates = async () => {
    let response = await apiService().get("");
    if (response != null && response.status == 200) {
    }
  };

  const fetchPageTypes = async () => {
    try {
      let response = await apiService().get("/ContentManagement/GetPageTypes");
      if (response && response.status === 200) {
        setPageTypes(response.data);
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
    } catch (error) {
      console.error("Error fetching page types:", error);
    }
  };

  useEffect(() => {
    fetchPageTypes();
  }, []);

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
      <Typography variant="h4">Content Management Dashboard</Typography>
      <Box my={2}>
        <Grid
          container
          mb={1}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Stack>
            <Typography variant="h6">Manage Website & Email Content</Typography>
            <Typography variant="subtitle2" mt={1}>
              Create, update, and manage website pages and email templates in
              one centralized location. Use the tools below to streamline
              content customization and ensure consistency across all digital
              platforms.
            </Typography>
          </Stack>
        </Grid>
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
          {" "}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              flexGrow: 1,
              order: { xs: 2, md: 1 },
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
          sx={{ width: "100%", overflowX: "scroll", minHeight: "56vh" }}
          mt={1}
        >
          <DataGrid
            columns={columns}
            rows={pageList}
            pageSize={8}
            rowsPerPage={[8]}
            ref={refDataGrid}
            disableSelectionOnClick
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
    </Container>
  );
};

export default ContentManagement;
