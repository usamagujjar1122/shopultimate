import { React, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallorders, getorders_s } from "../../../redux/actions/orderactions";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
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
import Orderactions from "./orderactions";
// import Orderactions from "./orderactions";

export default function OrdersAdmin() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [shopaddopen, setshopaddOpen] = useState(false);

  const [currentshop, setcurrentshop] = useState();

  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getallorders());
  }, []);
  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "Order No",
        width: 100,
      },
      {
        field: "from",
        headerName: "Customer",
        width: 130,
        renderCell: (params) => (
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {params.row.from.username}
          </Typography>
        ),
      },
      {
        field: "orderstatus",
        headerName: "Order Status",
        width: 150,
        renderCell: (params) => (
          <Chip
            label={params.row.orderstatus}
            size="small"
            sx={{
              borderRadius: "5px",
              // color: "#FFCD4E",
              background: "#E7F9ED",
              fontWeight: "bold",
              color:
                params.row.orderstatus == "Accepted"
                  ? "rgb(51, 208, 103)"
                  : "Declined"
                  ? "#E94560"
                  : "#FFCD4E",
            }}
          />
        ),
      },
      {
        field: "ordertotal",
        headerName: "Total",
        width: 100,
        renderCell: (params) => (
          <Typography sx={{ fontWeight: "bold" }}>
            ${params.row.ordertotal}
          </Typography>
        ),
      },
      {
        field: "deliverystatus",
        headerName: "Delivery Status",
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.row.deliverystatus}
            size="small"
            sx={{
              borderRadius: "5px",
              // color: "#FFCD4E",
              background: "#E7F9ED",
              fontWeight: "bold",
              color:
                params.row.deliverystatus === "Pending"
                  ? "rgb(51, 208, 103)"
                  : "#FFCD4E",
              "& .MuiChip-deleteIcon": {
                color:
                  params.row.deliverystatus === "Pending"
                    ? "rgb(51, 208, 103)"
                    : "#FFCD4E",
              },
            }}
            deleteIcon={
              params.row.deliverystatus === "Delivered" ? <Done /> : <Refresh />
            }
            onDelete={() => {
              return;
            }}
          />
        ),
      },
      // {
      //   field: "deliverydetails",
      //   headerName: "Delivery Address",
      //   width: 180,
      //   renderCell: (params) => (
      //     <Typography sx={{ fontSize: "14px" }}>
      //       {params.row.deliverydetails.city +
      //         " " +
      //         params.row.deliverydetails.country}
      //     </Typography>
      //   ),
      // },
      {
        field: "createdat",
        headerName: "Purchase Date",
        width: 130,
        renderCell: (params) => moment(params.row.createdat).fromNow(), // 4 years ago
      },
      {
        field: "ispaid",
        headerName: "Payment",
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.row.ispaid}
            sx={{
              borderRadius: "5px",
              background: "#E7F9ED",
              color:
                params.row.ispaid === "Paid" ? "rgb(51, 208, 103)" : "#E94560",
              "& .MuiChip-deleteIcon": {
                color:
                  params.row.ispaid === "Paid"
                    ? "rgb(51, 208, 103)"
                    : "#E94560",
              },
              // flexDirection: "row-reverse",
            }}
            // variant="outlined"
            size="small"
            deleteIcon={params.row.ispaid === "Paid" ? <Done /> : <Close />}
            onDelete={() => {
              return;
            }}
          ></Chip>
        ),
      },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => <Orderactions {...{ params }} />,
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
      <Typography variant="h6" sx={{ mb: 1 }}>
        Manage Orders
      </Typography>

      <Paper
        sx={{
          height: "75vh",
          position: "relative",
          top: "-10px",
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
          rows={orders}
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
    </Container>
  );
}
