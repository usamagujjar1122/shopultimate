import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview, RemoveRedEye } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Orderactions({ params }) {
  return (
    <Box>
      <Tooltip title="Modify this Order">
        <Link to={`/dashboard/modify-order/${params.row._id}`}>
          <IconButton>
            <RemoveRedEye />
          </IconButton>
        </Link>
      </Tooltip>
      {/* <Tooltip title="Delete this Order">
        <IconButton>
          <Delete />
        </IconButton>
      </Tooltip> */}
    </Box>
  );
}
