import { React, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview, Visibility } from "@mui/icons-material";
import { useDispatch } from "react-redux";

import EditProduct from "./updateproduct";
import { deleteproduct } from "../../../redux/actions/productactions";
import { Link } from "react-router-dom";
export default function Productactions({ params, props }) {
  const diapatch = useDispatch();
  const [open, setopen] = useState(false);
  return (
    <Box>
      <Tooltip title="View Product Details">
        <Link to={`/product/${params.row._id}`}>
          <IconButton>
            <Visibility />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Edit this Product">
        <Link to={`/dashboard/edit-product/${params.row._id}`}>
          <IconButton>
            <Edit />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Delete this Shop">
        <IconButton onClick={() => diapatch(deleteproduct(params.row._id))}>
          <Delete />
        </IconButton>
      </Tooltip>
      {/* <EditProduct open={open} setOpen={setopen} product={params.row} /> */}
    </Box>
  );
}
