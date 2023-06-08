import { Add } from "@mui/icons-material";
import { Typography, Box, Container, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getbrands } from "../../redux/actions/brandsactions";
import Createbrand from "./createbrand";

export default function Brands() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const brands = useSelector((state) => state.brands.brands);

  useEffect(() => {
    dispatch(getbrands());
  }, []);
  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 130,
        renderCell: (params) => <Typography>{params.value}</Typography>,
      },

      //   {
      //     field: "actions",
      //     headerName: "Actions",
      //     type: "actions",
      //     width: 150,
      //     // renderCell: (params) => <Orderactions {...{ params }} />,
      //   },
    ],
    []
  );
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" sx={{ mb: 1 }} align="center">
        Manage Brands
      </Typography>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          getRowId={(row) => row._id}
          rows={brands}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          // loading={isloading}
        />
        {/* <Link to="/dashboard/create-shop" style={{ textDecoration: "none" }}> */}

        {/* </Link> */}
      </Box>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        sx={{ mt: 2 }}
        endIcon={<Add />}
      >
        Create Brand
      </Button>
      <Createbrand open={open} setOpen={setOpen} />
    </Container>
  );
}
