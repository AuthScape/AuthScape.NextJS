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
  IconButton,
} from "@mui/material";
import { apiService } from "authscape";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { GridActionsCellItem } from "@mui/x-data-grid";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ConfirmationModal from "../confirmationModal";
import CreateBlockListModal from "./CreateBlockListModal";

const BlockListManagement = ({ minHeight, configLoad, oemCompanyId }) => {
  const refDataGrid = useRef(null);
  const initialPaginationModel = {
    offset: 1,
    length: 8,
    search: "",
    sort: 3,
    privateLabelCompanyId: oemCompanyId,
  };
  const [paginationModel, setPaginationModel] = React.useState(
    initialPaginationModel
  );
  const [ui, setUI] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [blockList, setBlockList] = useState([]);
  const [rowCount, setRowCount] = React.useState(0);
  const totalPages = Math.ceil(rowCount / initialPaginationModel.length);
  const [showConfirmDeletePage, setShowConfirmDeletePage] = useState(null);
  const reloadUI = () => {
    setUI(!ui);
    configLoad();
  };
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

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      height: 200,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      height: 200,
    },
    {
      field: "keyword",
      headerName: "Key Word",
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
      field: "created",
      headerName: "Created Date",
      flex: 1,
      height: 200,
      valueGetter: (params) => {
        return `${dayjs(params).format("ddd, DD MMM YYYY")}`;
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      headerName: "Actions",
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        const actions = [];
        actions.push(
          <GridActionsCellItem
            key={`edit-${id}`}
            icon={
              <Tooltip title="Edit" arrow>
                <EditIcon color="secondary" />
              </Tooltip>
            }
            label="Edit"
            onClick={() => {
              setIsOpen(row);
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
          />
        );
        return actions;
      },
    },
  ];

  const fetchBlockList = async () => {
    let response = await apiService().post(
      "/ContentManagement/GetPageBlockList",
      paginationModel
    );
    if (response != null && response.status == 200) {
      setBlockList(response.data.data);
      setRowCount(response.data.recordsTotal);
    }
  };

  useEffect(() => {
    fetchBlockList();
  }, [ui, paginationModel]);

  return (
    <>
      <Box my={2}>
        <Box mt={1} mb={2} display={"flex"}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search Black List by title..."
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
              id="assets-sort-selection"
              label="Sort By"
              value={paginationModel.sort}
              onChange={handleSortChange}
            >
              <MenuItem value={1}>{`Title (Ascending)`}</MenuItem>
              <MenuItem value={2}>{`Title (Descending)`}</MenuItem>
              <MenuItem value={3}>{`Created Date (Ascending)`}</MenuItem>
              <MenuItem value={4}>{`Created Date (Descending)`}</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            fullWidth
            sx={{ marginLeft: 1, maxWidth: 160 }}
            onClick={() => {
              setIsOpen(true);
            }}
          >
          Add BlockList
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            overflowX: "scroll",
            minHeight: { minHeight },
          }}
          mt={1}
        >
          <DataGrid
            disableRowSelectionOnClick
            disableColumnSelector
            disableSelectionOnClick
            columns={columns}
            rows={blockList}
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
      <ConfirmationModal
        title={"Are you sure you want to remove this Contact?"}
        description={
          "When this contact is removed it will not be able to be recovered."
        }
        okTitle={"Yes"}
        cancelTitle={"Cancel"}
        cancelClicked={() => {
          setShowConfirmDeletePage(null);
        }}
        okClicked={async () => {
          let response = await apiService().post(
            "/ContentManagement/RemoveBlockList?blockId=" + showConfirmDeletePage
          );
          if (response != null && response.status === 200) {
            reloadUI();
          } else {
          }
          setShowConfirmDeletePage(null);
        }}
        open={showConfirmDeletePage != null ? true : false}
      />
      <CreateBlockListModal
        isOpen={isOpen}
        oemCompanyId={oemCompanyId}
        handleClose={() => {
          setIsOpen(false);
          reloadUI();
          setPaginationModel(initialPaginationModel);
        }}
      />
  
    </>
  );
};

export default BlockListManagement;
