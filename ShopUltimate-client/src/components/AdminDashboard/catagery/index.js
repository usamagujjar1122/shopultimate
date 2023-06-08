import { React, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paper from "@mui/material/Paper";
import moment from "moment";
import {
  Edit,
  Visibility,
  Delete,
  Done,
  DeleteForever,
  Close,
  Refresh,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import Sidebar from "../../layouts/sidebar";
import Loading from "../../layouts/loading";
import {
  Box,
  Container,
  Button,
  TablePagination,
  TextField,
  Typography,
  Avatar,
  Stack,
  CircularProgress,
  Chip,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { getcatagerieslist } from "../../../redux/actions/catageryactions";
import CatageyActions from "./catageryactions";
import AddCatagery from "./addcatagery";
// import Orderactions from "./orderactions";

export default function Orders() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [shopaddopen, setshopaddOpen] = useState(false);

  const [currentshop, setcurrentshop] = useState();
  const [aopen, setaOpen] = useState(false);

  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const catageries = useSelector((state) => state.catageries?.catagerieslist);

  const auth = useSelector((state) => state.auth);
  //   useEffect(() => {
  //     dispatch(getcatagerieslist());
  //   }, []);
  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "ID",
        width: 100,
      },
      {
        field: "catagery_name",
        headerName: "Catagery Name",
        width: 130,
        renderCell: (params) => (
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {params.row.catagery_name}
          </Typography>
        ),
      },
      {
        field: "categoryImage",
        headerName: "catagery Icon",
        width: 130,
        renderCell: (params) => (
          <img
            src={params?.row?.categoryImage && params?.row?.categoryImage}
            style={{ width: 30, height: 30 }}
          />
        ),
      },

      {
        field: "createdat",
        headerName: "Purchase Date",
        width: 130,
        renderCell: (params) => moment(params.row.createdat).fromNow(), // 4 years ago
      },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => <CatageyActions {...{ params }} />,
      },
    ],
    []
  );
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handledelete = (event, id) => {
    event.preventDefault();
  };
  const handleClickOpen = (row) => {
    // event.preventDefault()
    setcurrentshop(row);
    setOpen(true);
  };
  const handleClickaddOpen = () => {
    setshopaddOpen(true);
  };

  return (
    <Container sx={{}} maxWidth="xl">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Manage Orders
        </Typography>
        <Button
          endIcon={<Add />}
          variant="contained"
          onClick={() => setaOpen(true)}
        >
          Create New Catagery
        </Button>
      </Box>

      <Paper
        sx={{
          height: "75vh",
          position: "relative",

          left: "-7px",
          boxShadow: "0",
          // border:"1px solid #e3e9ef",
          "& .MuiDataGrid-root": {
            border: "none",
            // background:"white"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none !important",
          },
          "& .name-column--cell": {
            color: "#333",
            // color:"white"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F3F5F9",
            textTransform: "uppercase",
            fontSize: "12px",
            // color:"white",
            // borderBottom: "none",
          },
          "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            // backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            // borderTop: "none",
            backgroundColor: "white",
          },
          "& .MuiCheckbox-root": {
            // color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `black !important`,
            background: "transparent",
          },
          "& .MuiDataGrid-toolbarContainer": {
            // color: `black !important`,
            background: "#F6F9FC",
            pt: 1,
            pb: 1,
          },
          "& .MuiDataGrid-row": {
            borderBottom: "1px solid #E3E9EF",
            // alignItems: "center",
          },
          "& .MuiDataGrid-columnSeparator": {
            opacity: "0 !important",
          },
          "& .MuiDataGrid-menuIcon": {
            display: "none !important",
          },
          "& .css-1pe4mpk-MuiButtonBase-root-MuiIconButton-root": {
            display: "none !important",
          },
        }}
      >
        <DataGrid
          getRowId={(row) => row._id}
          rows={catageries && catageries}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          // checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}
          paginationMode

          // loading={isloading}
        />
        {/* <Link to="/dashboard/create-shop" style={{ textDecoration: "none" }}> */}

        {/* </Link> */}
      </Paper>
      <AddCatagery open={aopen} setOpen={setaOpen} />
    </Container>
  );
}
