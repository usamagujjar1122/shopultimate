import { React, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteshop,
  getallshops,
  getusershops,
} from "../../../redux/actions/shopactions";
import moment from "moment";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Edit, Visibility, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";
import EditShop from "./shopeditmodel";
import { Add } from "@mui/icons-material";
import Sidebar from "../../layouts/sidebar";
import Addshop from "./createshop";
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
  useTheme,
  Chip,
} from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ShopActions from "./shopactions";
export default function Shops() {
  const theme = useTheme();
  const colors = theme.palette.mode;
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [shopaddopen, setshopaddOpen] = useState(false);

  const [currentshop, setcurrentshop] = useState();

  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.shop.usershops);
  const isloading = useSelector((state) => state.shop.isLoading);

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getusershops());
  }, []);
  const columns = useMemo(
    () => [
      {
        field: "shopavatar",
        headerName: "Shop",
        width: 180,
        renderCell: (params) => {
          return (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Avatar
                src={params?.row?.shopavatar}
                variant="rounded"
                sx={{ width: 45, height: 45 }}
              ></Avatar>
              <Box>
                <Typography
                  sx={{ fontSize: "15px", textTransform: "capitalize" }}
                >
                  {params?.row?.shopname}
                </Typography>
              </Box>
            </Stack>
          );
        },
      },
      {
        field: "catagery",
        headerName: "Catagery",
        width: 150,
        renderCell: (params) => {
          return (
            <Chip
              size="small"
              label={params.value}
              color="success"
              sx={{ borderRadius: "5px" }}
            />
          );
        },
      },
      {
        field: "Shoptype",
        headerName: "Shop Type",
        width: 150,
        renderCell: (params) => {
          return <Typography>{params.value}</Typography>;
        },
      },

      // {
      //   field: "createdat",
      //   headerName: "Create At",
      //   width: 180,
      //   renderCell: (params) => {
      //     return (
      //       <Typography>
      //         {moment(params.row.createdat).format("MMMM Do YYYY")}
      //       </Typography>
      //     );
      //   },
      // },
      {
        field: "shopcity",
        headerName: "Location",
        width: 230,
        renderCell: (params) => {
          return (
            <Typography>
              {params?.row?.city + ", " + params?.row?.country}
            </Typography>
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 200,
        renderCell: (params) => <ShopActions {...{ params }} />,
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
    dispatch(deleteshop(id));
  };
  const handleClickOpen = (row) => {
    // event.preventDefault()
    setcurrentshop(row);
    setOpen(true);
  };
  const handleClickaddOpen = () => {
    setshopaddOpen(true);
  };
  // const noproducts = shops.products ? shops.products.length : 0;
  // const nproducts = shops.length;

  return (
    <Container sx={{}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Shops List
      </Typography>

      <Paper
        sx={{
          height: "75vh",
          position: "relative",
          top: "-10px",
          left: "-7px",
          boxShadow: "0",
          border: "1px solid #e3e9ef",
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
            backgroundColor: "#e3e9ef",
            textTransform: "uppercase",
            // color:"white",
            // borderBottom: "none",
          },
          "& .css-1jbbcbn-MuiDataGrid-columnHeaderTitle": {
            // fontWeight: "700 !important",
          },
          "& .MuiDataGrid-virtualScroller": {
            // backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            // borderTop: "none",
            // backgroundColor: "#333",
          },
          "& .MuiCheckbox-root": {
            // color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `#009f7f !important`,
          },
          "& .MuiDataGrid-row": {
            background: "white",
            // padding:"10px 0",
            // minHeight: "65px !important",
            // maxHeight: "65px !important",
            borderBottom: "1px solid #E3E9EF",
            alignItems: "center",
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
          rows={shops}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          // disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          loading={isloading}
          // density="comfortable"
          // components={{ Toolbar: GridToolbar }}
        />
        {/* <Link to="/dashboard/create-shop" style={{ textDecoration: "none" }}> */}

        {/* </Link> */}
      </Paper>
    </Container>
  );
}
