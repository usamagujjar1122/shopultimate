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
import { getallusers } from "../../../redux/actions/authactions";
import UserActions from "./useractions";
import axios from "axios";
import { setAlert } from "../../../redux/actions/alertactions";
// import Orderactions from "./orderactions";

export default function UsersAdmin() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [shopaddopen, setshopaddOpen] = useState(false);

  const [currentshop, setcurrentshop] = useState();
  const [loading, setloading] = useState(false);
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth.users);

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getallusers());
  }, []);
  const handlesubmit = async (e, id) => {
    e.preventDefault();

    setloading(true);
    try {
      const res = await axios.post(
        "https://shopulimate-api.onrender.com/user/sellerconfirm",
        {
          id,
        }
      );
      console.log(res.data);
      dispatch(setAlert("Seller Approved", "success"));
      dispatch(getallusers());
      // dispatch({ type: SELLER_CONFIRM, payload: res?.data?.user_ });
      // if (res.data.user_) {
      //   navigate("/manage");
      // }
      setloading(false);
    } catch (error) {
      console.log(error);
      // dispatch(setAlert(error.response.data.message, "error"));
      setloading(false);
    }
  };
  const columns = useMemo(
    () => [
      {
        field: "_id",
        headerName: "ID",
        width: 100,
      },
      {
        field: "username",
        headerName: "User Name",
        width: 130,
        renderCell: (params) => (
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {params.row.username}
          </Typography>
        ),
      },
      {
        field: "email",
        headerName: "Email",
        width: 150,
        renderCell: (params) => (
          <Typography sx={{ textTransform: "capitalize", fontSize: "14px" }}>
            {params.row.email}
          </Typography>
        ),
      },

      {
        field: "role",
        headerName: "Role",
        width: 120,
        renderCell: (params) => (
          <Chip
            label={params.row.role}
            size="small"
            sx={{
              borderRadius: "5px",
              // color: "#FFCD4E",
              background: "#E7F9ED",
              fontWeight: "bold",
              color: params.row.role === "seller" ? "rgb(51, 208, 103)" : null,
            }}
          />
        ),
      },
      {
        field: "seller_request",
        headerName: "Seller Request",
        width: 150,
        renderCell: (params) => (
          <>
            {params?.row?.seller_request ? (
              <Button
                disabled={params?.row.role == "seller"}
                variant="contained"
                size="small"
                onClick={(e) => handlesubmit(e, params?.row._id)}
              >
                Approve
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ textTransform: "capitalize" }}
              >
                No Request
              </Button>
            )}
          </>
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
        renderCell: (params) => <UserActions {...{ params }} />,
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
        Manage Users
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
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          components={{ Toolbar: GridToolbar }}

          // loading={isloading}
        />
        {/* <Link to="/dashboard/create-shop" style={{ textDecoration: "none" }}> */}

        {/* </Link> */}
      </Paper>
    </Container>
  );
}
