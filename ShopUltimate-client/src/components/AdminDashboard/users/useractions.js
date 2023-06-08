import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Preview, RemoveRedEye } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteuser } from "../../../redux/actions/authactions";

export default function UserActions({ params }) {
  const dispatch = useDispatch();
  return (
    <Box>
      <Tooltip title="Modify this User">
        {/* <Link to={`/dashboard/modify-order/${params.row._id}`}> */}
        <IconButton>
          <RemoveRedEye />
        </IconButton>
        {/* </Link> */}
      </Tooltip>
      <Tooltip title="Delete this User">
        <IconButton onClick={() => dispatch(deleteuser(params.row._id))}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
