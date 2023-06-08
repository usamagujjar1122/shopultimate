import { React, useState } from "react";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview, Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteshop } from "../../../redux/actions/shopactions";
import Loading from "../../layouts/loading";
import { Link } from "react-router-dom";

export default function ShopActions({ params, props }) {
  const diapatch = useDispatch();
  const isloading = useSelector((state) => state.shop.isLoading);

  const [open, setopen] = useState(false);
  return (
    <Box>
      <Tooltip title="View Shop Details">
        <Link to={`/shop/${params?.row?._id}`}>
          <IconButton>
            <Visibility />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Edit this Shop">
        <Link to={`/dashboard/edit-shop/${params.row._id}`}>
          <IconButton onClick={() => setopen(true)}>
            <Edit />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Delete this Shop">
        <IconButton onClick={() => diapatch(deleteshop(params.row._id))}>
          <Delete />
        </IconButton>
      </Tooltip>
      {/* <EditShop open={open} setOpen={setopen} shop={params.row} /> */}
      {/* <Loading isloading={isloading} /> */}
    </Box>
  );
}
