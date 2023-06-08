import { React, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import moment from "moment";
import Productactions from "./productactions";
import {
  getuserproducts,
  deleteproduct,
  updateproduct,
  getproducts,
} from "../../../redux/actions/productactions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Container,
  Button,
  TablePagination,
  TextField,
  Typography,
  Avatar,
  Box,
  Stack,
  Chip,
} from "@mui/material";

import { PRODUCT_ACTION_ATTEMPT } from "../../../redux/types";
import { getallshops } from "../../../redux/actions/shopactions";
// import EditProduct from "../../product/updateproduct";
import Productstatus from "./productstatus";
export default function ProductsAdmin() {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [shopaddopen, setshopaddOpen] = useState(false);
  const [productaddopen, setproductaddOpen] = useState(false);

  const [currentproduct, setcurrentproduct] = useState();

  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const isloadingp = useSelector((state) => state.products.isLoadingp);
  const handleClickproductaddOpen = () => {
    // event.preventDefault()
    setproductaddOpen(true);
  };
  const auth = useSelector((state) => state.auth);
  const shop = useSelector((state) => state.shop.shops);

  useEffect(() => {
    dispatch({ type: PRODUCT_ACTION_ATTEMPT });
    dispatch(getproducts());
    dispatch(getallshops());
  }, []);
  const columns = useMemo(
    () => [
      {
        field: "images",
        headerName: "Product Title",
        width: 220,
        renderCell: (params) => {
          return (
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Avatar
                src={params?.row?.images[0]}
                variant="rounded"
                // sx={{ width: 50, height: 50 }}
              ></Avatar>
              <Box>
                <Typography variant="strong">
                  {params?.row?.productTitle}
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
              label={params.row?.catagery?.catagery_name}
              variant="filled"
              sx={{
                background: "rgb(0,159,127)",
                color: "white",
                borderRadius: "4px",
              }}
              size="small"
            />
          );
        },
      },
      {
        field: "brand",
        headerName: "Brand",
        width: 150,
        renderCell: (params) => (
          <Typography sx={{ textTransform: "capitalize" }}>
            {params?.value}
          </Typography>
        ),
      },
      {
        field: "shop",
        headerName: "Shop",
        width: 150,
        renderCell: (params) => (
          <Typography sx={{ textTransform: "capitalize" }}>
            {params?.row?.shop?.shopname}
          </Typography>
        ),
      },
      {
        field: "price",
        headerName: "Price",
        width: 120,
        renderCell: (params) => <Typography>${params?.row?.price}</Typography>,
      },
      {
        field: "discount",
        headerName: "Discount",
        width: 120,
        renderCell: (params) => <Typography>{params?.value}%</Typography>,
      },
      {
        field: "iActive",
        headerName: "Active",
        width: 80,
        renderCell: (params) => <Productstatus {...{ params }} />,
      },

      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        width: 150,
        renderCell: (params) => <Productactions {...{ params }} />,
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
    dispatch(deleteproduct(id));
  };
  const handleClickOpen = (row) => {
    // event.preventDefault()
    setcurrentproduct(row);
    setOpen(true);
  };
  const handleClickaddOpen = () => {
    setshopaddOpen(true);
  };
  return (
    <Container sx={{}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Product List
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
          rows={products}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          // checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          loading={isloadingp}
          components={{ Toolbar: GridToolbar }}

          // sx={{
          //   "& .MuiDataGrid-columnHeaders": {
          //     backgroundColor: "#d0d0d0",
          //     fontSize: 16,
          //   },
          // }}
        />
      </Paper>
    </Container>
  );
}
