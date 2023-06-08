import { React, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Paper from "@mui/material/Paper";
import moment from "moment";
import { Done, Close, Refresh } from "@mui/icons-material";

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

// import Orderactions from "./orderactions";

export default function PaymentsAdmin() {
  const [loading, setloading] = useState(false);
  const [payments, setpayments] = useState(false);

  const auth = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders);
  const getpayments = async () => {
    setloading(true);

    try {
      const res = await axios.get(
        "https://shopulimate-api.onrender.com/order/getallpayments"
      );
      setpayments(res?.data?.payments);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  useEffect(() => {
    getpayments();
  }, []);
  const clearpayments = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        "https://shopulimate-api.onrender.com/order/clearpayments"
      );
      console.log(res.data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  // const availableamount = 0;
  // const calculate = payments?.map((p) =>
  //   p.status == "completed" ? (availableamount += p.amount) : null
  // );
  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "Payment ID",
        width: 250,
      },
      {
        field: "order",
        headerName: "Order",
        width: 250,
        renderCell: (params) => (
          <Typography sx={{ fontSize: "14px" }}>{params.row.order}</Typography>
        ),
      },

      {
        field: "amount",
        headerName: "Amount",
        width: 140,
        renderCell: (params) => (
          <Typography sx={{ fontWeight: "bold" }}>
            ${params.row.amount}
          </Typography>
        ),
      },
      {
        field: "clearon",
        headerName: "Available On",
        width: 140,
        renderCell: (params) => (
          <Typography sx={{ fontSize: "14px" }}>
            {moment(params.row.createdat).add(7, "days").format("LL")}
          </Typography>
        ),
      },
      {
        field: "status",
        headerName: "Status",
        width: 150,
        renderCell: (params) => (
          <Chip
            label={params.row.status}
            size="small"
            sx={{
              borderRadius: "5px",
              // color: "#FFCD4E",
              background: "#E7F9ED",
              fontWeight: "bold",
              color:
                params.row.status === "pending"
                  ? "rgb(51, 208, 103)"
                  : "#FFCD4E",
              "& .MuiChip-deleteIcon": {
                color:
                  params.row.pending === "pending"
                    ? "rgb(51, 208, 103)"
                    : "#FFCD4E",
              },
            }}
            deleteIcon={
              params.row.status === "pending" ? <Refresh /> : <Done />
            }
            onDelete={() => {
              return;
            }}
          />
        ),
      },

      {
        field: "createdat",
        headerName: "Create At",
        width: 130,
        renderCell: (params) => moment(params.row.createdat).fromNow(), // 4 years ago
      },
    ],
    []
  );

  return (
    <Container sx={{}} maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Earnings</Typography>
        <Typography variant="h6">
          <Button variant="contained" sx={{ ml: 1 }} onClick={clearpayments}>
            Clear Todays Payments
            {/* ${availableamount} */}
          </Button>
        </Typography>
      </Box>

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
          rows={payments}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          // checkboxSelection
          loading={loading}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}
          paginationMode
        />
      </Paper>
    </Container>
  );
}
